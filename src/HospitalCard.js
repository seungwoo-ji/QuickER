import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function Circle({ rate }) {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>{rate}%</Text>
    </View>
  );
}

function HospitalCard(props) {
  const navigation = React.useContext(NavigationContext);
  const { data, style } = props;

  return (
    <TouchableHighlight
      style={style}
      underlayColor="#DDDDDD"
      onPress={() => {
        navigation.navigate('HospitalDetails', { id: data._id });
      }}
    >
      <View style={styles.card}>
        <Circle rate={45} />
        <View style={styles.description}>
          <Text>{data.name}</Text>
          <Text>min</Text>
        </View>
        <Ionicons style={styles.icon} name="information-circle-outline" size={24} color="black" />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 10,
  },
  description: {
    justifyContent: 'space-between',
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
