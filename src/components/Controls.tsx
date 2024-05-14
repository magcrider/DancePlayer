import React, {StyleSheet, View} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {getPlaybackState} from 'react-native-track-player/lib/src/trackPlayer';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ControlsProps {
  onShuffle?: () => void; // Adjust the type based on the actual usage
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Controls = ({onShuffle}: ControlsProps) => {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await getPlaybackState()).state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  return (
    <View style={styles.controls}>
      <Icon.Button
        name="arrow-left"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToPrevious()}
      />
      <Icon.Button
        name={playerState.state === State.Playing ? 'pause' : 'play'}
        size={28}
        backgroundColor="transparent"
        onPress={handlePlayPress}
      />
      <Icon.Button
        name="arrow-right"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToNext()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

export default Controls;
