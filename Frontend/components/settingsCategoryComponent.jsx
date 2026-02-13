
import { View , Text , StyleSheet, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import SettingCategories from "./settingCategories"
import { Children } from "react"
export default function SettingsCategoryComponent({heading,children  }){
    return (
        <>
        
        <Text>{heading}</Text>
            <View style={style.accountContainer}>
                {children}
            </View>
            </>
    )
}


const style = StyleSheet.create({
  accountContainer:{
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    margin:10,
    // width:'100%',
    display:'flex',
    flexDirection:'column',
    gap:14,
    shadowOffset:{width:0,height:2},
    shadowColor:'black',
    shadowOpacity:0.2,
    shadowRadius:4,
  },

  profileIconContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10

  },


    accountInnerContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomWidth:1,
    
    // borderBottomColor:'#ccc',
    borderBottomColor:'rgba(0,0,0,0.1)',
    padding:8
  },


})




// <Text>Account</Text>
//             <View style={style.accountContainer}>

//                 {/* profileContainer */}
//                 <View style={style.accountInnerContainer}>
//                     <View style={style.profileIconContainer}>

//                     <Ionicons name="person" size={24} color="#450a05" style={{padding:5 , backgroundColor:"#ffe7d3" , borderRadius:10,borderWidth:1 , borderColor:"#ffcba7",shadowOffset:{width:0 , height:2},shadowColor:"black",shadowOpacity:0.2,shadowRadius:4}} /> 
//                     <Text> Profile</Text>
//                     </View>
//                     <Ionicons name="chevron-forward" size={24} color="black" />
//                 </View>

//                 {/* notificationContainer */}

//                 <View style={style.accountInnerContainer}>
//                     <View style={style.profileIconContainer}>

//                     <Ionicons name="notifications" size={24} color='#e23003' style={{padding:5 , backgroundColor:"#ffe7d3" , borderRadius:10,borderWidth:1 , borderColor:"#ffcba7",shadowOffset:{width:0 , height:2},shadowColor:"black",shadowOpacity:0.2,shadowRadius:4}} /> 
//                     <Text> Notifications</Text>
//                     </View>
//                     <Ionicons name="chevron-forward" size={24} color="black" />
//                 </View>


//                 {/*  PrivacyContainer*/}    

//                 <View style={style.accountInnerContainer}>
//                     <View style={style.profileIconContainer}>

//                     <Ionicons name="lock-closed" size={24} color="black" style={{padding:5 , backgroundColor:"#ffe7d3" , borderRadius:10,borderWidth:1 , borderColor:"#ffcba7",shadowOffset:{width:0 , height:2},shadowColor:"black",shadowOpacity:0.2,shadowRadius:4}} /> 
//                     <Text> Privacy</Text>
//                     </View>
//                     <Ionicons name="chevron-forward" size={24} color="black" />
//                 </View>
                
//             </View>