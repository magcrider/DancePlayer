import React, {StyleSheet, Text, View} from 'react-native';
import {useProgress} from 'react-native-track-player';

const TrackProgress = () => {
  const {position, duration} = useProgress(200);
  function format(seconds: number) {
    let mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <View>
      <Text style={styles.trackProgress}>
        {format(position)} / {format(duration)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee',
  },
});

export default TrackProgress;
