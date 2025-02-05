import { StyleSheet } from 'react-native';

const COLORS = {
    primary: '#E87C39',
    background: '#e0f7fa',
    white: '#fff',
    alertBackground: '#f8d7da',
    alertText: '#721c24',
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    circleContainer: {
      position: 'relative',
      width: 320,
      height: 320,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    controlButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 20,
    },
    controlButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    disabledButton: {
        opacity: 0.5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    alertContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        padding: 10,
        zIndex: 999,
        alignItems: 'center',
    },
    alert: {
        backgroundColor: COLORS.alertBackground,
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    alertText: {
        color: COLORS.alertText,
        marginRight: 10,
    },
    alertCloseButton: {
        backgroundColor: COLORS.alertText,
        padding: 5,
        borderRadius: 50,
    },  
    icon: {
        marginRight: 10,
    },
});