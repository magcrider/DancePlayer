/**
 * Dance Player
 * https://github.com/magcrider/DancePlayer
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import {setupPlayer, addTracks} from './trackPlayerServices';
import Playlist from './components/Playlist';
import Header from './components/Header';
import TrackProgress from './components/TrackProgress';

// import {authorize} from 'react-native-app-auth';
import SpotifyConnect from './components/SpotifyConnect';

function App(): React.JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // // base config
  // useEffect(() => {
  //   const config = {
  //     clientId: '47c0d4690d044eb29ed9be7fbe1c2238', // available on the app page
  //     clientSecret: '3835785f5a314e4a8729457af383c28d', // click "show client secret" to see this
  //     redirectUrl: 'co.magc.dance://oauth', // the redirect you defined after creating the app
  //     scopes: [
  //       'user-read-email',
  //       'playlist-modify-public',
  //       'user-read-private',
  //     ], // the scopes you need to access
  //     serviceConfiguration: {
  //       authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  //       tokenEndpoint: 'https://accounts.spotify.com/api/token',
  //     },
  //   };
  //   async function authorizeSpotify() {
  //     try {
  //       const result = await authorize(config);
  //       // result includes accessToken, accessTokenExpirationDate and refreshToken
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   authorizeSpotify();
  // }, []);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SpotifyConnect />
      <Header />
      <TrackProgress />
      <Playlist />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
