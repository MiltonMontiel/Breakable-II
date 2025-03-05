# Backend

This consists of a Java backend using Gradle and Spring Boot.

## Setup

1. Change the contents of `main/resources/applicaiton.properties.example` and rename it
   to `main/resources/application.properties`.

2. Run `./gradlew build -x test`.

## Functionalities

1. Authentication (OAuth 2.0)

Implement the OAuth 2.0 authentication flow using the Spotify Web API.
The backend should securely store the access token and refresh token to interact with the Spotify API on behalf of the user.
Implement an endpoint for authentication (e.g., POST /auth/spotify) to handle the login and token retrieval process.

2. Token Management:

The backend should handle access token expiration by implementing token refresh functionality. This will allow the app to maintain an active session without requiring the user to re-authenticate frequently.

## Endpoints

- `POST /auth/spotify`: This endpoint handles the OAuth 2.0 flow and retrieves the access token.

- `GET /me/top/artists`: Fetch the user’s top artists from Spotify and send it to the client.

- `GET /artists/{id}`: Fetch detailed information about a specific artist.

- `GET /albums/{id}`: Fetch details about a specific album.

- `GET /search`: Allow search for artists, albums, or tracks.
