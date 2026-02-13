import { StyleSheet } from "react-native"

export default function Header() {
    return (
        <View style={styles.header}>
            <Text>Header</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#F4F6FA",
        // height: 60,
        // width: "100%",
        // justifyContent: "space-between",
        // alignItems: "center",
    },
})