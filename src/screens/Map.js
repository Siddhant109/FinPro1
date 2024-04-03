import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import app from '../config/firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import * as Location from 'expo-location';
import { theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function App() {
  const navigation = useNavigation();

  const [bininfo, setBininfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    const db = getDatabase(app);
    const dbRef = ref(db, 'UsersData/yU4wwNhqW1Zk9EFaJiZHqXxiqT52/readings');
    // console.log(dbRef);
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        // console.log('Received data:', data);
        setBininfo(data);
        setLoading(false); // Data is received, so set loading to false
      },
      (error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Error occurred, so set loading to false
      }
    );
  }, []);

  const filled = [];
  const notfilled = [];

  if (bininfo) {
    for (const key in bininfo) {
      if (bininfo.hasOwnProperty(key)) {
        if (bininfo[key].status === 'Filled') {
          filled.push({ latitude: bininfo[key].lat, longitude: bininfo[key].lon, filledLevel: bininfo[key].dist });
        } else {
          notfilled.push({ latitude: bininfo[key].lat, longitude: bininfo[key].lon });
        }
      }
    }
    // console.log(filled);
    // console.log(notfilled);
  }

  const handleGetDirections = () => {
    const data = {
      source: {
        // latitude: 19.1880272,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // longitude: 72.8528485,
      },
      destination: {
        latitude: 19.061510,
        longitude: 72.933530,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
      waypoints: filled,
    };

    getDirections(data);
  };
  const handleSchedule = () => {
    navigation.navigate('TruckRoute', { filled: filled });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 19.1851214,
          longitude: 72.8512224,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* <Marker coordinate={{ latitude: 19.0319717, longitude: 72.875858 }} /> */}
        {/* <Marker
            coordinate={{ latitude: parseFloat(filled[0].latitude), longitude: parseFloat(filled[0].longitude) }}
            image={{ uri: 'https://i.ibb.co/cCPc094/trash-12252651.png' }}
          /> */}
        {filled.map((item, index) => (
          <Marker
            key={`filled_${index}`}
            coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }}
            image={{ uri: 'https://ibb.co/kDCNRn6' }}
            title="Filled"
          />
        ))}
        {notfilled.map((item, index) => (
          <Marker
            key={`notfilled_${index}`}
            coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }}
            image={{ uri: 'https://ibb.co/3czSggj' }}
            title="NotFilled"
          />
        ))}
      </MapView>

      {/* <Button onPress={handleGetDirections} title="Get Directions" /> */}

    
      <TouchableOpacity onPress={handleSchedule} style={{ backgroundColor: theme.bg(1) }} className="mx-auto p-3 px-12 rounded-full">
        <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>Truck Schedule</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '90%',
    marginBottom: 17,
  },
});
