import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [postalCode, setPostalCode] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={setPostalCode}
        value={postalCode}
        placeholder="Search by postal code"
      />
    </View>
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
