import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function SignupScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Save user in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        email: userCred.user.email,
        createdAt: new Date(),
      });

      console.log("✅ User signed up");
    } catch (error) {
      console.log("❌ Signup Error:", (error as Error).message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Signup</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <View style={{ marginTop: 20 }}>
        <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}
