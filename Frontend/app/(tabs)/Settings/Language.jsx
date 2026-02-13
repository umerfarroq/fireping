

import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Language() {
  // 1. State to hold the selected language code
  const [selectedLang, setSelectedLang] = useState("en");

  // 2. Data: List of available languages
  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "es", name: "Spanish", native: "Español" },
  ];

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <Pressable
          key={lang.code}
          style={styles.option}
          onPress={() => setSelectedLang(lang.code)}
        >
          <View>
            <Text style={styles.langName}>{lang.name}</Text>
            <Text style={styles.nativeName}>{lang.native}</Text>
          </View>

          {/* 3. Conditional rendering: Show checkmark if selected */}
          {selectedLang === lang.code && (
            <Ionicons name="checkmark-circle" size={24} color="#e23003" />
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    // Add shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  langName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  nativeName: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});   