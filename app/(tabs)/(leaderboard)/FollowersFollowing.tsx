import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import apiClient from '@/api/client';
import { getId } from '@/utils/tokenStorage';

export default function FollowersFollowing() {
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getId();
        if (userId) {
          const [followersResponse, followingResponse] = await Promise.all([
            apiClient.get(`/realationships/followers/`),
            apiClient.get(`/realationships/following/`),
          ]);
  
          // Filter out the current user from both lists
          const filteredFollowers = followersResponse.data.filter(
            (item: any) => item.follower.id !== userId
          );
          const filteredFollowing = followingResponse.data.filter(
            (item: any) => item.following.id !== userId
          );
  
          setFollowers(filteredFollowers);
          setFollowing(filteredFollowing);
          setFilteredData(filteredFollowers); // Default to followers
        } else {
          throw new Error('لم يتم العثور على معرف المستخدم');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    // Always filter out the current user while switching tabs
    const filterData = async () => {
      const userId = await getId();
      const data = activeTab === 'followers' ? followers : following;
  
      const filtered = data
        .filter((item) => {
          const user = activeTab === 'followers' ? item.follower : item.following;
          return user.id !== userId; // Exclude current user
        })
        .filter((item) => {
          const user = activeTab === 'followers' ? item.follower : item.following;
          return user.username.toLowerCase().includes(searchQuery.toLowerCase());
        });
  
      setFilteredData(filtered);
    };
  
    filterData();
  }, [searchQuery, activeTab, followers, following]);
  

  useEffect(() => {
    // Reset filtered data whenever the tab or search query changes
    const data = activeTab === 'followers' ? followers : following;
    const filtered = data.filter(item => {
      const user = activeTab === 'followers' ? item.follower : item.following;
      return user.username.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
  }, [searchQuery, activeTab, followers, following]);

  if (loading) return <ActivityIndicator size="large" color="#E87C39" />;
  if (error) return <Text>خطأ: {error}</Text>;

  const renderItem = ({ item }: { item: any }) => {
    const user = activeTab === 'followers' ? item.follower : item.following;

    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ textAlign: 'right', writingDirection: 'rtl', fontSize: 16, fontWeight: 'bold' }}>
          {user.username || 'اسم المستخدم غير متوفر'}
        </Text>
        <Text style={{ color: '#666' }}>{user.email || 'لا يوجد بريد إلكتروني'}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#E0F7FA', padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setActiveTab('followers')}>
          <Text style={{ fontWeight: activeTab === 'followers' ? 'bold' : 'normal' }}>المتابِعون</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('following')}>
          <Text style={{ fontWeight: activeTab === 'following' ? 'bold' : 'normal' }}>المتابَعون</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="ابحث عن اسم المستخدم..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => (activeTab === 'followers' ? item.follower.id : item.following.id).toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    textAlign: 'right', // Align text to the right
    writingDirection: 'rtl', // Set the text direction to RTL
  },
});
