import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
//import DestinationScreen from '../screens/DestinationScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import FormScreen from '../screens/FormScreen';
//import TrackRoute from '../screens/TruckRoute'

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                {/* <Stack.Screen name="Home" component={MapScreen} /> */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Form" component={FormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;