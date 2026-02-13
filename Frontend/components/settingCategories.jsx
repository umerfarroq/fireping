
import { View , Text , StyleSheet  } from "react-native"

import { Ionicons } from "@expo/vector-icons"
export default function SettingCategories({Title , iconName}){
    return(
        <>
         <View style={style.accountInnerContainer}>
                    <View style={style.profileIconContainer}>

                    <Ionicons name={iconName} size={24} color="#450a05" style={{padding:5 , backgroundColor:"#ffe7d3" , borderRadius:10,borderWidth:1 , borderColor:"#ffcba7",shadowOffset:{width:0 , height:2},shadowColor:"black",shadowOpacity:0.2,shadowRadius:4}} /> 
                    <Text> {Title}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </View>
        </>
    )
}



const style = StyleSheet.create({


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