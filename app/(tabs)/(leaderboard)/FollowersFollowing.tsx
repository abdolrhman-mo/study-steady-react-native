import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import apiClient from '@/api/client';
import { getId } from '@/utils/tokenStorage';
import { LinearGradient } from 'expo-linear-gradient';
import { GRADIENT_COLORS } from '@/constants/colors';

export default function FollowersFollowing() {
  const [data, setData] = useState({ followers: [], following: [] });
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUserId, setCurrentUserId] = useState<null | number>(null);

  useEffect(() => {
    (async () => setCurrentUserId(await getId()))();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    setLoading(true);
    (async () => {
      try {
        const endpoint = activeTab === 'followers' ? '/realationships/followers/' : '/realationships/following/';
        const response = await apiClient.get(endpoint);
        const filteredList = response.data.filter((f: any) => 
          (activeTab === 'followers' ? f.follower.id : f.following.id) !== currentUserId
        );
        setData((prev) => ({ ...prev, [activeTab]: filteredList }));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUserId, activeTab]);

  useEffect(() => {
    const list = data[activeTab] || [];
    setFilteredData(
      list.filter((item: any) => (activeTab === 'followers' ? item.follower : item.following).username.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, activeTab, data]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E87C39" />
      </View>
    );
  }

  if (error) return <Text>Error: {error}</Text>;

  return (
    <LinearGradient
        colors={GRADIENT_COLORS}
        style={styles.container}
    >
      <View style={styles.tabContainer}>
        {['followers', 'following'].map((tab: any) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={{ fontWeight: activeTab === tab ? 'bold' : 'normal' }}>{tab === 'followers' ? 'Followers' : 'Following'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search by username..." 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item: any) => (activeTab === 'followers' ? item.follower.id : item.following.id).toString()}
        renderItem={({ item }) => {
          const user = activeTab === 'followers' ? item.follower : item.following;
          return (
            <View style={styles.item}>
              <Text style={styles.username}>{user.username || 'Username not available'}</Text>
              <Text style={styles.email}>{user.email || 'No email available'}</Text>
            </View>
          );
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  searchBar: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 15, backgroundColor: '#fff' },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  username: { fontSize: 16, fontWeight: 'bold' },
  email: { color: '#666' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
