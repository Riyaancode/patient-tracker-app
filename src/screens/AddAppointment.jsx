import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SIZES, theme } from '../constant';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup from 'react-native-radio-buttons-group';
import Btn from '../components/Btn';
import {  ref, set, push } from "firebase/database";
import { database } from '../firebaseConfig';
import { useHeaderHeight } from '@react-navigation/elements';

export default function AddAppointment({navigation}) {
    const height = useHeaderHeight()
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [radioButtons, setRadioButtons] = useState([
        {
            id: '1',
            label: 'Male',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Female',
            value: 'option2'
        }
    ]);
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [disease, setDisease] = useState("");
    const [cost, setCost] = useState(0);
    const [medication, setMedication] = useState("");

   
    const handleNameChange = (value) => {
        setName(value);
      };

      const diseaseNameChange = (value) => {
        setDisease(value);
      };

      const costChange = (value) => {
        setCost(value);
      };
      const medicationNameChange = (value) => {
        setMedication(value);
      };
    console.log(date.toLocaleDateString("en-US"))
    const AddPatientData = ()=>{
        const patientRef = push(ref(database, 'patients'));
        const patientId = patientRef.key;
      
        set(patientRef, {
          "name": name,
          "disease": disease,
          "medication": medication.split(","),
          "gender":gender,
          "dateOfArrival": date.toLocaleDateString("en-US"),
          "cost": cost
        })
      
    .then(() => {
        console.log("Sucessfully insert", patientId);
        navigation.navigate("PatientList")
    })
    .catch((error) => {
        console.log("Error not", error);
    });
    }





    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
        radioButtonsArray.map((gender)=>{

            if (gender.selected === true && gender.label === "Male") {
                setGender("Male")
            }else if(gender.selected === true && gender.label === "Female"){
                setGender("Female")
            }
           
        })
       
    }


    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (

        <View style={styles.container}>
            <ImageBackground style={styles.bg} source={require("../assets/img/bg.png")}>
                <View style={styles.form}>
                        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={height} >
                        <ScrollView showsVerticalScrollIndicator={true} >

                            <View style={styles.section}>
                                <Text style={styles.label}>Patient’s Name</Text>
                                <TextInput style={styles.input} value={name} onChangeText={handleNameChange} placeholder="Enter Patient Name Here" />
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.label}>Date of Birth</Text>
                                <View style={styles.date} >
                                    <Button onPress={showDatepicker} title="Show date picker" />
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange}
                                            maximumDate={new Date()} // to set max date
                                            minimumDate={new Date(1990, 0, 1)} // to set min date
                                        />
                                    )}
                                </View>



                            </View>
                            <View style={styles.section}>
                                <Text style={styles.label}>Gender</Text>
                                {/* <TextInput style={styles.input} /> */}
                                <RadioGroup
                                    layout='row'
                                    radioButtons={radioButtons}
                                    onPress={onPressRadioButton}
                                />
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.label}>Cost</Text>
                                <TextInput style={styles.input} value={cost} onChangeText={costChange} keyboardType={'numeric'} placeholder={"0"} />
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.label}>Disease </Text>
                                <TextInput style={styles.input} value={disease} onChangeText={diseaseNameChange} placeholder={"Enter Patient Email Here"} />
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.label}>Medication </Text>
                                <TextInput style={styles.input} value={medication} onChangeText={medicationNameChange} placeholder={"Enter Patient Email Here"} />
                            </View>
                            </ScrollView>
                        </KeyboardAvoidingView>

                    
                </View>
                <Btn title={"Submit"} submitFunct={AddPatientData} />
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bg: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 16,
    },
    form: {
        backgroundColor: "white",
        borderRadius: 15,
        flex: 0.9,
        marginTop: 50,
        padding: 20
    },
    label: {
        fontSize: 20,
        marginBottom: 8,

    },
    input: {
        borderWidth: 1,
        borderColor: "#e7e8ee",
        paddingVertical: 14,
        paddingHorizontal: 10,
        fontSize: 20,
        color: "#677294",
        borderRadius: 10
    },
    section: {
        marginVertical: 12
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#e7e8ee",
        paddingVertical: 14,
        paddingHorizontal: 10,
        fontSize: 20,
        color: "#677294",
        borderRadius: 10
    },

});