/* eslint-disable no-shadow */
/**
 * @format
 * @flow strict-local
 */

import AnimateNumber from '@bankify/react-native-animate-number';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, Button, SafeAreaView,
  StatusBar, StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const App: () => React$Node = () => {

  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [counterVisible, setCounterVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [alarmState, setAlarmState] = useState(0)
  const [animateToNumber, setAnimateToNumber] = React.useState(0);
  const baseURL = 'http://192.168.10.85:8088/';

  const colorStyles = {
    backgroundColor: alarmState !== 2 ? '#000000' : '#cc0000',
    color: '#ffffff',
  };

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      getAlarmState()
    });
    return unsubscribe;
  }, []);

  if (!mounted) {
    setTimeout(() => {
      getAlarmState()
    }, 400);
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const getAlarmState = async () => {
    let url = `${baseURL}`;
    let path = 'status';
    fetch(url + path, {
      method: 'POST'
    })
      .then((response) => {
        return response.json() 
      })
      .then((responseData) => { 
        setTitle(handleLabel(responseData))
        setAlarmState(responseData)
        setLoading(false);
        return responseData;
      })
      .catch(function (err) {
        setLoading(false);
        Alert.alert('Error fetching alarm status.');
        setAlarmState(0)
        setTitle('Desativado')
      })
  };

  const toggleAlarm = async () => {
    let url = `${baseURL}`;
    let path = alarmState === 0 ? 'arm' : 'disarm';
 
    fetch(url + path, {
      method: 'POST'
    })
      .then((response) => {
        return response.json() 
      })
      .then((responseData) => { 
        setTitle(handleLabel(responseData))
        setAlarmState(responseData)
        setLoading(false);
        return responseData;
      })
      .catch(function (err) {
        setLoading(false);
        Alert.alert('Error fetching alarm status.');
        setAlarmState(0)
        setTitle('Desativado')
      })
  };

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken() 
    }
  }

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
  }


  const toggleRequest = async () => {
    if (alarmState === 0) {
      setTitle('Ativando')
      setCounterVisible(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        toggleAlarm();
      }, 400);
    }
  };

  const finishCounter = async () => {
    toggleAlarm();
    setCounterVisible(false);
    setTitle('Ativado')
  };

  const handleLabel = (status) => {
    let label = ''

    switch (status) {
      case 0:
        label = 'Desativado'
        break;
      case 1:
        label = 'Ativado'
        break;
      case 2:
        label = 'Disparado'
        break;
      default:
        label = 'Erro'
    }
    return label;
  };


  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <TouchableWithoutFeedback onPress={() => toggleRequest()}>
        <SafeAreaView style={[styles.container, colorStyles]}>
          <Text style={[styles.title, colorStyles]}>
            Alarme
            </Text>
          {loading && (
            <ActivityIndicator style={styles.spinner} size='large' />
          )}
          {!loading && (
            <Text style={[styles.text, colorStyles]}>
              {title}
            </Text>
          )}
          {counterVisible && (
            <AnimateNumber timing="linear" onFinish={() => finishCounter()} value={5} interval={1000} countBy={1} renderContent={(displayValue) => <Text style={[styles.counter, colorStyles]}>{displayValue}</Text>} />
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <View style={[styles.containerButton,colorStyles]}>
        <Button disabled={counterVisible} color={alarmState === 2 ? '#ffffff' : '#007AFF'} style={styles.button} title="Tirar foto" onPress={() => alert('Tirar foto')} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  button: {
    fontSize: 40,
    fontWeight: '600',
    marginTop: -60
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000000',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000000',
    position: 'absolute',
    top: 100
  },
  counter: {
    fontSize: 200,
    fontWeight: '600',
    color: '#000000'
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 60
  }
});

export default App;
