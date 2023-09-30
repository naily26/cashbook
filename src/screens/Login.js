import React, { useEffect, useState } from "react";
// import { FontAwesome,MaterialIcons,Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { 
        Text, Button, View, 
        Alert, ScrollView, TextInput,
        TouchableOpacity,Image } 
  from "react-native";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.testDb'); // returns Database object

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  var masterUsername = 'naily';
  var masterPassword = 'naily';
  useEffect(() => {
    const initiate = async () => {};
    initiate();

      // db.transaction((tx) => {
      //   tx.executeSql(
      //     'DROP TABLE IF  EXISTS users '
      //   );
      // });
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,password TEXT)'
        );
      });
      // db.transaction((tx) => {
      //   tx.executeSql(
      //     'TRUNCATE TABLE users'
      //   );
      // });

      //buat user
      //  db.transaction((tx) => {
      //   tx.executeSql('INSERT INTO users (name,password) VALUES (?,?)', 
      //     [masterUsername,masterPassword], (_, { insertId }) => {
      //     console.log(`Data berhasil ditambahkan dengan ID: ${insertId}`);
      //   });
      // });

      //cek user
      // db.transaction((tx) => {
      //   tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
      //     const data = [];
      //     const len = rows.item(0).name;
      //     console.log(len);
      //   });
      // });

  }, []);

  //api handle
  const login = async () => {
    if(username == "")
    {
      alert('isi username');
    }else
    {
       if(password == "")
       {
         alert('isi password');
       }else
       {
  
           db.transaction((tx) => {
            tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
                const usernameDb = rows.item(0).name;
                const usernamePw = rows.item(0).password;
                if(username == usernameDb)
                {
                   if(password == usernamePw)
                   {
                      alert('Selamat datang');
                      props.navigation.navigate("Home");
                       
                   }else
                   {
                      alert('salah password');
                   }
                }else
                {
                  alert('salah username');
                }
                console.log(usernamePw);
              });
          });
       }
    }
  };

  return (
    <View style={{
      flexGrow: 1,
      justifyContent:'center',
      backgroundColor:'#f0f8ff',
      alignItems: 'center'
    }}>
      <Text style={{
      marginBottom: 10,
      fontWeight:'500',
      color:'#000000',
      textAlign:'center'
    }}>
        CASHBOOK
      </Text>

      <FontAwesome style={{
         marginTop: 10,
         borderRadius: 10,
         borderWidth: 1,
         borderColor: '#fff'
      }} name="money" size={70} color="green" />

      <TextInput 
        style={{
            width:340,
            height:50,
            backgroundColor:'rgba(179, 234,215,0.8)',
            borderRadius: 25,
            paddingHorizontal:16,
            fontSize:17,
            color:'#000000',
            marginVertical: 10
        }}
        placeholder="Masukkan Username"
        underlineColorAndroid='rgba(0,0,0,0)'
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        style={{
          width:340,
          height:50,
          backgroundColor:'rgba(179, 234,215,0.8)',
          borderRadius: 25,
          paddingHorizontal:16,
          fontSize:17,
          color:'#000000',
          marginVertical: 10
      }}
        placeholder="Masukkan Password"
        onChangeText={setPassword}
        secureTextEntry={true}
        underlineColorAndroid='rgba(0,0,0,0)'
        value={password}
      />
      
      <TouchableOpacity onPress={() =>login()}
        style={{
          width:340,
          backgroundColor:'#6e706f',
          borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
        }}
      >
        <Text style={{
          fontSize:16,
          fontWeight:'500',
          color:'#ffffff',
          textAlign:'center'
        }}>
          Sign In 
           
           </Text>
        </TouchableOpacity>

    </View>
  );
};
export default Login;