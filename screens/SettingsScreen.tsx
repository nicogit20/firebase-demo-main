import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile */}
        <TouchableOpacity style={styles.option}>
          <Ionicons name="person-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.optionText}>Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={styles.option}>
          <Ionicons name="notifications-outline" size={24} color="#007AFF" />
          <Text style={styles.optionText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Theme */}
        <TouchableOpacity style={styles.option}>
          <Ionicons name="moon-outline" size={24} color="#007AFF" />
          <Text style={styles.optionText}>Dark Mode</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Help & Support */}
        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.optionText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </ScrollView>

      {/* Logout button at bottom */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: "#111827" },
  scrollContainer: { paddingBottom: 40 },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // for Android shadow
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    marginTop: "auto",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
});
