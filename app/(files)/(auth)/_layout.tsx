import { Stack, Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { View, Image,} from 'react-native'; // Added ActivityIndicator import
import AppText from '@/components/app-text';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


export default function AuthLayout() {
    // const currentStreak = useSelector((state: RootState) => state.streak.currentStreak);

    return (
        // <Stack screenOptions={{ headerShown: false }}>
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerTitle: '',
            headerLeft: () => (
              <Image
                source={require('@/assets/images/study steady icon.png')}
                style={{ width: 120, height: 80, marginLeft: 10 }}
              />
            ),
            // headerRight: () => (
            //   <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            //     <Link href={'/(files)/(tabs)/streak'}>
            //       <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            //         <Ionicons name="flame" size={24} color="#ff4500" />
            //         <AppText style={{ marginLeft: 5, fontSize: 16, color: '#ff4500', fontWeight: 'bold' }}>
            //           {currentStreak}
            //         </AppText>
            //       </View>
            //     </Link>
            //     <Link href={'/profile'}>
            //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //         {/* <Ionicons name="person-circle-outline" size={24} color="#000" /> */}
            //         <Ionicons name="person-circle-outline" size={24} style={{color: '#E87C39'}} />
            //         {/* <Ionicons name="person-circle-outline" size={24} style={{color: '#f88e55'}} /> */}
            //       </View>
            //     </Link>
            //   </View>
            // ),
          }}>
            <Stack.Screen options={{ headerShown: false }} name="onboarding" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            {/* Add other auth-related screens here */}
        </Stack>
    );
}
