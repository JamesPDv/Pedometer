import * as React from 'react';
import { ActivityIndicator, View } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PedometerScreen from './screens/Pedometer.js';


const Stack = createNativeStackNavigator();

export default function App() {
  
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    setTimeout(()=> {
      setIsLoading(false);
    }, 1000);

  }, []);

  if (isLoading) {
    return ( <View>
      <ActivityIndicator size="large" />
    </View>
    )
  }
  
    return (
    <PedometerScreen />
  );
}