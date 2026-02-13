import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Image } from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppLogo from "../../../assets/icon.png";

export default function Support() {
  // Constants for support info
  const SUPPORT_EMAIL = "support@fireping.com";
  const APP_VERSION = "1.0.0";

  // State for tracking which FAQ is expanded (null means none)
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Why am I not receiving alerts?",
      answer: "Check if notifications are enabled in your device settings. Also ensure " +
              "you have granted location permissions as alerts are location-based."
    },
    {
      id: 2,
      question: "How do I update my profile?",
      answer: "Go to Settings > Profile to update your personal details and helmet number."
    },
    {
      id: 3,
      question: "Location tracking isn't accurate.",
      answer: "FirePing uses high-accuracy GPS. Make sure you have a clear view of the sky " +
              "and your device's battery saver mode is off."
    }
  ];

  const toggleExpand = (id) => {
    // If clicking the already open one, close it. Otherwise open the new one.
    setExpandedId(expandedId === id ? null : id);
  };

  const handleContactSupport = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need Help?</Text>
          <Text style={styles.subtext}>
            Our support team is available 24/7 to assist you with any issues.
          </Text>
          
          <Pressable style={styles.contactButton} onPress={handleContactSupport}>
            <Ionicons name="mail" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </Pressable>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          {faqs.map((faq) => (
            <Pressable 
              key={faq.id} 
              style={styles.faqCard} 
              onPress={() => toggleExpand(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.question}>{faq.question}</Text>
                <Ionicons 
                  name={expandedId === faq.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#666" 
                />
              </View>
              
              {expandedId === faq.id && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answer}>{faq.answer}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>App Version {APP_VERSION}</Text>
          
          
        </View>

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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: "#e23003",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#e23003",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  faqCard: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  question: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fafafa",
  },
  answer: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
  },    
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  iconStyle: {
    fontSize: 24,
    color: "#e23003",
  },
  TextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  versionText: {
    color: "#999",
    fontSize: 17,
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 10,
    resizeMode: 'contain',
    opacity: 0.8,
  },
});
