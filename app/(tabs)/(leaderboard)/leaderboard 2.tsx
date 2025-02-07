import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { setFollowingList } from '@/redux/followingSlice';
import { RootState } from '@/redux/store';
import { useFetchData } from '@/api/hooks/useFetchData';
import { API_ENDPOINTS } from '@/api/endpoints';
import { getId } from '@/utils/tokenStorage';
import apiClient from '@/api/client';
import Icon from 'react-native-vector-icons/Ionicons';

const Leaderboard = () => {
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
                <AppText style={styles.errorText}>خطأ: {error}</AppText>
            </View>
        );

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.item}>
            <Link
                href={{ pathname: '/user/[id]', params: { id: item.id } }}
                style={styles.link}
            >
                <AppText style={styles.name}>{item.username}</AppText>
            </Link>
            <AppText style={styles.score}>{item.top_streak}</AppText>
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
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <Icon name="person-circle" size={60} color="#00796b" />
                        <AppText style={styles.username}>{userData.username}</AppText>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <AppText style={styles.statNumber}>25</AppText>
                            <AppText style={styles.statLabel}>المتابِعون</AppText>
                            {/* <AppText style={styles.statNumber}>{userData.followers_count}</AppText> */}
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.statBox}>
                            <AppText style={styles.statNumber}>10</AppText>
                            <AppText style={styles.statLabel}>المتابَعون</AppText>
                            {/* <AppText style={styles.statNumber}>{userData.following_count}</AppText> */}
                        </View>
                    </View>
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
                    <AppText style={styles.noFollowingMessage}>
                        لم تتابع أي شخص بعد. ابدأ في متابعة المستخدمين لرؤية درجاتهم هنا!
                    </AppText>
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

    // Personal Info Section Styles
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00796b',
        marginLeft: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00796b',
    },
    statLabel: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    divider: {
        width: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 10,
    },

    // Other Styles
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
});

export default Leaderboard;
// This File Contains to design for the leaderboard