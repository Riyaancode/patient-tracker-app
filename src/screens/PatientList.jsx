import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { theme } from "../constant";
import { Ionicons } from '@expo/vector-icons';
import FlatListWithTabs from '../components/FlatListWithTabs';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../firebaseConfig';


export default function PatientList({navigation}) {
  const auth = getAuth()
const [currUser, SetCurrUser] = useState({});
const [newData, setNewData] = useState([]);
const [newFilterData, setNewFilterData] = useState([]);

const [searchQuery, setSearchQuery] = useState("");



    useEffect(()=>{
      console.log(newFilterData)
        getDoctorData();
        getPatientsData();
      
    },[])

    useEffect(()=>{
      searchFilterFunction("")
    }, [newData])

// console.log(">>>>",currUser)
function getDoctorData(params) {
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


const getPatientsData = () => {
    const filteredRef = query(
      ref(database, "patients"),
      orderByChild("doctor"),
      equalTo(auth.currentUser.uid)
    );
    
    onValue(filteredRef, (snapshot) => {
      const pdata = snapshot.val();
      const dataArray = Object.keys(pdata).map((key) => ({ id: key, ...pdata[key] }));
      setNewData(dataArray);
      console.log("fPr data =>>>", dataArray);
    });

  }


  const searchFilterFunction = (text) => {
    
    if (text !== "") {
      const filterData =  newFilterData.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setNewFilterData(filterData)
      setSearchQuery(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setNewFilterData(newData)
      setSearchQuery(text);
      console.log("els")
    }
  };

  return (
    
      <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
        <View style={styles.container}>
        <View style={styles.searchSection}>
        <View style={styles.search}>
          <Ionicons name="search-outline" size={24} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="gray"
            onChangeText={(e)=> searchFilterFunction(e)}
            value={searchQuery}
          />
        </View>
        </View>

        <FlatListWithTabs navigation={navigation} newData={newFilterData} />
        </View>
      </ImageBackground>
   
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'stretch',
    justifyContent: 'center',
    width: theme.SIZES.width,
    marginTop:70
  },
  bg: {
    flex: 1,
  },


  search: {
    backgroundColor: 'white',
    width: theme.SIZES.width / 1.1,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',

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
    marginBottom:10

    // backgroundColor: "#8989"

  },

});