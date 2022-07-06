import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './Home';
import HospitalDetails from './HospitalDetails';

const Stack = createNativeStackNavigator();

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
