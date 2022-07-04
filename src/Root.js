import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button, FlatList } from 'react-native';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HospitalCard({ data }) {
  const navigation = React.useContext(NavigationContext);

  return (
    <View>
      <Text>This is hospital {data.name}</Text>
      <Button
        title="OPEN"
        onPress={() => {
          navigation.navigate('HospitalDetails', {
            id: data._id,
          });
        }}
      />
    </View>
  );
}

function Home() {
  const [postalCode, setPostalCode] = useState('');
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.175:8080/api')
      .then((res) => res.json())
      .then((hs) => setHospitals(hs))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={setPostalCode}
        value={postalCode}
        placeholder="Search by postal code"
      />

      <FlatList data={hospitals} renderItem={({ item }) => <HospitalCard data={item} />} />
    </View>
  );
}

function HospitalDetails({ route, navigation }) {
  const [hospitalInfo, setHospitalInfo] = useState({});
  const { id } = route.params;

  useEffect(() => {
    fetch(`http://192.168.1.175:8080/api/${id}`)
      .then((res) => res.json())
      .then((hospital) => setHospitalInfo(hospital))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <View>
      <Text>TODO: Hospital details </Text>
      {!hospitalInfo ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>{hospitalInfo._id}</Text>
          <Text>{hospitalInfo.name}</Text>
        </View>
      )}
    </View>
  );
}

export default function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {},
});
