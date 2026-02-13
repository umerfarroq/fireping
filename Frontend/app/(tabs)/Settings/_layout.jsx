import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
export default function SettingsLayout(){
    return(
        <>
        {/* <StatusBar style="light" /> */}
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false, title:'Settings' , }}/>
  
        <Stack.Screen 
    name='Profile' 
    options={{
        header: () => (
            <View style={style.headerContainer}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" style={style.iconStyle} />
                </Pressable>
                <Text style={style.TextStyle}>
                    Profile
                </Text>
            </View>
        ),
    }}
/>

<Stack.Screen 
    name='Notifications' 
    options={{
        header: () => (
            <View style={style.headerContainer}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" style={style.iconStyle} />
                </Pressable>
                <Text style={style.TextStyle}>
                    Alert History
                </Text>
            </View>
        ),
    }}
/>  
<Stack.Screen 
    name='Privacy' 
    options={{
        header: () => (
            <View style={style.headerContainer}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" style={style.iconStyle} />
                </Pressable>
                <Text style={style.TextStyle}>
                    Privacy
                </Text>
            </View>
        ),
    }} 
/>


<Stack.Screen 
    name='Language' 
    options={{
        header: () => (
            <View style={style.headerContainer}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" style={style.iconStyle} />
                </Pressable>
                <Text style={style.TextStyle}>
                    Language
                </Text>
            </View>
        ),
    }} 
/>


<Stack.Screen 
    name='Support' 
    options={{
        header: () => (
            <View style={style.headerContainer}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" style={style.iconStyle} />
                </Pressable>
                <Text style={style.TextStyle}>
                    Support
                </Text>
            </View>
        ),
    }} 
/>


<Stack.Screen 
    name='About' 
    options={{
        header: () => (
            <View style={style.headerContainer}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" style={style.iconStyle} />
                </Pressable>
                <Text style={style.TextStyle}>
                    About
                </Text>
            </View>
        ),
    }} 
/>

<Stack.Screen 
    name='Terms' 
    options={{
        header: () => (
            <View style={style.headerContainer}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" style={style.iconStyle} />
                </Pressable>
                <Text style={style.TextStyle}>
                    Terms & Conditions
                </Text>
            </View>
        ),
    }} 
/>
  
        </Stack>
        </>
    )
}


const style = StyleSheet.create({
    headerContainer:{
        backgroundColor: '#801b0e',
                paddingTop: 50,
                paddingBottom: 35,
                paddingHorizontal: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',

    },
    iconStyle:{
        fontSize:24,
        color:'#fff'
    },
    TextStyle:{
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'semibold',
        marginLeft: 15
    }

})