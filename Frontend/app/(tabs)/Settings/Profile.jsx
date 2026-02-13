import { View , Text ,Image, StyleSheet, Dimensions } from "react-native"
import profileImg from "../../../assets/Firefighter-removebg-preview.png"
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
    const  SCREEN_WIDTH=Dimensions.get('window').width;
    return(
        <View style={styles.Maincontainer}>  
            

            <View style={styles.PofileCardContainer}>
                <View style={styles.badgeContainer}>
                    <Text style={{fontSize:20 , fontWeight:'bold'}}>Umar Farooq</Text>
                    <Text style={{fontSize:16 , fontWeight:'semi-bold' , opacity:0.7}}>#1234242</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Image source={profileImg} style={styles.profileImage}/>
                </View>
                
            </View>
            <View>

            </View>
            <View style={styles.DeleteAccountContainer}>
                <Ionicons name="trash" size={24} color="red" />
                <Text>Delete Account</Text>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({

    PofileCardContainer:{
        // width:'100%',
        flexDirection:'column-reverse',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:10,
        shadowOffset:{width:0 , height:2},
        shadowColor:'#000',
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5,
    },
    profileContainer:{
        height:200,
        width:200,
        borderRadius:"50%",
        overflow:'hidden',
        marginBottom:10,
        shadowOffset:{width:20 , height:20},
        shadowColor:'#000',
        shadowOpacity:0.5,
        shadowRadius:6.84,
        elevation:5,
    
       
    },
    profileImage:{
        height:'100%',
        width:'100%',
        objectFit:'cover', 
    },
    Maincontainer:{
        flex:1,
        padding:10,
    },

    DeleteAccountContainer:{
        width:'100%',
        padding:10,
        borderRadius:10,
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        color:'#fff',
        backgroundColor:'#fff',
        shadowOffset:{width:0 , height:2},
        shadowOpacity:0.20,
        shadowRadius:3.84,
        elevation:5,


    }

})
