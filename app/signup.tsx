import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const Signup: React.FC = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const { phone, name, email, password, confirmPassword } = formData;

    // ✅ Validation
    if (!phone || !name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userRef = doc(db, "users", email);

      // ✅ Check if already exists
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        Alert.alert("Error", "User already exists ❌");
        return;
      }

      // ✅ Save user
      await setDoc(userRef, {
        phone,
        name,
        email,
        password,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account Created Successfully ✅");

      // Reset form
      setFormData({
        phone: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      router.push("/"); // Navigate to login

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>

      {/* BRAND */}
      <View style={styles.brand}>
        <Text style={styles.brandTitle}>🚘 SwiftRide</Text>
        <Text style={styles.brandSubtitle}>Ride • Tap • Go</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />

        {/* PASSWORD */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggle}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            style={styles.passwordInput}
            secureTextEntry={!showConfirmPassword}
            value={formData.confirmPassword}
            onChangeText={(text) =>
              handleChange("confirmPassword", text)
            }
          />
          <TouchableOpacity
            onPress={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          >
            <Text style={styles.toggle}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bfdbfe",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  brand: {
    alignItems: "center",
    marginBottom: 20,
  },

  brandTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  brandSubtitle: {
    fontSize: 14,
    color: "#1e3a8a",
    marginTop: 5,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#1e3a8a",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  passwordInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
  },

  toggle: {
    color: "#38bdf8",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});