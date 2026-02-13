import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Terms() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.lastUpdated}>Last Updated: Feb 2026</Text>
          <Text style={styles.intro}> 
            
            Please read these terms carefully before using FirePing.
          </Text>
        </View>

        {/* 1. CRITICAL DISCLAIMER */}
        <View style={styles.cardError}>
          <View style={styles.cardHeader}>
             <Ionicons name="warning" size={24} color="#e23003" />
             <Text style={styles.cardTitleError}>Critical Disclaimer</Text>
          </View>
          <Text style={styles.bodyText}>
            FirePing is a supplementary tool to assist emergency response. It is NOT a replacement for official radio communication, dispatch procedures, or standard operating guidelines (SOGs). In case of app failure, immediately revert to standard protocols.
          </Text>
        </View>

        {/* 2. AUTHORIZED USE */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Authorized Use Only</Text>
          <Text style={styles.bodyText}>
            Access to this system is restricted to authorized fire department personnel. Any unauthorized access, misuse, or data extraction is strictly prohibited and may result in legal action.
          </Text>
        </View>

        {/* 3. LOCATION DATA */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Location Tracking</Text>
          <Text style={styles.bodyText}>
            By using this app on duty, you consent to the collection and transmission of your real-time location data to your station command. This data is used solely for operational coordination and safety monitoring.
          </Text>
        </View>

         {/* 4. SERVICE AVAILABILITY */}
         <View style={styles.card}>
          <Text style={styles.cardTitle}>Service Availability</Text>
          <Text style={styles.bodyText}>
            We strive for 99.9% uptime, but we do not guarantee uninterrupted service. Factors such as network coverage, GPS signal strength, and device battery are beyond our control.
          </Text>
        </View>

        <Text style={styles.footer}>
          By continuing to use FirePing, you acknowledge that you have read and understood these terms.
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  lastUpdated: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  intro: {
    fontSize: 14,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardError: {
    backgroundColor: "#fff0f0", // Light red background for warning
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ffcccc",
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardTitleError: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e23003",
  },
  bodyText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 13,
    color: "#888",
    fontStyle: "italic",
  },
});
