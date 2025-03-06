package com.breakabletoy.breakabletoy.service;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.breakabletoy.breakabletoy.config.SpotifyConfig;
import com.breakabletoy.breakabletoy.model.SpotifyTokenResponse;

@Service
public class SpotifyService {
    private final WebClient spotifyWebClient;
    private final WebClient authWebClient;
    private final SpotifyConfig spotifyConfig;
    private SpotifyTokenResponse currentToken;

    public SpotifyService(SpotifyConfig spotifyConfig) {
        this.spotifyConfig = spotifyConfig;
        this.spotifyWebClient = spotifyConfig.spotifyWebClient();
        this.authWebClient = spotifyConfig.authWebClient();
    }

    public Boolean isLogedIn() {
        return Optional.ofNullable(this.currentToken).isPresent();
    }

    public HttpHeaders requestUserAuth() {
        String scope = "user-read-private user-read-email user-top-read";

        String authUrl = UriComponentsBuilder
                .fromUriString("https://accounts.spotify.com/authorize")
                .queryParam("response_type", "code")
                .queryParam("redirect_uri", spotifyConfig.getRedirectUri())
                .queryParam("client_id", spotifyConfig.getClientId())
                .queryParam("scope", scope)
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(authUrl));

        return headers;
    }

    public SpotifyTokenResponse getAccessToken(String code) {
        String credentials = spotifyConfig.getClientId() + ":" + spotifyConfig.getClientSecret();
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes(StandardCharsets.UTF_8));

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

        formData.add("grant_type", "authorization_code");
        formData.add("code", code);
        formData.add("redirect_uri", spotifyConfig.getRedirectUri());

        SpotifyTokenResponse tokenResponse = this.authWebClient.post()
                .uri("/api/token")
                .header("Authorization", "Basic " + encodedCredentials)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(SpotifyTokenResponse.class)
                .block();

        this.currentToken = tokenResponse;
        return tokenResponse;
    }

    public Object getUserProfile() {
        if (currentToken == null) {
            throw new IllegalStateException("No access token available");
        }

        return spotifyWebClient.get()
                .uri("/me")
                .header("Authorization", "Bearer " + currentToken.getAccessToken())
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    public Object getArtist(String id) {
        if (currentToken == null) {
            throw new IllegalStateException("No access token available");
        }
        return spotifyWebClient.get()
                .uri("/artists/" + id)
                .header("Authorization", "Bearer " + this.currentToken.getAccessToken())
                .retrieve().bodyToMono(Object.class).block();
    }

    public Object getArtistsAlbums(String id) {
        if (currentToken == null) {
            throw new IllegalStateException("No access token available");
        }

        return spotifyWebClient.get()
                .uri("/artists/" + id + "/albums")
                .header("Authorization", "Bearer " + this.currentToken.getAccessToken())
                .retrieve()
                .bodyToMono(Object.class).block();
    }

    public Object getAlbum(String id) {
        if (currentToken == null) {
            throw new IllegalStateException("No access token available");
        }
        return spotifyWebClient.get().uri("/albums/" + id)
                .header("Authorization", "Bearer " + this.currentToken.getAccessToken())
                .retrieve().bodyToMono(Object.class).block();
    }

    public Object getUserTopArtist() {
        if (currentToken == null) {
            throw new IllegalStateException("No access token available");
        }

        return spotifyWebClient.get().uri("/me/top/artists")
                .header("Authorization", "Bearer " + this.currentToken.getAccessToken())
                .retrieve().bodyToMono(Object.class).block();
    }

    public Object search(String q, List<String> type) {
        return spotifyWebClient.get().uri(
                builder -> builder.path("/search/")
                        .queryParam("q", q)
                        .queryParam("type", type)
                        .queryParam("limit", 10)
                        .build())
                .header("Authorization", "Bearer " + this.currentToken.getAccessToken())
                .retrieve()
                .bodyToMono(Object.class).block();
    }
}
