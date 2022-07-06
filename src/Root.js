import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import * as Location from 'expo-location';
import Constants from './Constants';
import HospitalDetails from './HospitalDetails';
import HospitalCard from './HospitalCard';

const Stack = createNativeStackNavigator();

function FlatListItemSeparator() {
  return (
    <View style={{ backgroundColor: 'white', padding: 100 }}>
      <Text>Testing</Text>
    </View>
  );
}

function Home() {
  const [postalCode, setPostalCode] = useState('');
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch(`${Constants.apiUrl}/api`)
      .then((res) => res.json())
      .then((hs) => setHospitals(hs))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar backgroundColor="#61dafb" barStyle="dark-content" />
      <TextInput
        style={styles.searchBar}
        onChangeText={setPostalCode}
        value={postalCode}
        placeholder="Search by postal code"
      />
      <FlatList
        contentContainerStyle={styles.hospitalList}
        data={hospitals}
        renderItem={({ item }) => <HospitalCard data={item} />}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
    </SafeAreaView>
  );
}

export default function Root() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hospitalList: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  searchBar: {},
});
