import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Button } from 'react-native';
import { Link } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { setFollowingList } from '@/redux/followingSlice';
import { RootState } from '@/redux/store';
import { useFetchData } from '@/api/hooks/useFetchData';
import { API_ENDPOINTS } from '@/api/endpoints';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const followingList = useSelector((state: RootState) => state.following.followingList);
    const { data, loading, error } = useFetchData(API_ENDPOINTS.FOLLOWING);

    // Sync Redux state with fetched data
    useEffect(() => {
        if (data) {
            console.log('leaderboard data:', data);
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
                href={{
                    pathname: '/user/[id]',
                    params: { id: item.id },
                }}
                style={styles.link}
            >
                <Text style={styles.name}>{item.username}</Text>
            </Link>
            <Text style={styles.score}>{item.top_streak}</Text>
        </View>
    );

    return (
        followingList ? 
            <View style={styles.container}>
                {followingList?.length > 0 ? (
                    <FlatList
                        data={followingList}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id}
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
            </View> : <View style={styles.center}>
                <Text style={styles.errorText}>لا توجد بيانات متاحة.</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',
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
});

export default Leaderboard;
