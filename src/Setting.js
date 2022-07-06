import { FontAwesome, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch, TouchableHighlight } from 'react-native';

function TogglableButton({ children }) {
  return (
    <TouchableHighlight style={styles.icon} underlayColor="#DDDDDD" onPress={() => {}}>
      <View
        style={{
          ...styles.icon,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </TouchableHighlight>
  );
}

function Setting() {
  return (
    <View style={styles.container}>
      <TogglableButton>
        <FontAwesome5 size={20} name="traffic-light" />
        <Text style={styles.text}>Traffic</Text>
      </TogglableButton>
      <TogglableButton>
        <Ionicons size={20} name="person" />
        <Text style={styles.text}>Occupancy</Text>
      </TogglableButton>
      <TogglableButton>
        <Octicons size={20} name="clock" />
        <Text style={styles.text}>Waiting Time</Text>
      </TogglableButton>
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
    marginHorizontal: 40,
    backgroundColor: '#cccccc',
    borderRadius: 10,
  },
  icon: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  text: {
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default Setting;
