import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../utils/AuthContext";
import api from "../../Api";

const LoginScreen = ({ navigation }) => {
  const [no_staff, setNoStaff] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { no_staff, password });
      const { user, token } = response.data;
      await login(user, token);
      Alert.alert("Login Berhasil");
      navigation.replace("DrawerNavigator");
    } catch (error) {
      Alert.alert("Login gagal", error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>Sistem Komplain Manajemen</Text>
      <Text style={styles.screenTextCompany}>PT. ARHADI FAJAR PERKASA</Text>
      <Text>No Staff</Text>
      <TextInput
        style={styles.input}
        value={no_staff}
        onChangeText={setNoStaff}
        keyboardType="numeric"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.btnCenter}>
        <TouchableOpacity onPress={handleLogin} style={styles.tombol}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  screenText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  screenTextCompany: {
    marginBottom: 30,
    fontSize: 15,
    fontWeight: "medium",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  btnCenter: {
    alignItems: "center",
  },
  tombol: {
    backgroundColor: "#007BFF",
    padding: 10,
    width: 360,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default LoginScreen;
