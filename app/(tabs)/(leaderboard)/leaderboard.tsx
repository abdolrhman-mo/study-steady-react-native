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
import { LinearGradient } from 'expo-linear-gradient';
import { GRADIENT_COLORS, PRIMARY_COLOR, SECONDARY_COLOR, TROPHY_COLOR, WHITE } from '@/constants/colors';
import AppText from '@/components/app-text';
import { shadowStyle } from '@/styles/styles';

const Leaderboard = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const followingList = useSelector((state: RootState) => state.following.followingList)
    const followingCount = useSelector((state: RootState) => state.following.followingCount)
    const followersCount = useSelector((state: RootState) => state.following.followersCount)
    const { data: followingListData, loading: followingListLoading, error: followingListError } = useFetchData(API_ENDPOINTS.FOLLOWING)

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
        if (followingListData && userData) {
            dispatch(setFollowingList({ 
                followingList: followingListData, 
                followersCount: userData.followers_count, 
                followingCount: userData.following_count 
            }));
        }
    }, [followingListData, dispatch, userData]);

    if (followingListLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E87C39" />
            </View>
        );
    }
  
    if (followingListError)
        return (
            <View style={styles.center}>
                <AppText style={styles.errorText}>Error: {followingListError}</AppText>
            </View>
        );
        
    // const renderItem = ({ item }: { item: any }) => (
    //     <View style={styles.item}>
    //         <Link
    //             href={{ pathname: '/user/[id]', params: { id: item.id } }}
    //             style={styles.link}
    //         >
    //             <AppText style={styles.name}>{item.username}</AppText>
    //         </Link>
    //         <View style={styles.streakContainer}>
    //             <Icon name="trophy-outline" size={20} color="#FFD700" style={styles.trophyIcon} />
    //             <AppText style={styles.score}>{item.top_streak}</AppText>
    //         </View>
    //     </View>
    // );

    const renderItem = ({ item }: { item: any }) => (
        <Link style={styles.tableRow}  href={{ pathname: '/user/[id]', params: { id: item.id } }}>
            <AppText style={styles.rowText}>{item.username}</AppText>
            <View style={styles.streakContainer}>
                <Icon name="trophy" size={20} color={TROPHY_COLOR} style={styles.trophyIcon} />
                <AppText style={styles.rowText}>{item.top_streak}</AppText>
            </View>
        </Link>
    );

    const filteredList = followingList?.filter((user: any) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <LinearGradient
            colors={GRADIENT_COLORS}
            style={styles.container}
        >
            <Link href="/search">
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for friends"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </Link>
    
            {/* Personal-Info Box */}
            {userData && (
                <View style={[styles.personalInfo, shadowStyle.default]}>
                    <View style={styles.infoBlock}>
                        <Icon name="person-circle-outline" size={50} color="#E87C39" />
                        <AppText style={styles.infoText}>{userData.username}</AppText>
                    </View>
                    <TouchableOpacity style={styles.infoBlock} onPress={() => router.push('/FollowersFollowing')}>
                        <AppText style={styles.infoLabel}>Followers</AppText>
                        <AppText style={styles.infoText}>{followersCount}</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoBlock} onPress={() => router.push('/FollowersFollowing')}>
                        <AppText style={styles.infoLabel}>Following</AppText>
                        <AppText style={styles.infoText}>{followingCount}</AppText>
                    </TouchableOpacity>
                </View>
            )}
    
            
            {((filteredList?.length > 0) && filteredList) ? (
                // {/* Leaderboard Title */}
                <View style={shadowStyle.default}>
                    <AppText style={styles.leaderboardTitle}>Following</AppText>
            
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <AppText style={styles.headerText}>Username</AppText>
                        <AppText style={styles.headerText}>Top Streak</AppText>
                    </View>
            
                    {/* Table Body */}
                    <FlatList
                        data={filteredList}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id.toString()}
                        contentContainerStyle={styles.tableBody}
                    />
                </View>
            ) : (
                <View style={styles.center}>
                    <AppText style={styles.noFollowingMessage} >
                        You haven't followed anyone yet. Start following users to see their scores here!
                    </AppText>
                    <Link href={'/search'}>
                        <TouchableOpacity 
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 25, // Adjust as needed
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Search for friends to follow</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            )}
        </LinearGradient>
    );
};
const COLORS = {
    primary: PRIMARY_COLOR,
    secondary: SECONDARY_COLOR,
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
        display: 'flex',
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
        backgroundColor: WHITE,
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
