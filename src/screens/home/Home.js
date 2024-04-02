import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/forms/Button';
import MapView, {Marker, Circle} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {fetchFireLocations, fetchData} from '../../api/apiFire';

export default function Home() {
  const [fireLocations, setFireLocations] = useState([]);
  const [fireCircleData, setFireCircleData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDataAndCircle = async () => {
      const locations = await fetchFireLocations();
      const circleData = await fetchData();
      setFireLocations(locations);
      setFireCircleData(circleData);
    };

    fetchDataAndCircle();

    const intervalId = setInterval(fetchDataAndCircle, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fuego</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -13.6394,
          longitude: -72.8814,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {fireLocations.length > 0 &&
          fireLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(location.latitud),
                longitude: parseFloat(location.longitud),
              }}
              title={`Temperatura: ${location.temperature}`}
              description={`Fecha: ${location.date}`}
              style={styles.markerImage}>
              <Image
                source={require('../../assets/fuego.png')}
                style={styles.markerImage}
              />
            </Marker>
          ))}

        {fireCircleData.length > 0 &&
          fireCircleData.map((circle, index) => (
            <Circle
              key={index}
              center={{
                latitude: parseFloat(circle.latitud),
                longitude: parseFloat(circle.longitud),
              }}
              radius={80}
              fillColor="rgba(255, 0, 0, 0.5)"
              strokeColor="rgba(255, 0, 0, 0.5)"
            />
          ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Notificaciones"
          onPress={() => navigation.navigate('Notify')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002854',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 8,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#002854',
    width: '100%',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  markerImage: {
    width: 30,
    height: 30,
  },
});
