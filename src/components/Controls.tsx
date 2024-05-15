import React, {StyleSheet, View} from 'react-native';
import TrackPlayer, {
  RepeatMode,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import {getPlaybackState} from 'react-native-track-player/lib/src/trackPlayer';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useProgress} from 'react-native-track-player';
import {useEffect, useState} from 'react';

interface ControlsProps {
  onShuffle?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Controls = ({onShuffle}: ControlsProps) => {
  const {position, duration} = useProgress(200);
  const playerState = usePlaybackState();
  const [repeatTrack, setRepeatTrack] = useState(false);
  const [loopStartPos, setloopStartPos] = useState(0);
  const [loopStopPos, setloopStopPos] = useState(0);

  async function handlePlayPress() {
    if ((await getPlaybackState()).state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  const onTrackSlidingComplete = (percentaje: number) => {
    TrackPlayer.seekTo(duration * percentaje);
  };

  useEffect(() => {
    // console.log('positions', loopStartPos, loopStopPos);
    // if (loopStartPos > 0 && loopStopPos > 0) {
    //   setRepeatTrack(true);
    // }
  }, [loopStartPos, loopStopPos]);

  useEffect(() => {
    if (repeatTrack) {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      if (loopStartPos > 0 && loopStopPos > 0 && position > loopStopPos) {
        TrackPlayer.seekTo(loopStartPos);
      }
    } else {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
    }
  }, [repeatTrack, position, loopStopPos, loopStartPos]);

  const resetRepeat = () => {
    setloopStartPos(0);
    setloopStopPos(0);
    setRepeatTrack(false);
  };

  return (
    <View>
      <View style={styles.seekBar}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#999999"
          onSlidingComplete={pos => {
            onTrackSlidingComplete(pos);
          }}
          onValueChange={pos => {
            onTrackSlidingComplete(pos);
          }}
          value={position / duration}
        />
      </View>
      <View style={styles.controls}>
        <Icon.Button
          name="arrow-circle-up"
          size={28}
          backgroundColor="transparent"
          color={loopStartPos > 0 ? 'greenyellow' : 'white'}
          onPress={() => {
            if (loopStartPos) {
              setloopStartPos(0);
              setloopStopPos(0);
            } else {
              setloopStartPos(position);
              if (position > loopStopPos) {
                setloopStopPos(0);
              }
            }
          }}
        />
        <Icon.Button
          name="repeat"
          size={28}
          backgroundColor="transparent"
          color={repeatTrack ? 'deeppink' : 'white'}
          onPress={() => setRepeatTrack(!repeatTrack)}
        />
        <Icon.Button
          name="arrow-circle-down"
          size={28}
          backgroundColor="transparent"
          color={loopStopPos > 0 ? 'crimson' : 'white'}
          onPress={() => setloopStopPos(position)}
        />
      </View>
      <View style={styles.controls}>
        <Icon.Button
          name={playerState.state === State.Playing ? 'pause' : 'play'}
          size={60}
          backgroundColor="transparent"
          onPress={handlePlayPress}
        />
      </View>
      <View style={styles.controls}>
        <Icon.Button
          name="arrow-left"
          size={28}
          backgroundColor="transparent"
          onPress={() => {
            resetRepeat();
            TrackPlayer.skipToPrevious();
          }}
        />
        <Icon.Button
          name="random"
          size={28}
          backgroundColor="transparent"
          onPress={() => {
            // resetRepeat();
            // TrackPlayer.skipToPrevious();
          }}
        />
        <Icon.Button
          name="arrow-right"
          size={28}
          backgroundColor="transparent"
          onPress={() => {
            resetRepeat();
            TrackPlayer.skipToNext();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  seekBar: {},
  slider: {
    width: '100%',
    height: 40,
  },
});

export default Controls;
