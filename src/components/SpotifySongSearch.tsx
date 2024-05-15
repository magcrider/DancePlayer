import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or another icon library of your choice

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{}>;
  uri: string;
  // Add other track details you need, like artists, album, etc.
}

interface SpotifySongSearchProps {
  token: string;
}

const SpotifySongSearch = ({token}: SpotifySongSearchProps) => {
  const [query, setQuery] = useState<string>('');
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);

  const fetchData = async (searchQuery: string) => {
    const accessToken = token;
    if (!accessToken) {
      console.error('Access token not found');
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
          searchQuery,
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data = await response.json();
      setTracks(data.tracks.items); // Assuming the API response structure
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const handleSearch = () => {
    fetchData(query);
  };

  const renderItem = ({item}: {item: SpotifyTrack}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={
        () => console.log(' *** URI:', item.uri)
        // console.log(
        //   ' *** Pressed track:',
        //   JSON.stringify(item, null, '\t'),
        //   '*** ',
        // )
      }>
      <Text style={styles.title}>{item.name}</Text>
      {/* Render other track details here */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search for a song"
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tracks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: 'white',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
  },
});

export default SpotifySongSearch;
