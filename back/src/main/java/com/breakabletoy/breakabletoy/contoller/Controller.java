package com.breakabletoy.breakabletoy.contoller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.breakabletoy.breakabletoy.model.SpotifyTokenResponse;
import com.breakabletoy.breakabletoy.service.SpotifyService;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class Controller {

    private final SpotifyService spotifyService;

    public Controller(WebClient.Builder authClientBuilder,
            SpotifyService spotifyService) {
        this.spotifyService = spotifyService;
    }

    @GetMapping("/callback")
    public ResponseEntity<String> getSpotifyCallback(@RequestParam(required = false) String code) {
        SpotifyTokenResponse tokenReponse = this.spotifyService.getAccessToken(code);
        return new ResponseEntity<>(tokenReponse.getAccessToken(), HttpStatus.FOUND);
    }

    @GetMapping("/login")
    public ResponseEntity<Void> spotifyAuth() {
        String scope = "user-read-private user-read-email user-top-read";

        String authUrl = UriComponentsBuilder
                .fromUriString("https://accounts.spotify.com/authorize")
                .queryParam("response_type", "code")
                .queryParam("redirect_uri", "http://localhost:8080/callback")
                .queryParam("client_id", "e520a8a956ab42a18aa55191605e38dd")
                .queryParam("scope", scope)
                .queryParam("state", "state")
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(authUrl));

        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("/me/top/artist")
    public ResponseEntity<Object> getTopArtist() {
        Object artist = this.spotifyService.getUserTopArtist();

        return new ResponseEntity<>(artist, HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<Object> search(@RequestParam String q, @RequestParam List<String> type) {
        return new ResponseEntity<>(spotifyService.search(q, type), HttpStatus.FOUND);
    }

    @GetMapping("/artists/{id}")
    public ResponseEntity<Object> getArtist(@PathVariable String id) {
        return new ResponseEntity<>(spotifyService.getArtist(id), HttpStatus.OK);
    }

    @GetMapping("/albums/{id}")
    public ResponseEntity<Object> getAlbum(@PathVariable String id) {
        return new ResponseEntity<>(spotifyService.getAlbum(id), HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Object> getUserProfile(@RequestParam String accessToken) {
        Object userProfile = spotifyService.getUserProfile();
        return ResponseEntity.ok(userProfile);
    }

}
