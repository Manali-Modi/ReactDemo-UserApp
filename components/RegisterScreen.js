import React, { useState } from "react";
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

const db = openDatabase(
  {
    name: 'user_data_store'
  }
);

const RegisterScreen = ({ navigation }) => {

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [rePassword, setRePassword] = useState(null)
  const [isEnable, setEnable] = useState(false)

  function validateName(name) {
    return name.length > 0;
  }

  function validateEmail(email) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return pattern.test(email) === true;
  }

  function validatePassword(pwd) {
    return pwd.length >= 6;
  }

  function validateRePassword(rePwd) {
    return rePwd === password;
  }

  function validateAll(nm, eid, pwd, rePwd) {
    if (nm != null && eid != null && pwd != null && rePwd != null) {
      setEnable(
        validateName(nm) &&
        validateEmail(eid) &&
        validatePassword(pwd) &&
        validateRePassword(rePwd)
      )
    }
  }
  function clickOnRegister() {
    ToastAndroid.show('Register successfully', ToastAndroid.SHORT);
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO users (name, email, password) VALUES (?,?,?)',
        [name, email, password],
        () => { 
          console.log('value instered');
          navigation.goBack();
        },
        error => { console.log('some error' + error.message); }
      )
    })
  }

  return (
    <View style={styles.parent}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>

        <Text style={styles.subtitle}>Full name</Text>
        <View style={styles.inputView}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
          <TextInput style={styles.edittext} placeholder='Type your name'
            onChangeText={(text) => {
              setName(text)
              validateAll(text, email, password, rePassword)
            }} />
        </View>

        <Text style={[styles.subtitle, { marginTop: 8 }]}>Email (It will become your username)</Text>
        <View style={styles.inputView}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
          <TextInput style={styles.edittext} placeholder='Type your email address'
            keyboardType='email-address'
            onChangeText={(text) => {
              setEmail(text)
              validateAll(name, text, password, rePassword)
            }} />
        </View>

        <Text style={[styles.subtitle, { marginTop: 8 }]}>Password (Must be 6 character long)</Text>
        <View style={styles.inputView}>
          <Image source={require('../assets/pwd.png')} style={styles.icon} />
          <TextInput style={styles.edittext} placeholder='Type your password'
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text)
              validateAll(name, email, text, rePassword)
            }} />
        </View>

        <Text style={[styles.subtitle, { marginTop: 8 }]}>Re-enter Password</Text>
        <View style={styles.inputView}>
          <Image source={require('../assets/pwd.png')} style={styles.icon} />
          <TextInput style={styles.edittext} placeholder='Type your password once again'
            secureTextEntry={true}
            onChangeText={(text) => {
              setRePassword(text)
              validateAll(name, email, password, text)
            }} />
        </View>

        <TouchableOpacity style={isEnable ? styles.button : styles.buttonDisabled}
          activeOpacity={0.5}
          disabled={!isEnable}
          onPress={clickOnRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.bottomView}>
          <Text>Already have account?</Text>
          <TouchableOpacity activeOpacity={0.5}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default RegisterScreen;