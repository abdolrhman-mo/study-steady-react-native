import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f7fa',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E87C39',
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
    top: 20,
    left: 0,
    right: 0,
    padding: 10,
    zIndex: 999,
    alignItems: 'center',
  },
  alert: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    color: '#721c24',
    marginRight: 10,
  },
  alertCloseButton: {
    backgroundColor: '#721c24',
    padding: 5,
    borderRadius: 50,
  },  
  icon: {
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
});

