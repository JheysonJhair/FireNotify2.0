import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Info from '../../components/information/Info';
import Notification from '../../components/information/Notification';
import { fetchData, fetchData2 } from '../../api/apiFire';
import LoadingIndicator from '../../components/modal/LoadingIndicator';

function Notify() {
  const [selectedTab, setSelectedTab] = useState('Todos');
  const [notifications, setNotifications] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        let data;
        if (selectedTab === 'Todos') {
          data = await fetchData();
        } else {
          data = await fetchData2();
        }
        setNotifications(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchNotifications, 1000);

    return () => clearTimeout(timer);
  }, [selectedTab]);

  const getFireImage = (temperature) => {
    if (temperature > 60) {
      return require('../../assets/fire/3.jpg');
    } else if (temperature > 30) {
      return require('../../assets/fire/2.jpg');
    } else if (temperature > 0) {
      return require('../../assets/fire/1.jpg');
    } else {
      return require('../../assets/logo.png');
    }
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split('T');
    return dateParts[0];
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoAndInfoContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.infoContainerImage}>
            <Info title="ALERTA INCENDIOS" ubicacion="APURíMAC / PERÚ" />
          </View>
        </View>
        <Text style={styles.title}>Notificaciones</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'Todos' && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab('Todos')}>
            <Text style={styles.tabText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'Recientes' && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab('Recientes')}>
            <Text style={styles.tabText}>Recientes</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView>
            <View>
              {selectedTab === 'Todos' ? (
                notifications.map((notification, index) => (
                  <Notification
                    key={index}
                    imageSource={
                      addresses[index]?.streetViewUrl
                        ? { uri: addresses[index].streetViewUrl }
                        : getFireImage(notification.temperature)
                    }
                    locationLatitude={notification.latitud}
                    locationLongitude={notification.longitud}
                    date={formatDate(notification.date)}
                  />
                ))
              ) : (
                notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <Notification
                      key={index}
                      imageSource={
                        addresses[index]?.streetViewUrl
                          ? { uri: addresses[index].streetViewUrl }
                          : getFireImage(notification.temperature)
                      }
                      locationLatitude={notification.latitud}
                      locationLongitude={notification.longitud}
                      date={formatDate(notification.date)}
                    />
                  ))
                ) : (
                  <Text>No hay notificaciones recientes disponibles.</Text>
                )
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingTop: 18,
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#EBEAEB',
  },
  selectedTab: {
    backgroundColor: '#FF9800',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  notification: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  notificationText: {
    fontSize: 16,
  },
  logoAndInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  logoContainer: {
    marginRight: 20,
    backgroundColor: '#E4E2E3',
    borderRadius: 10,
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text00: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#48C26C',
  },
});

export default Notify;
