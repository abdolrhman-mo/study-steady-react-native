import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Progress Circle
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  timer: {
    fontSize: 55,
    fontWeight: '500',
    // fontFamily: ,
    color: '#000',
    // Progress circle styles
    position: 'absolute',
    // fontSize: 24,
    // color: '#fff',  
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E87C39',
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 10,
    },
    minsButton: {
        backgroundColor: SECONDARY_COLOR,
        padding: 15,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    minsButtonText: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: 'Poppins_Bold',
        fontSize: 17,
    },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#E87C39',
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: '900',
    marginLeft: 10,
    borderRadius: 25,
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
    backgroundColor: 'white',
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
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#E87C39',
    padding: 10,
    borderRadius: 10,
    // marginHorizontal: 5,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  alertContainer: {
    position: 'absolute',
    top: 5,
    left: 12,
    right: 12,
    padding: 10,
    zIndex: 999,
    alignItems: 'center',
  },
  alert: {
    backgroundColor: '#d4edda', // Light green background for encouragement
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    color: '#155724', // Dark green text for positive emphasis
    marginRight: 10,
  },
  alertCloseButton: {
    backgroundColor: '#155724', // Matching dark green close button
    padding: 5,
    borderRadius: 50,
  },  
  icon: {
    // marginRight: 10,
    top: 5,
    left: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
});

