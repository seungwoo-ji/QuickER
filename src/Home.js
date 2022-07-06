import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  StatusBar,
  TouchableHighlight,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';

import Logo from '../assets/QuickER.png';
import Constants from './Constants';
import HospitalCard from './HospitalCard';
import Setting from './Setting';

function NoHospitalFound() {
  return (
    <View style={styles.noHospitalFound}>
      <AntDesign style={styles.noHospitalFrown} name="frowno" size={30} color="black" />
      <Text style={styles.noHospitalFoundText}>Oops! No hospital found</Text>
    </View>
  );
}

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

function Home() {
  const [loading, setLoading] = useState(true);
  const [postalCode, setPostalCode] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [openedSettings, setOpenedSettings] = useState(false);
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    fetch(`${Constants.apiUrl}/api`)
      .then((res) => res.json())
      .then((hs) => setHospitals(hs))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({ lat: location.latitude, lng: location.longitude });
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#61dafb" barStyle="dark-content" />
      <View style={styles.imageContainer}>
        <Image source={Logo} style={styles.image} />
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          onChangeText={setPostalCode}
          value={postalCode}
          placeholder="Search by postal code"
          placeholderTextColor="#adb2b6"
          autoCapitalize="characters"
          autoComplete="postal-code"
          textContentType="postalCode"
          returnKeyType="search"
        />
        <CogToggle value={openedSettings} onToggle={setOpenedSettings} />
      </View>
      {openedSettings && <Setting />}
      {loading ? (
        <ActivityIndicator size="large" color="#9FA5AA" />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={styles.hospitalList}
            data={hospitals}
            renderItem={({ item }) => <HospitalCard data={item} style={styles.hospitalCard} />}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={NoHospitalFound}
          />
        </View>
      )}
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
    marginRight: 15,
    height: 40,
    backgroundColor: '#fff',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  hospitalList: {
    paddingHorizontal: '10%',
  },
  hospitalCard: {
    marginBottom: 25,
  },
  imageContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 125,
    height: 55,
  },
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

export default Home;
