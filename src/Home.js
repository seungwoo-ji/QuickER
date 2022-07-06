import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
// import * as Location from 'expo-location';
import Constants from './Constants';
import HospitalCard from './HospitalCard';

// function FlatListItemSeparator() {
//   return (
//     <View style={{ backgroundColor: 'white', padding: 100 }}>
//       <Text>Testing</Text>
//     </View>
//   );
// }

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
    <SafeAreaView>
      <StatusBar backgroundColor="#61dafb" barStyle="dark-content" />
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          onChangeText={setPostalCode}
          value={postalCode}
          placeholder="Search by postal code"
          autoCapitalize="characters"
          autoComplete="postal-code"
          textContentType="postalCode"
          returnKeyType="search"
        />
        <TouchableHighlight onPress={() => {}}>
          <View style={styles.sortButton}>
            <Text style={{ color: '#5a5a5a' }}>Sort</Text>
            <AntDesign name="down" size={20} color="#5a5a5a" />
          </View>
        </TouchableHighlight>
      </View>
      <FlatList
        contentContainerStyle={styles.hospitalList}
        data={hospitals}
        renderItem={({ item }) => <HospitalCard data={item} style={styles.hospitalCard} />}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: '10%',
    flexDirection: 'row',
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#9FA5AA',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  sortButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#dcdcdc',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  hospitalList: {
    paddingHorizontal: '10%',
  },
  hospitalCard: {
    marginBottom: 25,
  },
});

export default Home;
