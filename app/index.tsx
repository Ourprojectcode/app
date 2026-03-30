import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { useRouter } from "expo-router";

const SignInScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      // 👉 Get user using email as document ID
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      // ❌ If user not found
      if (!userSnap.exists()) {
        Alert.alert("Error", "User not found ❌");
        return;
      }

      const userData = userSnap.data();

      // ❌ Wrong password
      if (userData.password !== password) {
        Alert.alert("Error", "Invalid password ❌");
        return;
      }

      // ✅ Success
      Alert.alert("Success", "Login Successful ✅");

      console.log("User Data:", userData);

      // 👉 Navigate to home (change route if needed)
      router.push("/home");

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>

        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Sign In</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/signup")}
          >
            Sign Up
          </Text>
        </Text>

      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5b86e5",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    width: "80%",
    elevation: 5,
    alignItems: "center"
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 10
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#5b86e5",
    padding: 12,
    marginTop: 10,
    borderRadius: 5,
    width: "100%"
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  forgot: {
    marginTop: 15,
    color: "#0066cc",
  },

  text: {
    marginTop: 15,
    textAlign: "center",
  },

  link: {
    color: "#5b86e5",
    fontWeight: "bold",
  },
});