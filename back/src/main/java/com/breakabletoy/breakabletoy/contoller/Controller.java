package com.breakabletoy.breakabletoy.contoller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import com.breakabletoy.breakabletoy.service.SpotifyService;

import java.net.URI;

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

    @GetMapping("/auth/spotify")
    public ResponseEntity<Void> getSpotifyCallback(@RequestParam(required = false) String code) {
        this.spotifyService.getAccessToken(code);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("http://localhost:3000"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping("/login")
    public ResponseEntity<Void> spotifyAuth() {
        HttpHeaders headers = this.spotifyService.requestUserAuth();
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("/me/top/artist")
    public ResponseEntity<Object> getTopArtist() {
        return new ResponseEntity<>(this.spotifyService.getUserTopArtist(), HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<Object> search(@RequestParam String q, @RequestParam String type) {
        return new ResponseEntity<>(spotifyService.search(q, type), HttpStatus.OK);
    }

    @GetMapping("/artists/{id}")
    public ResponseEntity<Object> getArtist(@PathVariable String id) {
        return new ResponseEntity<>(spotifyService.getArtist(id), HttpStatus.OK);
    }

    @GetMapping("/artistAlbums/{id}")
    public ResponseEntity<Object> getArtistsAlbums(@PathVariable String id) {
        return new ResponseEntity<>(spotifyService.getArtistsAlbums(id), HttpStatus.OK);
    }

    @GetMapping("/albums/{id}")
    public ResponseEntity<Object> getAlbum(@PathVariable String id) {
        return new ResponseEntity<>(spotifyService.getAlbum(id), HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Object> getUserProfile() {
        Object userProfile = spotifyService.getUserProfile();
        return ResponseEntity.ok(userProfile);
    }

    @GetMapping("/isLoggedIn")
    public Boolean getLogInformation() {
        return this.spotifyService.isLogedIn();
    }

}
