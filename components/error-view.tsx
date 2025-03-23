import React from 'react'
import { StyleSheet, View } from 'react-native'
import { commonStyles } from '@/styles/styles'
import { ERROR_COLOR, GRADIENT_COLORS } from '@/constants/colors'
import AppText from './app-text'
import { LinearGradient } from 'expo-linear-gradient'

// TODO: 
// - Add a navigation link to timer page
// - Add "Open network to be able to see your friends streaks" if its a network error
export default function ErrorView({ error }: { error: string }) {
    return (
        <LinearGradient
            colors={GRADIENT_COLORS}
            style={styles.container}
        >
            <View style={commonStyles.center}>
                <AppText style={styles.errorText}>Error: {error}</AppText>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: ERROR_COLOR,
        marginBottom: 10,
    },
})
