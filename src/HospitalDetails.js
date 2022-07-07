import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableHighlight,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import Constants from './Constants';

function formatPhoneNumber(phoneNumberString) {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
}

function DetailCard({ onPress, children }) {
  return (
    <TouchableHighlight
      style={{ borderRadius: 10, marginTop: 20 }}
      onPress={onPress}
      underlayColor="#DDDDDD"
    >
      {children}
    </TouchableHighlight>
  );
}

export default function HospitalDetails({ route }) {
  const [hospitalInfo, setHospitalInfo] = useState(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    setIsPortrait(width <= height);
  }, []);

  useEffect(() => {
    const eventSubscription = Dimensions.addEventListener('change', (dimensions) => {
      const { width, height } = dimensions.window;
      setIsPortrait(width <= height);
    });

    return () => {
      eventSubscription.remove();
    };
  }, []);

  useEffect(() => {
    fetch(`${Constants.apiUrl}/api/${id}`)
      .then((res) => res.json())
      .then((hospital) => setHospitalInfo(hospital))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      {!hospitalInfo ? (
        <Text>Loading....</Text>
      ) : (
        <View style={[styles.container, { flexDirection: isPortrait ? 'column' : 'row' }]}>
          <MapView
            style={{
              flex: 1,
            }}
            showsUserLocation
            followUserLocation
            showsPointsOfInterest={false}
            region={{
              latitude: hospitalInfo.latitude,
              longitude: hospitalInfo.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <MapView.Marker
              title={hospitalInfo.name}
              description="HOSPITAL"
              coordinate={{ latitude: hospitalInfo.latitude, longitude: hospitalInfo.longitude }}
            />
          </MapView>
          <ScrollView
            style={{ flex: 1, paddingLeft: isPortrait ? 0 : 15, paddingTop: isPortrait ? 15 : 0 }}
          >
            <View style={styles.bedContainer}>
              <View style={styles.bedIcons}>
                <FontAwesome name="hourglass" size={24} color="black" />
                <Text>Waiting time</Text>
                <Text>{hospitalInfo.wait_time} min</Text>
              </View>
              <View style={styles.bedIcons}>
                <MaterialCommunityIcons name="bed-empty" size={30} color="black" />
                <Text>Available beds</Text>
                <Text>{hospitalInfo.available_beds}</Text>
              </View>
              <View style={styles.bedIcons}>
                <MaterialCommunityIcons name="bed" size={30} color="black" />
                <Text>Total beds</Text>
                <Text>{hospitalInfo.total_beds}</Text>
              </View>
            </View>
            <DetailCard onPress={() => Linking.openURL(`tel:${hospitalInfo.phone}`)}>
              <View style={styles.card}>
                <FontAwesome style={styles.infoIcon} name="phone" size={35} color="black" />
                <Text style={styles.infoTxt}>{formatPhoneNumber(hospitalInfo.phone)}</Text>
              </View>
            </DetailCard>
            <DetailCard
              onPress={() =>
                openMap({
                  query: hospitalInfo.address,
                })
              }
            >
              <View style={styles.card}>
                <MaterialIcons
                  name="add-location"
                  size={35}
                  color="black"
                  style={styles.infoIcon}
                />
                <Text style={styles.infoTxt}>{hospitalInfo.address}</Text>
              </View>
            </DetailCard>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  bedContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  bedIcons: {
    alignItems: 'center',
  },
  infoIcon: {
    marginLeft: '20%',
  },
  infoTxt: {
    marginLeft: '10%',
    fontSize: 20,
    flexShrink: 1,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
