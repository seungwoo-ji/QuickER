import { FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

function TogglableButton({ value, toggle, iconName, iconType, text }) {
  const graphicColor = value ? '#000' : '#9fa5aa';
  const IconType = iconType;

  return (
    <TouchableHighlight
      style={styles.icon}
      underlayColor="#DDDDDD"
      onPress={() => {
        toggle(!value);
      }}
    >
      <View
        style={{
          ...styles.icon,
          color: graphicColor,
        }}
      >
        <IconType style={{ color: graphicColor }} size={20} name={iconName} />
        <Text style={[styles.text, { color: graphicColor }]}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

TogglableButton.propTypes = {
  value: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf([FontAwesome5, Ionicons, Octicons]).isRequired,
  text: PropTypes.string.isRequired,
};

function Setting({
  traffic,
  toggleTraffic,
  occupancy,
  toggleOccupancy,
  waitingTime,
  toggleWaitingTime,
}) {
  return (
    <View style={styles.container}>
      <TogglableButton
        value={traffic}
        toggle={toggleTraffic}
        iconName="traffic-light"
        iconType={FontAwesome5}
        text="Traffic"
      />
      <TogglableButton
        value={occupancy}
        toggle={toggleOccupancy}
        iconName="person"
        iconType={Ionicons}
        text="Occupancy"
      />
      <TogglableButton
        value={waitingTime}
        toggle={toggleWaitingTime}
        iconName="clock"
        iconType={Octicons}
        text="Waiting Time"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    marginHorizontal: '10%',
    backgroundColor: '#cccccc',
    borderRadius: 10,
  },
  icon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default Setting;
