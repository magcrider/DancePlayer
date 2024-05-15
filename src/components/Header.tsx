import {useEffect, useState} from 'react';
import React, {View, Text, StyleSheet} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  Track,
} from 'react-native-track-player';

const Header = () => {
  const [info, setInfo] = useState<Track | undefined>({url: ''});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], event => {
    if (event.type === Event.PlaybackActiveTrackChanged) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getActiveTrackIndex();
    if (track !== undefined) {
      const trackInfo = await TrackPlayer.getTrack(track);
      setInfo(trackInfo);
    } else {
      setInfo(undefined); // or set to a default state
    }
  }

  return (
    <View>
      <Text style={styles.songTitle}>{info?.title}</Text>
      <Text style={styles.artistName}>{info?.artist}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 32,
    marginTop: 50,
    color: '#ccc',
  },
  artistName: {
    fontSize: 24,
    color: '#888',
  },
});

export default Header;
