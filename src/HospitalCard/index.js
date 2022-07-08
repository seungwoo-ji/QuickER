import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Circle from './Circle';

function formatTrafficTime(trafficTime) {
  const hour = (trafficTime / 60).toFixed(0);
  const minute = trafficTime % 60;

  const timeString = hour > 0 ? ` ${hour} h` : '';

  return `${timeString} ${minute} min`;
}

function HospitalCard({ data, style }) {
  const navigation = React.useContext(NavigationContext);

  return (
    <TouchableHighlight
      style={[styles.touchable, style]}
      underlayColor="#DDDDDD"
      onPress={() => {
        navigation.navigate('HospitalDetails', { id: data._id, name: data.name });
      }}
    >
      <View style={styles.card}>
        <Circle rate={data.occupancy_rate} />
        <View style={styles.description}>
          <View style={styles.hospitalTextWrap}>
            <Text numberOfLines={2} style={styles.hospitalName}>
              {data.name}
            </Text>
          </View>
          <Text style={styles.trafficText}>
            <Ionicons style={styles.carIcon} name="car" size={13} color="black" />
            {formatTrafficTime(data.traffic_time)}
          </Text>
        </View>
        <Ionicons
          style={styles.infoIcon}
          name="information-circle-outline"
          size={24}
          color="black"
        />
      </View>
    </TouchableHighlight>
  );
}

HospitalCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    traffic_time: PropTypes.number.isRequired,
    occupancy_rate: PropTypes.number.isRequired,
  }).isRequired,
  style: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  touchable: { borderRadius: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
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
  description: {
    marginLeft: 20,
    justifyContent: 'space-around',
    flexShrink: 1,
    marginRight: 10,
  },
  hospitalTextWrap: {
    flexShrink: 1,
  },
  hospitalName: {
    fontWeight: '600',
    flexShrink: 1,
  },
  trafficText: {
    fontSize: 12,
    color: '#9FA5AA',
    fontWeight: 'bold',
  },
  carIcon: {
    color: '#9FA5AA',
  },
  infoIcon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});

export default HospitalCard;
