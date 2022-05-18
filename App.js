import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import SQLite from "react-native-sqlite-storage";
import DashboardScreen from './components/DashboardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const db = SQLite.openDatabase(
  {
    name: 'user_data_store'
  }
)

const App = () => {

  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setLoggedIn] = useState(null);

  const storeLoginStatus = async () => {
    await AsyncStorage.removeItem('LoginStatus');
  }

  const LoginStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      </Stack.Navigator>
    )
  }

  const DashboardStack = ({ navigation }) => {
    return (
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white' }}>
        <Stack.Screen name='Dashboard' component={DashboardScreen}
          options={{
            title: 'Products',
            headerLeft: () => {
              return null
            },
            headerRight: () => {
              return (
                <TouchableOpacity activeOpacity={0.6}
                  onPress={() => {
                    Alert.alert(
                      'Logout Alert',
                      'Are you sure you want to logout?',
                      [
                        {
                          text: 'No'
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            storeLoginStatus();
                            navigation.replace('LoginStack', { screen: 'Login' });
                          }
                        }
                      ]
                    )
                  }}>
                  <FontAwesome5 name={'power-off'} size={20} color={'white'} />
                </TouchableOpacity>
              )
            }
          }} />
      </Stack.Navigator>
    )
  }

  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      let isLogin = await AsyncStorage.getItem('LoginStatus');
      isLogin = isLogin == 'true' ? true : false;
      setLoggedIn(isLogin);
    })();
    SQLite.enablePromise(true);
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email VARCHAR, password VARCHAR)',
        [],
        () => { console.log('table created'); },
        error => { console.log('some error' + error.message); }
      )
    })
  }, [])


  return isLoggedIn != null ? (
    <NavigationContainer>
      <StatusBar backgroundColor={'mediumblue'} />
      <Stack.Navigator initialRouteName={isLoggedIn ? 'DashboardStack' : 'LoginStack'}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginStack' component={LoginStack} />
        <Stack.Screen name='DashboardStack' component={DashboardStack} options={{ headerLeft: () => { return null; } }} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : <></>;
};

export default App;