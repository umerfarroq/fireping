
import { router, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useFireAlert } from "../../context/FireAlertContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { View , Text } from "react-native";

export default function TabsLayout() {

  const {hasFireAlert , setHasFireAlert} = useFireAlert();
  const {isAuthenticated , loading} = useAuth();

  useEffect(() => {
    if(loading) return


    if(!isAuthenticated){
      router.replace("/Login")

    } else {
      if(hasFireAlert){
        router.replace("/(tabs)/alertV3")
      }  
      else{
        router.replace("/(tabs)/idleScreen")
      }
    }
  },[isAuthenticated , hasFireAlert , loading])


  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#e23003",
        tabBarStyle: {
          height: 50,
        }
      }}
    >
      <Tabs.Screen
        name="idleScreen"
        href={!hasFireAlert ? "/(tabs)/idleScreen" : null}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

  
      <Tabs.Protected guard={hasFireAlert}>
        <Tabs.Screen
          name="alertV3"
          options={{
            title: "Alert",
            href:hasFireAlert ? "/(tabs)/alertV3" : null,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="notifications" size={size} color={color} />
            ),
          }}
        />
      </Tabs.Protected>

      <Tabs.Screen 
    name="Settings" 
    options={{
        title: 'Settings',
        headerShown:false,
        header: () => (
            <View style={{
                backgroundColor: '#2d2d2d',
                paddingTop: 50,
                paddingBottom: 20,
                paddingHorizontal: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>
                <Text style={{
                    color: '#fff', 
                    fontSize: 20, 
                    fontWeight: 'semibold',
                    textAlign: 'center'
                }}>
                    Settings
                </Text>
            </View>
        ),
        tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
        ),
    }}
/>
    </Tabs>
  );
}