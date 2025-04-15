import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";

const ComplaintCard = ({
  noKeluhan,
  reporter,
  reporterTelp,
  serialNumber,
  location,
  complaintDate,
  institution,
  description,
  fileURL,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handlePress = () => {
    if (!fileURL || fileURL.includes("null")) {
      return;
    }

    const isImage =
      fileURL?.endsWith(".jpg") ||
      fileURL?.endsWith(".png") ||
      fileURL?.endsWith(".jpeg");
    const isPdf = fileURL?.endsWith(".pdf");

    if (isPdf) {
      Linking.openURL(fileURL); // membuka URL di browser default perangkat
    } else if (isImage) {
      toggleModal();
    }
  };

  const isImage =
    fileURL?.endsWith(".jpg") ||
    fileURL?.endsWith(".png") ||
    fileURL?.endsWith(".jpeg");
  const isPdf = fileURL?.endsWith(".pdf");

  // Memastikan fileURL bukan null
  const isFileAvailable = fileURL && !fileURL.includes("null");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Data Keluhan</Text>
      <View style={styles.row}>
        <Text style={styles.label}>No Keluhan</Text>
        <Text style={styles.value}>{noKeluhan}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Pelapor</Text>
        <Text style={styles.value}>{reporter}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>No Telepon</Text>
        <Text style={styles.value}>{reporterTelp}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>No Seri Produk</Text>
        <Text style={styles.value}>{serialNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Lokasi</Text>
        <Text style={styles.value}>{location}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tanggal Keluhan</Text>
        <Text style={styles.value}>{complaintDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Instansi</Text>
        <Text style={styles.value}>{institution}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Lampiran</Text>
        {isFileAvailable ? (
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>
              {isPdf ? "Download" : "Lihat"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.value}>-</Text>
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.label}>Deskripsi Keluhan :</Text>
        <Text style={styles.description}>{description || "-"}</Text>
      </View>
      {isImage && (
        <Modal
          visible={isVisible}
          onRequestClose={toggleModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <Image source={{ uri: fileURL }} style={styles.image} />
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  descriptionContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  description: {
    marginTop: 5,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ComplaintCard;
