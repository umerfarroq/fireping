import { FlatList, Text, View , StyleSheet} from "react-native"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
const alert = [
    { 
        id:'1' , location:'Firdous colony ,Bemina, Srinagar' , time:'10:00 AM' , date:'2022-01-01' , title:'Fire Alert',
    },
    {
        id:'2' , location:"Qamarwari, Srinagar" , time:'11:00 AM' , date:'2022-01-01' , title:'Fire Alert',
    },
    {
        id:'3' , location:"Batapora ,Hazratbal, Srinagar" , time:'12:00 PM' , date:'2022-01-01' , title:'Fire Alert',
    },
        { 
        id:'4' , location:'Firdous colony ,Bemina, Srinagar' , time:'10:00 AM' , date:'2022-01-01' , title:'Fire Alert',
    },
    {
        id:'5' , location:"Qamarwari, Srinagar" , time:'11:00 AM' , date:'2022-01-01' , title:'Fire Alert',
    },
    {
        id:'6' , location:"Batapora ,Hazratbal, Srinagar" , time:'12:00 PM' , date:'2022-01-01' , title:'Fire Alert',
    }
]
const Notifications=() => {
    return(
       
            <FlatList data = {alert} keyExtractor={(item) => item.id} renderItem={({item}) => (
                <View style={styles.card}>
    {/* Header Row */}
    <View style={styles.headerRow}>
        {/* <Text style={styles.icon}><Ionicons name="fire-extinguisher" size={24} color="black" /></Text> */}
        <Text style={styles.icon}>  <MaterialCommunityIcons
            name="fire"
            style={styles.icon}
            color="#ff4f0d"
          /> </Text>
       
        <Text style={styles.title}>{item.title}</Text>
    </View>
    
    {/* Location */}
    <View style={styles.locationRow}>
        <Text style={styles.locationIcon}>
            <Ionicons
            name="location-outline"
            size={24}
            color="#ff4f0d"
          />
        </Text>
        <Text style={styles.location}>{item.location}</Text>
    </View>
    
    {/* Footer - Time & Date */}
    <View style={styles.footerRow}>
        <Text style={styles.timeDate}> <Ionicons name="time-outline" size={24} color="#ff4f0d" /> {item.time}  •  <Ionicons name="calendar-outline" size={24} color="#ff4f0d" /> {item.date}</Text>
    </View>
</View>

            )}/>


        
    )
}

export default Notifications

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',  // Light gray background
    },
    card: {
        backgroundColor: '#fff4ec',
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 4,
        // Shadow
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#c92205',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        // Left accent border
        borderLeftWidth: 4,
        borderLeftColor: '#ff4f0d',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        fontSize: 30,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#801b0e',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    location: {
        fontSize: 14,
        color: '#9f1c0d',
    },
    footerRow: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingTop: 10,
    },
    timeDate: {
        fontSize: 12,
        color: '#666',
    },
})