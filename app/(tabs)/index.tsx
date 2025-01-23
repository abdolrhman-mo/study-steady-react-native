import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function PomodoroTimer(): JSX.Element {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const startTimer = (minutes: number): void => {
        if (isRunning && !isPaused) return; // Prevent multiple timers
        if (isPaused) {
            resumeTimer();
            return;
        }
        setTimeLeft(minutes * 60); // Convert minutes to seconds
        setIsRunning(true);

        const id = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    setIsRunning(false);
                    playSound();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        setIntervalId(id);
    };

    const pauseTimer = (): void => {
        if (intervalId) {
            clearInterval(intervalId);
            setIsPaused(true);
            setIsRunning(false);
        }
    };

    const resetTimer = (): void => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        setTimeLeft(0);
        setIsRunning(false);
        setIsPaused(false);
    };

    const resumeTimer = (): void => {
        if (isPaused) {
            setIsPaused(false);
            setIsRunning(true);

            const id = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(id);
                        setIsRunning(false);
                        playSound();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            setIntervalId(id);
        }
    };

    const playSound = async (): Promise<void> => {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/iphone_alarm.mp3'));
        await sound.playAsync();
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, isRunning && !isPaused && styles.disabledButton]}
                    onPress={() => startTimer(25)}
                    disabled={isRunning && !isPaused}
                >
                    <Text style={styles.buttonText}>25 Minutes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, isRunning && !isPaused && styles.disabledButton]}
                    onPress={() => startTimer(50)}
                    disabled={isRunning && !isPaused}
                >
                    <Text style={styles.buttonText}>50 Minutes</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.pauseButton, !isRunning && styles.disabledButton]}
                onPress={pauseTimer}
                disabled={!isRunning}
            >
                <Text style={styles.pauseButtonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.resumeButton, !isPaused && styles.disabledButton]}
                onPress={resumeTimer}
                disabled={!isPaused}
            >
                <Text style={styles.resumeButtonText}>Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
                <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    timer: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1f6feb',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pauseButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f0ad4e',
        borderRadius: 10,
    },
    pauseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    resumeButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#5cb85c',
        borderRadius: 10,
    },
    resumeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    resetButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#d9534f',
        borderRadius: 10,
    },
    resetButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    disabledButton: {
        opacity: 0.5,
    },
});
