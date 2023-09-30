import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import 
{  
	  View,
	  TextInput,
	  FlatList,
	  SafeAreaView,
	  StyleSheet,
    Linking,
    useTheme,
} from 'react-native';
import { Layout, Text,Button } from 'react-native-rapi-ui';
import Constants from 'expo-constants';
import Login from "./Login";

import * as SQLite from 'expo-sqlite';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

const db = SQLite.openDatabase('db.testDb'); // returns Database object

export default function ({ navigation }) {
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordLamaInput, setPasswordLamaInput] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [items, setItems] = useState([]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };



  useEffect(() => {
    // Membuat tabel jika belum ada
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,password TEXT)'
      );
    });


    // Mengambil data dari database saat aplikasi dimuat
    fetchItems();
  }, []);

  const fetchItems = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
        const data = [];
        const len = rows.length;
        for (let i = 0; i < len; i++) {
          data.push({ 
          	id: rows.item(i).id, 
          	name: rows.item(i).name, 
          	password:rows.item(i).password
          });
          setPasswordLama(rows.item(i).password);
        }
        setItems(data);

      });
    });
  };

  const updatePw = async () => {
    if(passwordLamaInput == "")
    {
      alert('isi password lama');
    }else
    {
       if(passwordBaru == "")
       {
         alert('isi password baru');
       }else
       {
           db.transaction((tx) => {
            tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
                const usernameDb = rows.item(0).name;
                const usernamePw = rows.item(0).password;
                //if(username == usernameDb)
                //{
                   if(passwordLamaInput == usernamePw)
                   {
                      
                      db.transaction((tx) => {
                        tx.executeSql('UPDATE users SET password = ? WHERE id = ?', [passwordBaru, 1], () => {
                          console.log(`berhasil update password.`);
                          //fetchItems(); // Memuat ulang data setelah memperbarui
                        });
                      });
                      alert('berhasil update password.'); 
                   }else
                   {
                      alert('salah password lama');
                   }
               // }else
                //{
                  //alert('salah username');
               // }
              });
          });
       }
    }
  };

// function MyFlatList({ data }) {
//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => {
//           return (
//             <View>

//                   <Text>Anda Login Sebagai : {item.name}</Text>
//                   <Text >
//                   </Text>
//             </View>
//           );
//         //}
//       }}
//     />
//   );
// }

  return (
  	<Layout>
    <View 
    	style=
    	    {{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}>
      
      <Text style={{ 
		    paddingTop: 30,
		    marginBottom: 10,
		  }}>
      	Ganti Password
      </Text>

       <TextInput
        placeholder="Password Lama"
        secureTextEntry={true}
        value={passwordLamaInput}
        onChangeText={(text) => setPasswordLamaInput(text)}
        style={{
        borderBottomWidth: 1, 
        borderColor: 'gray',
        width:330,
      }}
      />

      <TextInput
        placeholder="Password Baru"
        secureTextEntry={true}
        value={passwordBaru}
        onChangeText={(text) => setPasswordBaru(text)}
        style={{
        borderBottomWidth: 1, 
        borderColor: 'gray',
        marginBottom: 10,
        width:330,
      }}
      />

       <Button style={{ 
        marginBottom: 10,
      }} status="primary" text="Update Password" onPress={updatePw} />
      

      <Text style={{
        
          fontSize:16,
          fontWeight:'500',
          color:'#000000',
          textAlign:'center'
        }}>
          Nama : Naily Ikmalul Insiyah
           
           </Text>
      <Text style={{
          fontSize:16,
          fontWeight:'500',
          color:'#000000',
          textAlign:'center'
        }}>
          NIM : 1941720044
           
           </Text>
      <Text style={{
          fontSize:16,
          fontWeight:'500',
          color:'#000000',
          textAlign:'center',
          marginBottom: '280',
        }}>
          Prodi : D4 Teknik Informatika
           
           </Text>

           <Image
        style={styles.image}
        source="https://toriqa.com/wp-content/uploads/2021/11/Gambar-Kartun-Muslimah-Modern-1.jpg"
        
        contentFit="cover"
        transition={1000}
      />

      {/* <MyFlatList data={items} /> */}

      <Button style={{ 
        marginBottom: 10,
        marginTop: 20,
      }} status="danger" text="LogOut" onPress={() => navigation.navigate('Login')} />

     
    </View>
    </Layout>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '70%',
    backgroundColor: '#0553',
  },
});

