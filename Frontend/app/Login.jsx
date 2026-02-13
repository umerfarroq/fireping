import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router  } from "expo-router";
import { useState } from "react";
import { useFireAlert } from "../context/FireAlertContext";
import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import AnimatedFireIcon from "../components/animatedFireIcon";

export default function Login() {
  const [beltNo, setBeltNo] = useState("1234567");
  const [password, setPassword] = useState("umar121");
  const [fireAlert, setFireAlert] = useState(false);
   const {hasFireAlert} = useFireAlert()
  
   const {login , isAuthenticated} = useAuth()
  // const handleLogin = () => {
  //   console.log("Belt no:", beltNo);
  //   console.log("password:", password);

  //   setBeltNo("");
  //   setPassword("");

  //   if (hasFireAlert) {
  //     router.navigate("/(tabs)/alertV3");
  //   } else {
  //     router.navigate("/(tabs)/idleScreen");
  //   }
  // };

  console.log("Auth state:" , isAuthenticated)
  // const handleLogin = async() => {
  // try {
  //   const response = await login(beltNo,password);
  //   console.log('LOGIN RESPONSE:',response);
  //   alert("login success!")
  //   if(hasFireAlert){
  //     router.replace("/(tabs)/alertV3")
  //   }else{
  //     router.replace("/(tabs)/idleScreen")
  //   }
  // } catch(error){
  //   alert("Login Failed!" + error.message);
  // }
  // };


  const handleLogin = async() => {
  try {
   await login(beltNo,password)
   if(hasFireAlert){
    router.replace("/(tabs)/alertV3")
   }else{
    router.replace("/(tabs)/idleScreen")
   }
  } catch(error){
    alert("Login Failed!" + error.message);
  }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <StatusBar style="dark" />

          {/* Logo Badge */}
          <View style={styles.logoWrapper}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>  FirePing</Text>
              <AnimatedFireIcon/>
            </View>
          </View>

          {/* Inputs */}
          <View style={styles.inputsWrapper}>
            <TextInput
              placeholder="Belt No"
              placeholderTextColor="#ff7434"
              value={beltNo}
              onChangeText={setBeltNo}
              style={styles.input}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#ff7434"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <Text style={styles.forgotText}>Forget Password</Text>
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
            ]}
          >
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff4ec", // grenadier-50
  },
  inner: {
    flex: 1,
    backgroundColor: "#fff4ec",
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  logoWrapper: {
    alignItems: "center",
  },
  logoBadge: {
    backgroundColor: "#ffe7d3", // grenadier-100
    borderWidth: 1,
    borderColor: "#ffcba7", // grenadier-200
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection:"row",
    alignItems:"center",
    shadowOffset:{width:0 , height:2},
    shadowColor:"#000",
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
    
  },
  logoText: {
    color: "#801b0e", // grenadier-900
    fontSize: 28,
    fontWeight: "700",
  },
  inputsWrapper: {
    gap: 20,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ffa66f", // grenadier-300
    color: "#801b0e", // grenadier-900
    fontSize: 16,
  },
  forgotText: {
    textAlign: "right",
    color: "#e23003", // grenadier-600
    fontSize: 14,
    fontWeight: "500",
  },
  submitButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#ff4f0d", // grenadier-500
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonPressed: {
    backgroundColor: "#e23003", // grenadier-600
  },
  submitText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
