import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';

type PlaylistItemProps = {
  index: number;
  title: string;
  isCurrent: boolean;
};

const PlaylistItem = ({index, title, isCurrent}: PlaylistItemProps) => {
  function handleItemPress() {
    TrackPlayer.skip(index);
  }
  return (
    <TouchableOpacity onPress={handleItemPress}>
      <Text
        style={{
          ...styles.playlistItem,
          ...{backgroundColor: isCurrent ? '#666' : 'transparent'},
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    color: '#fff',
  },
});

export default PlaylistItem;
