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

    if (loading) return <ActivityIndicator size="large" color="#00796b" />;
    if (error)
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>خطأ: {error}</Text>
            </View>
        );
        const renderItem = ({ item }: { item: any }) => (
            <View style={styles.item}>
                <Link
                    href={{ pathname: '/user/[id]', params: { id: item.id } }}
                    style={styles.link}
                >
                    <Text style={styles.name}>{item.username}</Text>
                </Link>
                <View style={styles.streakContainer}>
                    <Icon name="trophy-outline" size={20} color="#FFD700" style={styles.trophyIcon} />
                    <Text style={styles.score}>{item.top_streak}</Text>
                </View>
            </View>
        );
        

    const filteredList = followingList?.filter((user: any) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="ابحث عن أصدقائك"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Personal Info Section */}
            {userData && (
                <View style={styles.personalInfo}>
                    <View style={styles.infoBlock}>
                        <Icon name="person-circle-outline" size={50} color="#2196F3" />
                        <Text style={styles.infoText}>{userData.username}</Text>
                    </View>
                    <TouchableOpacity style={styles.infoBlock} onPress={() => router.push('/FollowersFollowing')} >
                        <Text style={styles.infoLabel}>المتابِعون</Text>
                        <Text style={styles.infoText}>25</Text>
                        {/* <Text style={styles.infoText}>{userData.followers_count}</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.infoBlock} onPress={() => router.push('/FollowersFollowing')}>
                        <Text style={styles.infoLabel}>المتابَعون</Text>
                        <Text style={styles.infoText}>10</Text>
                        {/* <Text style={styles.infoText}>{userData.following_count}</Text> */}
                    </TouchableOpacity>
                </View>
            )}

            {/* Data of Followed People */}
            {filteredList?.length > 0 ? (
                <FlatList
                    data={filteredList}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id.toString()}
                />
            ) : (
                <View style={styles.center}>
                    <Text style={styles.noFollowingMessage}>
                        لم تتابع أي شخص بعد. ابدأ في متابعة المستخدمين لرؤية درجاتهم هنا!
                    </Text>
                    <Link href={'/search'}>
                        <Button title="ابحث عن أصدقاء لمتابعتهم" />
                    </Link>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    personalInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: '#ccc',
    },
    infoBlock: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        color: '#00796b',
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 18,
        color: '#444',
        marginTop: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
    noFollowingMessage: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
        marginVertical: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#d32f2f',
        marginBottom: 10,
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trophyIcon: {
        marginRight: 5, // Adds space between the trophy and the score
    },
});

export default Leaderboard;
