import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { setFollowingList } from '@/redux/followingSlice';
import { RootState } from '@/redux/store';
import { useFetchData } from '@/api/hooks/useFetchData';
import { API_ENDPOINTS } from '@/api/endpoints';
import { getId } from '@/utils/tokenStorage';
import apiClient from '@/api/client';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Leaderboard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const followingList = useSelector((state: RootState) => state.following.followingList);
    const { data, loading, error } = useFetchData(API_ENDPOINTS.FOLLOWING);

    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState<any>(null);

    // Fetch user info
    useEffect(() => {
        const fetchUserData = async () => {
            const id = await getId();
            if (id) {
                const response = await apiClient.get(`/api-auth/${id}/`);
                setUserData(response.data);
                console.log('leaderboard user data', response.data);
            }
        };
        fetchUserData();
    }, []);

    // Sync Redux state with fetched data
    useEffect(() => {
        if (data) {
            dispatch(setFollowingList(data));
        }
    }, [data, dispatch]);

    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E87C39" />
        </View>
        );
    }
  
    if (error)
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
        
    // const renderItem = ({ item }: { item: any }) => (
    //     <View style={styles.item}>
    //         <Link
    //             href={{ pathname: '/user/[id]', params: { id: item.id } }}
    //             style={styles.link}
    //         >
    //             <Text style={styles.name}>{item.username}</Text>
    //         </Link>
    //         <View style={styles.streakContainer}>
    //             <Icon name="trophy-outline" size={20} color="#FFD700" style={styles.trophyIcon} />
    //             <Text style={styles.score}>{item.top_streak}</Text>
    //         </View>
    //     </View>
    // );
    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.tableRow}>
            <Text style={styles.rowText}>{item.username}</Text>
            <View style={styles.streakContainer}>
                <Icon name="trophy-outline" size={20} color="#FFD700" style={styles.trophyIcon} />
                <Text style={styles.rowText}>{item.top_streak}</Text>
            </View>
        </View>
    );

    const filteredList = followingList?.filter((user: any) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <View style={styles.container}>
            <Link href="/search">
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for friends"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </Link>
    
            {userData && (
                <View style={styles.personalInfo}>
                    <View style={styles.infoBlock}>
                        <Icon name="person-circle-outline" size={50} color="#E87C39" />
                        <Text style={styles.infoText}>{userData.username}</Text>
                    </View>
                    <TouchableOpacity style={styles.infoBlock} onPress={() => router.push('/FollowersFollowing')}>
                        <Text style={styles.infoLabel}>Followers</Text>
                        <Text style={styles.infoText}>25</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoBlock} onPress={() => router.push('/FollowersFollowing')}>
                        <Text style={styles.infoLabel}>Following</Text>
                        <Text style={styles.infoText}>10</Text>
                    </TouchableOpacity>
                </View>
            )}
    
            
            {filteredList?.length > 0 ? (
                // {/* Leaderboard Title */}
                <>
                    <Text style={styles.leaderboardTitle}>Following</Text>
            
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>Username</Text>
                        <Text style={styles.headerText}>Top Streak</Text>
                    </View>
            
                    {/* Table Body */}
                        <FlatList
                            data={filteredList}
                            renderItem={renderItem}
                            keyExtractor={(item: any) => item.id.toString()}
                            contentContainerStyle={styles.tableBody}
                        />
                </>
            ) : (
                <View style={styles.center}>
                    <Text style={styles.noFollowingMessage} >
                        You haven't followed anyone yet. Start following users to see their scores here!
                    </Text>
                    <Link href={'/search'}>
                        <Button title="Search for friends to follow" color={'#E87C39'}/>
                    </Link>
                </View>
            )}
        </View>
    );
};
const COLORS = {
    primary: '#E87C39',
    secondary: '#F6DECF',
    background: '#e0f7fa',
    textPrimary: '#333',
    textSecondary: '#444',
    textMuted: '#888',
    white: '#fff',
    border: '#ccc',
    error: '#d32f2f',
    infoLabel: '#00796b',
};

const styles = StyleSheet.create({
    leaderboardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: COLORS.textPrimary,
    },
    
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.white,
    },

    tableBody: {
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: COLORS.primary,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
    },

    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
        backgroundColor: '#FFF6F0',
    },

    rowText: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginTop: 16,
        // height: 40,
        // borderColor: COLORS.border,
        // borderWidth: 1,
        // borderRadius: 10,
        // paddingHorizontal: 10,
        marginBottom: 15,
        // backgroundColor: COLORS.white,
        width: '100%',
    },
    personalInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    infoBlock: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        // color: COLORS.infoLabel,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 18,
        color: COLORS.textSecondary,
        marginTop: 5,
    },
    noFollowingMessage: {
        fontSize: 16,
        textAlign: 'center',
        color: COLORS.textMuted,
        marginVertical: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: COLORS.error,
        marginBottom: 10,
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trophyIcon: {
        marginRight: 5,
    },    
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        alignItems: 'center',
    },
    link: {
        flex: 1,
    },
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Leaderboard;
