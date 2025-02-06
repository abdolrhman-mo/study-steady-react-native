import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';

const isWeb = Platform.OS === 'web';

export const saveToken = async (token: string): Promise<void> => {
    if (isWeb) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
    console.log('tokenStorage getToken():', await getToken());
};

export const getToken = async (): Promise<string | null> => {
    if (isWeb) {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } else {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    }
};

export const deleteToken = async (): Promise<void> => {
    if (isWeb) {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
};

export const saveId = async (id: number): Promise<void> => {
    if (isWeb) {
        await AsyncStorage.setItem('ID', id.toString());
    } else {
        await SecureStore.setItemAsync('ID', id.toString());
    }
    console.log('tokenStorage getId():', await getId());
};

export const getId = async (): Promise<number | null> => {
    let id: string | null;
  
    if (isWeb) {
        id = await AsyncStorage.getItem('ID');
    } else {
        id = await SecureStore.getItemAsync('ID');
    }
  
    return id ? parseInt(id, 10) : null;
};

export const deleteId = async (): Promise<void> => {
    if (isWeb) {
        await AsyncStorage.removeItem('ID');
    } else {
        await SecureStore.deleteItemAsync('ID');
    }
};

// export const deleteOnboardingCompleted = async (): Promise<void> => {
//     if (isWeb) {
//         await AsyncStorage.removeItem('ID');
//     } else {
//         await SecureStore.deleteItemAsync('ID');
//     }
// };