import React from 'react';
import { FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
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

const styles = StyleSheet.create({
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

export default TogglableButton;
