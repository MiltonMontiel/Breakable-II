package com.breakabletoy.breakabletoy.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SpotifyTokenResponse {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("scope")
    private String scope;

    @JsonProperty("expires_in")
    private String expiresIn;

    @JsonProperty("refresh_token")
    private String refreshToken;

    public String getAccessToken() {
        return this.accessToken;
    }

}
