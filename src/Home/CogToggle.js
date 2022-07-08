import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

function CogToggle({ value, onToggle }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const endValue = value ? 0 : 1;
    Animated.spring(spinValue, {
      toValue: endValue,
      useNativeDriver: false,
    }).start();
    onToggle(!value);
  };

  const spinDeg = spinValue.interpolate({
    useNativeDriver: false,
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <TouchableHighlight underlayColor="gray" style={styles.sortButton} onPress={toggle}>
      <Animated.View style={{ transform: [{ rotate: spinDeg }] }}>
        <FontAwesome name="cog" size={24} color="#9FA5AA" />
      </Animated.View>
    </TouchableHighlight>
  );
}

CogToggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});

export default CogToggle;
