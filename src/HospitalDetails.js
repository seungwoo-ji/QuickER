import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, TouchableHighlight, Platform } from 'react-native';
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';
import PropTypes from 'prop-types';

import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import Constants from './Constants';

// https://blog.logrocket.com/applying-box-shadows-in-react-native/

const generateBoxShadow = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
  },

  bedContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: '3.5%',
    height: '23%',
    width: '93%',
    borderRadius: 10,
  },
  bedIcon: {
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: '3.5%',
    height: '15%',
    width: '93%',
    borderRadius: 10,
    infoView: {
      flexDirection: 'row',
      alignItems: 'center',
      infoIcon: {
        paddingRight: 20,
      },
    },
  },
  boxShadow: {},
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

  generateBoxShadow(0, 2, '#171717', 0.25, 3.84, 5, '#171717');

  return (
    <View>
      {!hospitalInfo ? (
        <Text>Loading....</Text>
      ) : (
        <View>
          <View style={styles.bedContainer}>
            <View style={styles.bedIcon}>
              <MaterialCommunityIcons name="bed-empty" size={24} color="black" />
              <Text>{hospitalInfo.available_beds} Available beds</Text>
            </View>
            <View style={styles.bedIcon}>
              <MaterialCommunityIcons name="bed" size={24} color="black" />
              <Text>{hospitalInfo.total_beds} Total beds</Text>
            </View>
          </View>
          <TouchableHighlight
            style={[styles.cardContainer, styles.boxShadow]}
            onPress={() => {
              Linking.openURL(`tel:${hospitalInfo.phone}`);
            }}
          >
            <View style={styles.cardContainer.infoView}>
              <FontAwesome
                name="phone"
                size={24}
                color="black"
                style={styles.cardContainer.infoView.infoIcon}
              />
              <Text>{hospitalInfo.phone}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.cardContainer, styles.boxShadow]}
            onPress={() => {
              openMap({ latitude: 43.72255759828326, longitude: -79.37402099746308 });
            }}
          >
            <View style={styles.cardContainer.infoView}>
              <MaterialIcons
                name="add-location"
                size={24}
                color="black"
                style={styles.cardContainer.infoView.infoIcon}
              />
              <Text>{hospitalInfo.address}</Text>
            </View>
          </TouchableHighlight>
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

HospitalDetails.propTypes = {
  route: PropTypes.object.isRequired,
};
