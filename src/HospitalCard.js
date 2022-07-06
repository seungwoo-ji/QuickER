import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function Circle({ rate }) {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>{rate}%</Text>
    </View>
  );
}

function HospitalCard({ data, style }) {
  const navigation = React.useContext(NavigationContext);

  return (
    <TouchableHighlight
      style={[styles.touchable, style]}
      underlayColor="#DDDDDD"
      onPress={() => {
        navigation.navigate('HospitalDetails', { id: data._id });
      }}
    >
      <View style={styles.card}>
        <Circle rate={45} />
        <View style={styles.description}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontWeight: '600' }}>{data.name}</Text>
          </View>
          <Text style={{ fontSize: 12, color: '#9FA5AA', fontWeight: 'bold' }}>
            <Ionicons style={{ color: '#9FA5AA' }} name="car" size={13} color="black" />
            {` 15 min`}
          </Text>
        </View>
        <Ionicons style={styles.icon} name="information-circle-outline" size={24} color="black" />
      </View>
    </TouchableHighlight>
  );
}

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
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});

export default HospitalCard;
