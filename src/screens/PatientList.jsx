import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { theme } from "../constant";
import { Ionicons } from '@expo/vector-icons';
import FlatListWithTabs from '../components/FlatListWithTabs';


export default function PatientList({navigation}) {
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
          // onChangeText={setSearchQuery}
          // onSubmitEditing={handleSearch}
          // value={searchQuery}
          />
        </View>
        </View>

        <FlatListWithTabs navigation={navigation} />
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