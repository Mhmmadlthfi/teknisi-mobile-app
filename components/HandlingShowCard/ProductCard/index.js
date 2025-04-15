import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getWarrantyStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) {
    return "Belum Mulai";
  } else if (today > end) {
    return "Tidak Aktif";
  } else {
    return "Aktif";
  }
};

const ProductCard = ({ products }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Data Produk</Text>
      {products.map((item, index) => (
        <View key={index} style={styles.productCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Nama Produk</Text>
            <Text style={styles.value}>{item.product.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>No Seri Produk</Text>
            <Text style={styles.value}>{item.serial_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Lokasi</Text>
            <Text style={styles.value}>{item.location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal Komisioning</Text>
            <Text style={styles.value}>{item.commissioning_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal Mulai Garansi</Text>
            <Text style={styles.value}>{item.warranty.start_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal Akhir Garansi</Text>
            <Text style={styles.value}>{item.warranty.end_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status Garansi</Text>
            <Text style={styles.value}>
              {getWarrantyStatus(
                item.warranty.start_date,
                item.warranty.end_date
              )}
            </Text>
          </View>
        </View>
      ))}
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
  productCard: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
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

export default ProductCard;
