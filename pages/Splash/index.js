import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../utils/AuthContext";

const Splash = () => {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (token) {
        navigation.dispatch(StackActions.replace("DrawerNavigator"));
      } else {
        navigation.dispatch(StackActions.replace("Login"));
      }
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Sistem Komplain Manajemen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Splash;
