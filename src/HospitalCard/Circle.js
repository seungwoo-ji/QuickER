import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function percentageToHsl(percentage, hue0, hue1) {
  const hue = percentage * (hue1 - hue0) + hue0;
  return `hsl(${hue}, 60%, 45%)`;
}

function Circle({ rate }) {
  return (
    <View style={{ ...styles.circle, backgroundColor: percentageToHsl(Math.min(rate, 1), 120, 0) }}>
      <Text style={styles.circleText}>{(rate * 100).toFixed()}%</Text>
    </View>
  );
}

Circle.propTypes = {
  rate: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Circle;
