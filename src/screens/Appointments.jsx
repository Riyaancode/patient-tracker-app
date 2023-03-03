import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { SIZES, theme } from '../constant';
import { Ionicons } from '@expo/vector-icons';
import FlatListWithTabs from '../components/FlatListWithTabs';
import { LinearGradient } from 'expo-linear-gradient';

export default function Appointments() {
    return (

        <View style={styles.container}>

        <Text>Appointments</Text>

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
