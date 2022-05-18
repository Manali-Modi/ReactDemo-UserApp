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

const db = openDatabase({ name: 'user_data_store' })

const ForgotPasswordScreen = ({ navigation }) => {

  const [isEnable, setEnable] = useState(false)
  const [email, setEmail] = useState(null)

  function validateEmail(email) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return pattern.test(email) === true;
  }

  function clickOnSubmit() {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (tx, results) => { 
          if (results.rows.length > 0) {
            ToastAndroid.show('Submitted successfully', ToastAndroid.SHORT);
          navigation.goBack();
          } else {
            ToastAndroid.show('Please enter registered email address only', ToastAndroid.SHORT);
          }
        },
        error => { 
          console.log('some error:' + error.message); 
        }
      )
    })
  }

  return (
    <View style={styles.parent}>
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.subtitle}>Email</Text>
        <View style={styles.inputView}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
          <TextInput style={styles.edittext} placeholder='Type your registered email'
            keyboardType='email-address'
            onChangeText={(text) => {
              setEmail(text)
              setEnable(validateEmail(text))
            }} />
        </View>

        <TouchableOpacity style={isEnable ? styles.button : styles.buttonDisabled}
          activeOpacity={0.5}
          disabled={!isEnable}
          onPress={clickOnSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ForgotPasswordScreen;