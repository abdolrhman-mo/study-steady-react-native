import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, Image } from 'react-native';
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
                <View style={styles.itemContent}>
                    <Image source={{ uri: item.profile_pic }} style={styles.avatar} />
                    <AppText style={styles.name}>{item.username}</AppText>
                </View>
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
                <View style={styles.personalInfo}>
                    <View style={styles.profileHeader}>
                        <Image
                            source={{ uri: userData.profile_pic }}
                            style={styles.profilePic}
                        />
                        <AppText style={styles.username}>{userData.username}</AppText>
                    </View>

                    <View style={styles.infoBlock}>
                        <AppText style={styles.infoLabel}>المتابِعون</AppText>
                        <AppText style={styles.infoText}>{userData.followers_count || 25}</AppText>
                    </View>

                    <View style={styles.infoBlock}>
                        <AppText style={styles.infoLabel}>المتابَعون</AppText>
                        <AppText style={styles.infoText}>{userData.following_count || 10}</AppText>
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
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        height: 40,
        borderColor: '#00796b',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        marginRight: 10,
    },
    personalInfo: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 3,
        padding: 20,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00796b',
    },
    infoBlock: {
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        color: '#00796b',
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 18,
        color: '#444',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        color: '#00796b',
    },
    score: {
        fontSize: 18,
        color: '#444',
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
    link: {
        color: '#00796b',
        fontSize: 18,
    },
});

export default Leaderboard;
