import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}

export default function Button({ title, onPress, disabled = false }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.buttonDisabled]}
            onPress={!disabled ? onPress : undefined}
            disabled={disabled}
        >
            <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E87C39',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#a1a1a1',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textDisabled: {
        color: '#d1d1d1',
    },
});
