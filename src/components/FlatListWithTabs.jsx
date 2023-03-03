import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import { theme } from '../constant';
import { ref, child, get, onValue } from "firebase/database";
import { database } from "../firebaseConfig";



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



const ListItem = ({ title, subtitle }) => (
  <View style={styles.list}>
    <Image style={styles.listImg} source={require("../assets/img/patient-img.png")} />
    <View>
    <Text>{title}</Text>
    <Text>{subtitle}</Text>
    </View>
  </View>
);

const FlatListWithTabs = ({patientData}) => {
  // const [data,setPatientsData] = useState([])
  // const data = []
  const [data, setData] = useState([]);

  const tabs = [{disease: "All"}];
const diseases = data.map(item => item.disease);
const distinctDiseases = [...new Set(diseases)];

distinctDiseases.forEach(disease => {
  tabs.push({disease});
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

useEffect(()=>{
  const starCountRef = ref(database, 'patients/');
onValue(starCountRef, (snapshot) => {
const pdata = snapshot.val();
// updateStarCount(postElement, data);
const dataArray = Object.keys(pdata).map((key) => ({ id: key, ...pdata[key] }))
console.log(dataArray)
setData(dataArray)

})

// filterData(selectedTab);
// setSelectedTab(0);
// filterData(0);
},[])


// useEffect(() => {
//   filterData(selectedTab);
// }, [selectedTab]);




    const filterData = (tabIndex) => {
        let filtered;
        if (tabIndex ===0) {
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
      <View style={{paddingVertical:8}}>
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
          <ListItem title={item.name} subtitle={item.disease} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


const styles = {
  container: {
   paddingHorizontal:20,
   flex:1
   
  },
  tab: {
    backgroundColor: "#daf4f5",
    marginHorizontal: 5,
    borderRadius:6,
   
    paddingHorizontal: 10,
    paddingVertical: 10,
    height:40,
  },
  selectedTab: {
    backgroundColor: theme.COLORS.Primary,
  },
  tabTitle: {
    fontWeight: "bold",
    color:theme.COLORS.Primary,
    fontWeight:"700",
    
  },
  selectedTabTitle: {
    color:"white"
  },
  tabsList:{
    // marginTop:30,
  
  },
  list:{
    backgroundColor:theme.COLORS.secondary,
    marginVertical:8,
    padding:10,
    borderRadius:8,
    flexDirection:"row",
    alignItems:"center"
  },
  listImg:{
    width:80,
    height:80,
    borderRadius:8,
    marginRight:14
  },
  listSec:{
   flex:1
  }
};


export default FlatListWithTabs;
