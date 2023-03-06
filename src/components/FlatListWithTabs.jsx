import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { theme } from '../constant';
import { ref, child, get, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import Ionicons from 'react-native-vector-icons/Ionicons';



// const tabs = [
//   { disease: "All" },
//   { disease: "Diabetes" },
//   { disease: "Food Poisoning" },
//   { disease: "Bruise" },
//   { disease: "Sun Stroke" },
//   { disease: "Broken Bone" },
//   { disease: "Infection" },
//   { disease: "Snake Bite" },
// ];



const ListItem = ({ navigation, name, dateOfArrival, gender, medication, cost, disease }) => (
  <View style={styles.list}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image style={styles.listImg} source={require("../assets/img/patient-img.png")} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{dateOfArrival}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate("PatientDetails", { name, dateOfArrival, gender, medication, cost, disease })}>
      <Ionicons name="caret-forward" size={40} color={theme.COLORS.Primary} />
    </TouchableOpacity>
  </View>
);

const FlatListWithTabs = ({ patientData, navigation }) => {
  // const [data,setPatientsData] = useState([])
  // const data = []
  const [data, setData] = useState([]);

  const tabs = [{ disease: "All" }];
  const diseases = data.map(item => item.disease);
  const distinctDiseases = [...new Set(diseases)];

  distinctDiseases.forEach(disease => {
    tabs.push({ disease });
  });
  // const tabs = data.map(item => ({ disease: item.disease }));
  // console.log()
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredData, setFilteredData] = useState(
    tabs.map(() => data)
  );


  // useEffect(()=>{

  // const dbRef = ref(database);
  // get(child(dbRef, `patients/`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log("Dataaaaa",snapshot.val());
  //     // data.push(snapshot.val())
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

  //   console.log("hello")


  // const starCountRef = ref(database, 'patients/');
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   // updateStarCount(postElement, data);
  //   console.log(data)
  // });
  // patientData ? patientData(): ""


  // }, [])

  useEffect(() => {
    const starCountRef = ref(database, 'patients/');
    onValue(starCountRef, (snapshot) => {
      const pdata = snapshot.val();
      // console.log("pdata", pdata)
      // updateStarCount(postElement, data);
      const dataArray = Object.keys(pdata).map((key) => ({ id: key, ...pdata[key] }))
      // console.log("dataArray", dataArray)
      // console.log(dataArray)
      setData(dataArray)
      // setFilteredData(dataArray)
      console.log('data=>>>>', dataArray)

    }, [])

  }, [])


  useEffect(() => {
    // filterData(0)
    setFilteredData([data])
  }, [data])





  const filterData = (tabIndex) => {
    let filtered;
    if (tabIndex === 0) {
      filtered = data;


    } else {
      filtered = data.filter((item) => item.disease === tabs[tabIndex].disease);

    }

    filteredData[tabIndex] = filtered;
    setFilteredData([...filteredData]);
  };



  const handleTabPress = (tabIndex) => {
    setSelectedTab(tabIndex);
    filterData(tabIndex);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 8 }}>
        <ScrollView style={styles.tabsList} horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.disease}
              onPress={() => handleTabPress(index)}
              style={[
                styles.tab,
                index === selectedTab ? styles.selectedTab : null,

              ]}
            >
              <Text
                style={[
                  styles.tabTitle,
                  index === selectedTab ? styles.selectedTabTitle : null,
                ]}
              >
                {tab.disease}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
      {/* { console.log(">>>>",selectedTab)} */}
      <FlatList
        data={filteredData[selectedTab]}
        style={styles.listSec}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListItem navigation={navigation} name={item.name} dateOfArrival={item.dateOfArrival} cost={item.cost} disease={item.disease} medication={item.medication} gender={item.gender} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1

  },
  tab: {
    backgroundColor: "#daf4f5",
    marginHorizontal: 5,
    borderRadius: 6,

    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 40,
  },
  selectedTab: {
    backgroundColor: theme.COLORS.Primary,
  },
  tabTitle: {
    fontWeight: "bold",
    color: theme.COLORS.Primary,
    fontWeight: "700",

  },
  selectedTabTitle: {
    color: "white"
  },
  tabsList: {
    // marginTop:30,

  },
  list: {
    backgroundColor: theme.COLORS.secondary,
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 14
  },
  listSec: {
    flex: 1
  },
  name: {
    fontSize: 22,
    fontWeight: "500"
  },
  date: {
    color: theme.COLORS.secText
  }
});


export default FlatListWithTabs;
