import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomerCard = ({
  customerName,
  spk,
  customerTelp,
  email,
  sentDate,
  receivedDate,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Data Customer</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Nama Customer</Text>
        <Text style={styles.value}>{customerName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>SPK</Text>
        <Text style={styles.value}>{spk}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>No Telepon</Text>
        <Text style={styles.value}>{customerTelp}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tanggal Kirim</Text>
        <Text style={styles.value}>{sentDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tanggal Diterima</Text>
        <Text style={styles.value}>{receivedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
    width: 160,
  },
  value: {
    flex: 1,
  },
});

export default CustomerCard;
