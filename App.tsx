import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/index';

export default function App(): React.JSX.Element {

  useEffect(() => {
    const foregroundSubscriber = messaging().onMessage(async remoteMessage => {
      console.log('Push notification', JSON.stringify(remoteMessage));
    });
    messaging()
      .subscribeToTopic('test')
      .then(() => console.log('suscrito'));

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'Push notification en backround ',
        JSON.stringify(remoteMessage),
      );
    });
    return () => {
      foregroundSubscriber();
    };
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
