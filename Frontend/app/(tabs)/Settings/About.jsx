import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../../assets/animations/Fire.json";
import AnimatedFireIcon from "../../../components/animatedFireIcon";

export default function About() {
  const APP_VERSION = "1.0.0";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            {/* <Image source={logo} style={styles.logo} /> */}
            <AnimatedFireIcon/>
          </View>
          <Text style={styles.appName}>FirePing</Text>
          <Text style={styles.version}>v{APP_VERSION}</Text>
        </View>

        {/* MISSION STATEMENT */}
        <View style={styles.card}>
          <Text style={styles.missionText}>
            "Empowering firefighters with real-time navigation and critical data to save lives faster."
          </Text>
        </View>

        {/* THE "WHY" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why FirePing?</Text>
          <Text style={styles.bodyText}>
            Every second counts in an emergency. FirePing was built to replace outdated communication methods with instant, digital alerts and precision tracking, ensuring that help arrives exactly when and where it's needed.
          </Text>
        </View>

        {/* CREDITS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credits</Text>
          <Text style={styles.bodyText}>
            Designed & Developed by the FirePing Team.
          </Text>
          {/* <Text style={styles.subText}>
            Special thanks to the open-source community.
          </Text> */}
        </View>

        {/* LEGAL LINKS */}
        <View style={styles.legalContainer}>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </Pressable>
          <Text style={styles.bullet}>•</Text>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Pressable>
        </View>

        {/* COPYRIGHT */}
        <Text style={styles.copyright}>
          © {new Date().getFullYear()} FirePing. All rights reserved.
        </Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 24,
    alignItems: "center",
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 0.5,
  },
  version: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "100%",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#e23003",
  },
  missionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 26,
  },
  section: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#bf2a09", // Darker shade of brand color
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  subText: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },
  legalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  linkButton: {
    padding: 8,
  },
  linkText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  bullet: {
    fontSize: 14,
    color: "#ccc",
    marginHorizontal: 4,
  },
  copyright: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 20,
    marginBottom: 20,
  },
});