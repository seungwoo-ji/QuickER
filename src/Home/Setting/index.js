import { FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import TogglableButton from './TogglableButton';

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

Setting.propTypes = {
  traffic: PropTypes.bool.isRequired,
  toggleTraffic: PropTypes.func.isRequired,
  occupancy: PropTypes.bool.isRequired,
  toggleOccupancy: PropTypes.func.isRequired,
  waitingTime: PropTypes.bool.isRequired,
  toggleWaitingTime: PropTypes.func.isRequired,
};

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
});

export default Setting;
