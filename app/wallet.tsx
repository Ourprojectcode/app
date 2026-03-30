import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { db } from "../firebaseConfig";
import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";

// ✅ Define type
type UserData = {
  walletBalance: number;
};

const USER_ID = "user123";

export default function WalletScreen() {
  const [balance, setBalance] = useState<number>(0);

  // 🔁 Real-time wallet listener
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", USER_ID),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as UserData;
          setBalance(data.walletBalance);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // ➕ Add money
  const addMoney = async (): Promise<void> => {
    await updateDoc(doc(db, "users", USER_ID), {
      walletBalance: increment(100),
    });
  };

  // ➖ Deduct money
  const deductMoney = async (): Promise<void> => {
    const ref = doc(db, "users", USER_ID);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data() as UserData;
    const currentBalance = data.walletBalance;
    const fare = 150;

    if (currentBalance < fare) {
      Alert.alert("Error", "Insufficient balance");
      return;
    }

    await updateDoc(ref, {
      walletBalance: increment(-fare),
    });

    Alert.alert("Success", "Ride paid ₹150");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>

      <Text style={styles.balance}>₹ {balance}</Text>

      <View style={styles.button}>
        <Button title="Add ₹100" onPress={addMoney} />
      </View>

      <View style={styles.button}>
        <Button title="Pay Ride ₹150" onPress={deductMoney} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 30, marginBottom: 20 },
  balance: { fontSize: 40, fontWeight: "bold", marginBottom: 30 },
  button: { marginVertical: 10, width: 200 },
});