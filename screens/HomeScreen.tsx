import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("❌ Logout Error:", (error as Error).message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Ionicons name="home-outline" size={50} color="#2563EB" />
        <View>
          <Text style={styles.greeting}>Welcome Back 👋</Text>
          <Text style={styles.email}>{auth.currentUser?.email}</Text>
        </View>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-circle-outline" size={30} color="#2563EB" />
            <Text style={styles.actionText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={30} color="#2563EB" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="notifications-outline" size={30} color="#2563EB" />
            <Text style={styles.actionText}>Alerts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={30} color="#2563EB" />
            <Text style={styles.actionText}>Support</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "#EFF6FF",
    padding: 15,
    borderRadius: 15,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 12,
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111827",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 12,
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#2563EB",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: "auto",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
