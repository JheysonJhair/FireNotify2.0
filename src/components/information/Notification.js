import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Notification = ({
  imageSource,
  locationLatitude,
  locationLongitude,
  date,
  hour
}) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const address = await reverseGeocode(
          locationLatitude,
          locationLongitude,
        );
        setAddress(address);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    })();
  }, [locationLatitude, locationLongitude]);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAzjcbLSKk0Bh881pDOETrB1erl1zIjQds`,
      );
      const data = await response.json();
      if (data && data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
    }
    return 'Unknown location';
  };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Incendio detectado</Text>
        <Text style={styles.location}>{address}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.date}>{hour}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default Notification;
