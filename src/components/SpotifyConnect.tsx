import React, {useState} from 'react';
import {Button} from 'react-native';
import {authorize} from 'react-native-app-auth';
import SpotifySongSearch from './SpotifySongSearch';

const SpotifyConnect = () => {
  // TO DO: remove this config data out of the client using https://github.com/bih/spotify-token-swap-service

  const config = {
    clientId: '', // available on the app page
    clientSecret: '', // click "show client secret" to see this
    redirectUrl: 'co.magc.dance://oauth', // the redirect you defined after creating the app
    scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  const [accessToken, setAccessToken] = useState<string>('');

  async function authorizeSpotify() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await authorize(config);
      setAccessToken(result.accessToken);
      // result includes accessToken, accessTokenExpirationDate and refreshToken
      console.log('Spotify access:', accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!accessToken && (
        <Button title="Connect to Spotify" onPress={authorizeSpotify} />
      )}
      {accessToken && <SpotifySongSearch token={accessToken} />}
    </>
  );
};

export default SpotifyConnect;
