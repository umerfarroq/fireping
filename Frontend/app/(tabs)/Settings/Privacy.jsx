import { View, Text , Switch , StyleSheet } from 'react-native'
import { useState } from 'react'
const Privacy = () => {
    const [isActive , setIsActive] = useState(false)
    return (
        <View style={styles.Maincontainer}> 
            <View style={styles.PrivacyContainer}>
            <Text style={styles.PrivacyText}>{`${isActive ? "Online" : "Offline"}`}</Text>
            <Switch value={isActive} onValueChange={setIsActive}/>
            </View>
        </View>
    )
}

export default Privacy

const styles = StyleSheet.create({
    PrivacyContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.1)',
        // shadowOffset:{width:0,height:1},
        // shadowColor:'black',
        // shadowOpacity:0.2,
        // shadowRadius:4,
        // elevation:5,
        
    },
    Maincontainer:{
        flex:1,
        padding:10,
    },
    PrivacyText:{
        fontSize:16,
        fontFamily:'Poppins_400Regular',
        fontWeight:'600',
    }

})