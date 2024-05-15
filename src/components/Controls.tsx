import React, {StyleSheet, View} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {getPlaybackState} from 'react-native-track-player/lib/src/trackPlayer';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useProgress} from 'react-native-track-player';

interface ControlsProps {
  onShuffle?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Controls = ({onShuffle}: ControlsProps) => {
  const {position, duration} = useProgress(200);
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await getPlaybackState()).state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }
  return (
    <View>
      <View style={styles.seekBar}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#999999"
          onSlidingComplete={() => {
            console.log('ONSlidingComplete');
          }}
          value={position / duration}
        />
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  seekBar: {},
  slider: {
    width: '100%',
    height: 40,
  },
});

export default Controls;
