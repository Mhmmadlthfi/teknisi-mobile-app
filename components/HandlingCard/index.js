import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HandlingCard = ({ handling }) => {
  const customerName = handling.sale.customer.name;
  const teknisiName = handling.user.name;
  const noKeluhan = handling.complaint.id;
  const handlingDate = handling.handling_date;
  const handlingStatus = handling.status;

  const navigation = useNavigation();

  // Cari lokasi berdasarkan serial number
  let location = null;
  const serialNumber = handling.complaint.serial_number;
  handling.sale.sale_detail.forEach((detail) => {
    if (detail.serial_number === serialNumber) {
      location = detail.location;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Dalam penanganan":
        return "#68D2E8";
      case "Sudah diperbaiki":
        return "#ADD899";
      case "Penjadwalan ulang":
        return "#FFBF78";
      case "Tidak dapat diperbaiki":
        return "#A9A9A9";
      default:
        return "#fff";
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: getStatusColor(handling.status) },
      ]}
      onPress={() => navigation.navigate("HandlingShow", handling)}
    >
      <View style={styles.item}>
        <Text style={styles.label}>Customer</Text>
        <Text style={styles.value}>{customerName}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Teknisi</Text>
        <Text style={styles.value}>{teknisiName}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>No Keluhan</Text>
        <Text style={styles.value}>{noKeluhan}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Lokasi</Text>
        <Text style={styles.value}>{location}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Tanggal Penanganan</Text>
        <Text style={styles.value}>{handlingDate}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Status Penanganan</Text>
        <Text style={styles.value}>{handlingStatus}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFBF78",
    marginBottom: 10,
    width: 350,
  },
  item: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    width: 180,
  },
  value: {
    flex: 1,
  },
});

export default HandlingCard;
