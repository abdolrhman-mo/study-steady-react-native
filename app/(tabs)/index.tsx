import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePostData } from '@/api/hooks/usePostData';
import { styles } from '@/components/timer/timer.styles';
import { API_ENDPOINTS } from '@/api/endpoints';

export default function PomodoroTimer(): JSX.Element {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [promptModalVisible, setPromptModalVisible] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [isBreak, setIsBreak] = useState<boolean>(false);
    const { data, loading, error, postDataToServer } = usePostData(API_ENDPOINTS.SESSION);

    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            clearInterval(intervalId!);
            setIsRunning(false);
            playSound();
            setModalVisible(true);
            if (!isBreak) {
                saveSessionData(duration);
            }
        }
    }, [timeLeft]);

    const saveSessionData = async (duration: number): Promise<void> => {
        await postDataToServer({ duration: 25 });
    };

    const startTimer = (minutes: number, breakTime: boolean = false): void => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        setTimeLeft(minutes * 60);
        setDuration(minutes); // Set the duration state
        setIsRunning(true);
        setIsPaused(false);
        setIsBreak(breakTime);

        const id = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        setIntervalId(id);

        // Show the prompt modal when the timer starts
        setPromptModalVisible(true);
    };

    const pauseTimer = (): void => {
        if (intervalId) {
            clearInterval(intervalId);
            setIsPaused(true);
            setIsRunning(false);
        }
    };

    const resumeTimer = (): void => {
        if (isPaused) {
            setIsPaused(false);
            setIsRunning(true);

            const id = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            setIntervalId(id);
        }
    };

    const playSound = async (): Promise<void> => {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/iphone_alarm.mp3'));
        setSound(sound);
        await sound.playAsync();
    };

    const stopSound = async (): Promise<void> => {
        if (sound) {
            await sound.stopAsync();
            setSound(null);
        }
    };

    const handleBreak = (): void => {
        stopSound();
        startTimer(10, true); // Start a 10-minute break
        setModalVisible(false);
    };

    const handleCancel = (): void => {
        stopSound();
        setModalVisible(false);
    };

    const handleNewSession = (): void => {
        stopSound();
        startTimer(duration);
        setModalVisible(false);
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
                    <Icon name="timer-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>25 دقيقة</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, isRunning && !isPaused && styles.disabledButton]}
                    onPress={() => startTimer(50)}
                    disabled={isRunning && !isPaused}
                >
                    <Icon name="timer-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>50 دقيقة</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.controlButtonsContainer}>
                {isRunning && !isPaused && (
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={pauseTimer}
                    >
                        <Icon name="pause-outline" size={20} color="#fff" />
                        <Text style={styles.controlButtonText}>إيقاف مؤقت</Text>
                    </TouchableOpacity>
                )}
                {isPaused && (
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={resumeTimer}
                    >
                        <Icon name="play-outline" size={20} color="#fff" />
                        <Text style={styles.controlButtonText}>استئناف</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCancel}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{isBreak ? "انتهت فترة الراحة!" : "الوقت انتهى!"}</Text>
                        <View style={styles.modalButtonsContainer}>
                            {isBreak ? (
                                <>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={handleNewSession}
                                    >
                                        <Icon name="checkmark-outline" size={20} color="#fff" />
                                        <Text style={styles.modalButtonText}>بدء جلسة جديدة</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={handleCancel}
                                    >
                                        <Icon name="close-outline" size={20} color="#fff" />
                                        <Text style={styles.modalButtonText}>إلغاء</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={handleBreak}
                                    >
                                        <Icon name="checkmark-outline" size={20} color="#fff" />
                                        <Text style={styles.modalButtonText}>خذ استراحة</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={handleCancel}
                                    >
                                        <Icon name="close-outline" size={20} color="#fff" />
                                        <Text style={styles.modalButtonText}>إلغاء</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
            {/* New Prompt Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={promptModalVisible}
                onRequestClose={() => setPromptModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>من فضلك لا تخرج من البرنامج لكي لا يتوقف المؤقت.</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setPromptModalVisible(false)}
                        >
                            <Icon name="close-outline" size={20} color="#fff" />
                            <Text style={styles.modalButtonText}>موافق</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
