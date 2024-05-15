import React, {useState, useEffect} from 'react';

interface ProfileData {
  // Define the shape of the profile data you expect from Spotify
  id: string;
  display_name: string;
  email: string;
  // Add any other relevant fields here
}

export const SpotifyProfile = (token: string) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const accessToken = token;
      if (!accessToken) {
        setError('Access token not found');
        return;
      }

      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data: ProfileData = await response.json();
        setProfile(data);
      } catch (err: any) {
        setError(
          err.message || 'An error occurred while fetching profile data.',
        );
      }
    };

    getProfile();
  }, [token]); // Empty dependency array means this effect runs once after the initial render

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>Spotify Profile</h1>
      <p>ID: {profile.id}</p>
      <p>Name: {profile.display_name}</p>
      <p>Email: {profile.email}</p>
      {/* Render other profile data here */}
    </div>
  );
};
