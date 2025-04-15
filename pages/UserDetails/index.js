import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ProfileScreen({ route }) {
  const user = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{user.name}</Text>
      <Text>{user.no_staff}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
