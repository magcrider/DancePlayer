import React from 'react';
import {Button} from 'react-native';
import {authorize} from 'react-native-app-auth';

const SpotifyConnect = () => {
  // TO DO: remove this config data out of the client using https://github.com/bih/spotify-token-swap-service

  const config = {
    clientId: '47c0d4690d044eb29ed9be7fbe1c2238', // available on the app page
    clientSecret: '3835785f5a314e4a8729457af383c28d', // click "show client secret" to see this
    redirectUrl: 'co.magc.dance://oauth', // the redirect you defined after creating the app
    scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };
  async function authorizeSpotify() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await authorize(config);
      // result includes accessToken, accessTokenExpirationDate and refreshToken
      console.log('Spotify access:', result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button title="Connect to Spotify" onPress={() => authorizeSpotify()} />
  );
};

export default SpotifyConnect;
