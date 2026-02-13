
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SettingsCategoryComponent from "../../../components/settingsCategoryComponent"
import SettingCategories from "../../../components/settingCategories"
import { useAuth } from "../../../context/AuthContext";
import { router } from "expo-router";
export default function Setting({children}) {
  const {logout} = useAuth()
  const handleLogout = () => {
    logout()
    router.replace("/Login")
  }
  return (
    

    <View style={{ flex: 1 }}>
        <ScrollView>

     
      <View style={style.container}>
        <View style={style.headerContainer}>
          <Text style={style.headerTitle}>Settings</Text>
        </View>
        <View style={style.settingContianer}>
            <SettingsCategoryComponent heading='Account' >
              
              <Pressable onPress={() => router.push("/(tabs)/Settings/Profile")}>

                <SettingCategories Title='Profile' iconName='person'/>
              </Pressable>


                <Pressable onPress={() => router.push("/(tabs)/Settings/Notifications")}>

                <SettingCategories Title='Notifications' iconName='notifications'/>
                </Pressable>

                <Pressable onPress={() => router.push("/(tabs)/Settings/Privacy")}>

                <SettingCategories Title='Privacy' iconName='lock-closed'/>
                </Pressable>
            </SettingsCategoryComponent>
           <SettingsCategoryComponent heading='Settings' >

            <Pressable onPress={() => router.push("/(tabs)/Settings/Language")}>
                <SettingCategories Title='Language' iconName='language'/>
            </Pressable>
            <Pressable onPress={() => router.push("/(tabs)/Settings/Support")}>
                <SettingCategories Title='Support' iconName='help-circle'/>
            </Pressable>

            </SettingsCategoryComponent>
            <SettingsCategoryComponent heading='Legal' >
                <Pressable onPress={() => router.push("/(tabs)/Settings/About")}>
                <SettingCategories Title='About' iconName='information-circle-outline'/>
                </Pressable>
                <Pressable onPress={() => router.push("/(tabs)/Settings/Terms")}>
                <SettingCategories Title='Terms & Conditions' iconName='help-circle'/>
                </Pressable>
                
            </SettingsCategoryComponent>
            <View style={style.signOutContainer}>
                <Pressable style={style.signOutButton} onPress={handleLogout}>
                    <Ionicons name="log-out" size={24} color="black" />
                    <Text>Sign Out</Text>
                </Pressable>
            </View>
        

        </View>
      </View>
          </ScrollView>         
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    // backgroundColor: '#2d2d2d',
    backgroundColor:'#801b0e',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  settingHeading: {
    fontSize: 20,
    fontWeight: "semi-bold",
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

  settingContianer:{
    width:'100%',
    padding:10,
    // marginTop:20,

  },

  signOutContainer:{
    display:'flex',
    flexDirection:'column',
    // width:"100%",
    padding:10,
    marginTop:10,
  },

  signOutButton:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'white',
    padding:10,
    justifyContent:'center',
    borderRadius:10,
    width:'100%',
    shadowOffset:{width:0,height:2},
    shadowColor:'black',
    shadowOpacity:0.2,
    shadowRadius:4,
    elevation:5,
    
    
  }
});
