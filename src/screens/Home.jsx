import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { SIZES, theme } from '../constant';
import { Ionicons } from '@expo/vector-icons';
import FlatListWithTabs from '../components/FlatListWithTabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { auth,database } from '../firebaseConfig';
import {  ref, set, push, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
export default function Home({navigation}) {
const auth = getAuth()
const [currUser, SetCurrUser] = useState({});

    useEffect(()=>{
        getData();
    },[])

console.log(">>>>",currUser)
function getData(params) {
    const starCountRef = ref(database, 'users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const emailToFind = auth.currentUser.email;
      const matchingObjects=[];
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key].email === emailToFind) {
          const matchingObject = {
            id: key,
            ...data[key]
          };
          matchingObjects.push(matchingObject);
        }
      }
      SetCurrUser(matchingObjects[0]);
    });
}


    return (

        <View style={styles.container}>

            {/* <View style={styles.profile}> */}
                <LinearGradient
                    colors={['#0ebf81', '#0bca93', '#08d9ad']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.profile}
                >
                    <View style={styles.innerPro}>
                        <View >
                            <Text style={styles.userName}>Hi, Dr {currUser.name}! </Text>
                            <Text style={styles.searchHead}>Find Your Patient </Text>
                        </View>
                        <TouchableOpacity onPress={()=> navigation.navigate("Profile")}><Image style={styles.avatar} source={require("../assets/img/default-avatar.png")} /></TouchableOpacity>

                    </View>
            </LinearGradient>
            {/* </View> */}
            <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
                {/* <View style={styles.searchSection}> */}
                <View style={styles.search}>
                    <Ionicons name="search-outline" size={24} color="gray" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="gray"
                    // onChangeText={setSearchQuery}
                    // onSubmitEditing={handleSearch}
                    // value={searchQuery}
                    />
                </View>
                {/* </View> */}

                <View style={{ flex:1, marginTop:30 }}>
                <FlatListWithTabs   />
                 </View> 
           
            </ImageBackground>
            <StatusBar style="auto" />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: theme.SIZES.width,
    },
    bg: {
        flex: 1,
    },
    userName: {
        fontSize: 22,
        color: "white",

    },
    searchHead: {
        fontSize: 28,
        color: "white",
        fontWeight: '700',

    },
    search: {
        backgroundColor: 'white',
        width: theme.SIZES.width / 1.1,
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        flexDirection: 'row',
        position: 'absolute',
        top: -28,
        alignSelf: 'center',
        zIndex: 1
    },
    searchInput: {
        marginHorizontal: 14,
        fontSize: 20,
        width: '100%'
    },
    searchSection: {
        // position:'relative'
        alignItems: 'center',
        // flex:0,

        backgroundColor: "#8989"

    },
    profile: {
        width: theme.SIZES.width,
        backgroundColor: theme.COLORS.Primary,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingHorizontal: theme.SIZES.base * 2.5
    },
    innerPro: {
        flexDirection: 'row',
        // backgroundColor: '#575',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingVertical: theme.SIZES.base * 4,

    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 50,

    }
});