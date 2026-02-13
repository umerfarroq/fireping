import LottieView from "lottie-react-native";

export default function AnimatedFireIcon(){
    return (
        <LottieView
        style={{width:60 , height:60}}
        source={require("../assets/animations/Fire.json")}
        autoPlay
        loop 
        />
    )
}