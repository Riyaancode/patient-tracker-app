import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import Signup from './screens/Signup';
import BottomTabs from './components/BottomTabs';
import Login from './screens/Login';
import PatientDetails from './screens/PatientDetails';
import { auth } from './firebaseConfig';
import SplashScreen from './screens/SplashScreen';
import { useEffect, useState } from 'react';
const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes and update the isSignedIn state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setIsSignedIn(user !== null);
    });

    // Clean up the listener when unmounting
    return unsubscribe;
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator >
        {isSignedIn? 
           (<>
            <Stack.Screen  name="BottomTabs" component={BottomTabs} options={{ headerShown: false }}  />
            <Stack.Screen  name="Home" component={Home} options={{ headerShown: false }}  />
            <Stack.Screen  name="PatientDetails" component={PatientDetails} options={{
        
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            marginLeft: 10,
            fontSize: 20,
          }, }}  /></>) :
            (<><Stack.Screen  name="Signup" component={Signup} options={{ headerShown: false }}  />
            <Stack.Screen  name="Login" component={Login} options={{ headerShown: false }}  /></>)
        }
      </Stack.Navigator>

      {/* <BottomTabs /> */}
      {/* <Profile /> */}
      {/* <Home /> */}
      {/* <PatientList /> */}
      {/* <AddAppointment /> */}
      {/* <Appointments /> */}
      {/* <Signup /> */}
      {/* <SplashScreen /> */}
      <StatusBar style="auto" />
    </NavigationContainer>

    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
