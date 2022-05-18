import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import styles from "../styles";
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";


const db = openDatabase({ name: 'user_data_store' })

const LoginScreen = ({ navigation }) => {

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [isEnable, setEnable] = useState(false)

  const storeLoginStatus = async () => {
    await AsyncStorage.setItem('LoginStatus', "true");
  }

  function validateUsername(name) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return pattern.test(name) === true;
  }

  function validatePassword(pwd) {
    return pwd.length >= 6;
  }

  async function clickOnLogin() {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM users WHERE (email = ? AND password = ?)',
        [username, password],
        (tx, results) => { 
          if (results.rows.length > 0) {
            storeLoginStatus();
            ToastAndroid.show('Login successfully...', ToastAndroid.SHORT);
            navigation.replace('DashboardStack', { screen: 'Dashboard' });
          } else {
            ToastAndroid.show('No user found', ToastAndroid.SHORT);
          }
          // console.warn(results);
          // for (let index = 0; index < results.rows.length; index++) {
          //   console.warn(results.rows.item(index));
          // }
        },
        error => { 
          console.log('some error:' + error.message); 
        }
      )
    })
  }

  //console.warn(`${username} -- ${password}`)
  return (
    <View style={styles.parent}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.subtitle}>Username</Text>
        <View style={styles.inputView}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
          <TextInput style={styles.edittext} placeholder='Type your username'
            keyboardType='email-address'
            onChangeText={(text) => {
              setUsername(text)
              if (username !== null && password !== null) {
                setEnable(validateUsername(text) && validatePassword(password))
              }
            }} />
        </View>

        <Text style={[styles.subtitle, { marginTop: 8 }]}>Password</Text>
        <View style={styles.inputView}>
          <Image source={require('../assets/pwd.png')} style={styles.icon} />
          <TextInput style={styles.edittext} placeholder='Type your password'
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text)
              if (username !== null && password !== null) {
                setEnable(validateUsername(username) && validatePassword(text))
              }
            }} />
        </View>

        <TouchableOpacity style={styles.textEnd}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.subtitle}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={isEnable ? styles.button : styles.buttonDisabled}
          activeOpacity={0.5}
          disabled={!isEnable}
          onPress={clickOnLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.bottomView}>
          <Text>Haven't account?</Text>
          <TouchableOpacity activeOpacity={0.5}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen;