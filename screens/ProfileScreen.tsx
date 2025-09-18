import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="#007AFF" />
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Email: {auth.currentUser?.email}</Text>
      <Text style={styles.info}>User ID: {auth.currentUser?.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F9FAFB" },
  title: { fontSize: 24, fontWeight: "700", marginTop: 10, color: "#111827" },
  info: { fontSize: 16, marginTop: 8, color: "#374151" },
});
