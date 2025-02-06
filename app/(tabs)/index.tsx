import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePostData } from '@/api/hooks/usePostData';
import { styles } from '@/components/timer/timer.styles';
import { API_ENDPOINTS } from '@/api/endpoints';
import { getId } from '@/utils/tokenStorage'
import apiClient from '@/api/client'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStreak, setTopStreak, updateCurrentStreak } from '@/redux/streakSlice';


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
    const [streak, setStreak] = useState<number>(1);
    const { data: saveSessionRes, loading: saveSessionLoading, error: saveSessionError, postDataToServer } = usePostData(API_ENDPOINTS.SESSION);

    const dispatch = useDispatch()

    const [userData, setUserData] = useState<any>(null)
    const [userLoading, setUserLoading] = useState<boolean>(true)
    const [userError, setUserError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
        try {
            const id = await getId()
            if (id) {
                const response = await apiClient.get(`/api-auth/${id}/`)
                setUserData(response.data)

                dispatch(setCurrentStreak(Number(response.data.current_streak)))
                dispatch(setTopStreak(Number(response.data.top_streak)))
                
                if (response.data.current_streak === 0 && response.data.top_streak === 0) {
                    setStreak(0)
                    console.log(streak)
                }
            } else {
                throw new Error('ID not found')
            }
        } catch (err: any) {
            setUserError(err.message)
        } finally {
            setUserLoading(false)
        }
        }

        fetchData()
    }, [])

//   if (userLoading) return <Text>جاري التحميل...</Text>
//   if (userError) return <Text>حدث خطأ: {userError}</Text>
//   if (!userData) return <Text>لا توجد بيانات.</Text>




    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            clearInterval(intervalId!);
            setIsRunning(false);
            playSound();
            setModalVisible(true);
            if (!isBreak) {
                saveSessionData(duration);
                setStreak((prevStreak) => prevStreak + 1); // Increase streak after each session
            }
        }
    }, [timeLeft]);
    
    const saveSessionData = async (duration: number): Promise<void> => {
        await postDataToServer({ duration: 25 });
        // await postDataToServer({ duration });
    };
    
    useEffect(() => {
        // Global State Streak
        if (!saveSessionLoading && saveSessionRes) {
            console.log('session saved res', saveSessionRes.current_streak);
            dispatch(updateCurrentStreak(saveSessionRes.current_streak))
        }
    }, [saveSessionRes, saveSessionLoading])

    const startTimer = (minutes: number, breakTime: boolean = false): void => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        setTimeLeft(minutes * 60);
        setDuration(minutes);
        setIsRunning(true);
        setIsPaused(false);
        setIsBreak(breakTime);

        const id = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        setIntervalId(id);

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
        startTimer(10, true);
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

    // Alert component to show when streak is zero
    const renderStreakAlert = () => {
        if (streak === 0) {
          return (
            <View style={styles.alertContainer}>
              <View style={styles.alert}>
                <Text style={styles.alertText}>Start the timer and study to begin your streak!</Text>
                <Icon name="trophy" size={20} color="#F7AC00" style={styles.icon} />
                <TouchableOpacity
                  style={styles.alertCloseButton}
                  onPress={() => setStreak(1)}
                >
                  <Icon name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        return null
      }
    
      return (
        <View style={styles.container}>
          {renderStreakAlert()}
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, isRunning && !isPaused && styles.disabledButton]}
              onPress={() => startTimer(0.05)}
              disabled={isRunning && !isPaused}
            >
              <Icon name="timer-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>25 minutes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, isRunning && !isPaused && styles.disabledButton]}
              onPress={() => startTimer(50)}
              disabled={isRunning && !isPaused}
            >
              <Icon name="timer-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>50 minutes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.controlButtonsContainer}>
            {isRunning && !isPaused && (
              <TouchableOpacity
                style={styles.controlButton}
                onPress={pauseTimer}
              >
                <Icon name="pause-outline" size={20} color="#fff" />
                <Text style={styles.controlButtonText}>Pause</Text>
              </TouchableOpacity>
            )}
            {isPaused && (
              <TouchableOpacity
                style={styles.controlButton}
                onPress={resumeTimer}
              >
                <Icon name="play-outline" size={20} color="#fff" />
                <Text style={styles.controlButtonText}>Resume</Text>
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
                <Text style={styles.modalText}>{isBreak ? "Break over!" : "Time's up!"}</Text>
                <View style={styles.modalButtonsContainer}>
                  {isBreak ? (
                    <>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleNewSession}
                      >
                        <Icon name="checkmark-outline" size={20} color="#fff" />
                        <Text style={styles.modalButtonText}>Start New Session</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleCancel}
                      >
                        <Icon name="close-outline" size={20} color="#fff" />
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleBreak}
                      >
                        <Icon name="checkmark-outline" size={20} color="#fff" />
                        <Text style={styles.modalButtonText}>Take a Break</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleCancel}
                      >
                        <Icon name="close-outline" size={20} color="#fff" />
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={promptModalVisible}
            onRequestClose={() => setPromptModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Please don't leave the app to prevent the timer from stopping.</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setPromptModalVisible(false)}
                >
                  <Icon name="close-outline" size={20} color="#fff" />
                  <Text style={styles.modalButtonText}>Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )
}