import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ComplaintCard,
  CustomerCard,
  ProductCard,
} from "../../components/HandlingShowCard";

const HandlingShow = ({ route }) => {
  const handling = route.params;
  const baseURL = "http://192.168.43.205:8000/storage/";

  // console.log("Complaint : " + JSON.stringify(handling.complaint, null, 2));

  // Data Keluhan
  const noKeluhan = handling.complaint.id;
  const reporter = handling.complaint.reporter;
  const reporterTelp = handling.complaint.telp;
  const serialNumber = handling.complaint.serial_number;
  const location = handling.complaint.location;
  const complaintDate = handling.complaint.date;
  const institution = handling.complaint.institution;
  const description = handling.complaint.description;

  const attachmentPath = handling.complaint.attachment;
  const fileURL = baseURL + attachmentPath;

  // Data Customer
  const customerName = handling.sale.customer.name;
  const spk = handling.sale.spk;
  const customerTelp = handling.sale.customer.telp;
  const email = handling.sale.customer.email;
  const sentDate = handling.sale.sent_date;
  const receivedDate = handling.sale.received_date;

  // Data Produk
  const products = handling.sale.sale_detail;

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <ComplaintCard
        noKeluhan={noKeluhan}
        reporter={reporter}
        reporterTelp={reporterTelp}
        serialNumber={serialNumber}
        location={location}
        complaintDate={complaintDate}
        institution={institution}
        description={description}
        fileURL={fileURL}
      />
      <CustomerCard
        customerName={customerName}
        spk={spk}
        customerTelp={customerTelp}
        email={email}
        sentDate={sentDate}
        receivedDate={receivedDate}
      />
      <ProductCard products={products} />
      {/* Seolah - olah card mempunyai margin bottom jika penanganan sudah di proses*/}
      {handling.status !== "Dalam penanganan" &&
        handling.status !== "Penjadwalan ulang" && (
          <View style={{ marginBottom: 30 }}></View>
        )}
      {/* Menampilkan tombol jika belum di proses teknisi */}
      {handling.status !== "Sudah diperbaiki" &&
        handling.status !== "Tidak dapat diperbaiki" && (
          <View style={styles.containerTombol}>
            <TouchableOpacity
              style={styles.tombol}
              onPress={() => navigation.navigate("HandlingResult", handling)}
            >
              <Text style={styles.btnText}>Input Hasil Penanganan</Text>
            </TouchableOpacity>
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  containerTombol: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  tombol: {
    backgroundColor: "#007BFF",
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    width: 360,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 19,
  },
});

export default HandlingShow;
