import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function NoHospitalFound() {
  return (
    <View style={styles.noHospitalFound}>
      <AntDesign style={styles.noHospitalFrown} name="frowno" size={30} color="black" />
      <Text style={styles.noHospitalFoundText}>Oops! No hospital found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noHospitalFound: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noHospitalFrown: {
    color: '#9FA5AA',
    marginBottom: 10,
  },
  noHospitalFoundText: {
    color: '#9FA5AA',
    fontSize: 20,
  },
});

export default NoHospitalFound;
