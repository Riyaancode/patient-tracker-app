import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import Signup from './screens/Signup';
import BottomTabs from './components/BottomTabs';
import Login from './screens/Login';
const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    // <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Signup'>
        <Stack.Screen  name="Home" component={Home} options={{ headerShown: false }}  />
        <Stack.Screen  name="Signup" component={Signup} options={{ headerShown: false }}  />
        <Stack.Screen  name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen  name="BottomTabs" component={BottomTabs} options={{ headerShown: false }}  />

        </Stack.Navigator>
      {/* <BottomTabs /> */}
      {/* <Profile /> */}
      {/* <Home /> */}
      {/* <PatientList /> */}
      {/* <AddAppointment /> */}
      {/* <Appointments /> */}
      {/* <Signup /> */}
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
