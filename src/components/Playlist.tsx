import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import TrackPlayer, {
  Track,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import PlaylistItem from './PlaylistItem';
import Controls from './Controls';

const Playlist = () => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<
    React.SetStateAction<number> | undefined
  >(0);

  async function loadPlaylist() {
    const getQueue = await TrackPlayer.getQueue();
    setQueue(getQueue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.track != null
    ) {
      let index = await TrackPlayer.getActiveTrackIndex();
      setCurrentTrack(index);
    }
  });

  return (
    <View>
      {/* <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistItem
              index={index}
              title={item.title || ''}
              isCurrent={currentTrack === index}
            />
          )}
        />
      </View> */}
      <Controls />
    </View>
  );
};

const styles = StyleSheet.create({
  playlist: {
    marginTop: 40,
    marginBottom: 40,
  },
});

export default Playlist;
