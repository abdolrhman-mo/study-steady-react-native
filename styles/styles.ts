import { StyleSheet } from "react-native";

export const shadowStyle = StyleSheet.create({
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 6, // For Android
    },
});