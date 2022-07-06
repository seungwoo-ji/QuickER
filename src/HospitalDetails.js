import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import Constants from './Constants';

// const { height, width } = Dimensions.get('window');
// const [currentLongitude, setCurrentLongitude] = useState('...');
// const [currentLatitude, setCurrentLatitude] = useState('...');
// const [locationStatus, setLocationStatus] = useState('');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
  },

  mapView: {
    alignSelf: 'stretch',
    height: '100%',
  },
});
export default function HospitalDetails({ route }) {
  const [hospitalInfo, setHospitalInfo] = useState({});
  const { id } = route.params;

  useEffect(() => {
    fetch(`${Constants.apiUrl}/api/${id}`)
      .then((res) => res.json())
      .then((hospital) => setHospitalInfo(hospital))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <View>
      <Text>TODO: Hospital details </Text>
      {!hospitalInfo ? (
        <Text>Loading....</Text>
      ) : (
        <View>
          <Text>{hospitalInfo._id}</Text>
          <Text>{hospitalInfo.name}</Text>
        </View>
      )}

      <MapView
        style={styles.mapView}
        showsUserLocation
        followUserLocation
        showsPointsOfInterest={false}
      >
        <MapView.Marker
          title={hospitalInfo.name}
          description="HOSPITAL"
          coordinate={{ latitude: 43.7248743, longitude: -79.429756 }}
        />
      </MapView>
    </View>
  );
}
