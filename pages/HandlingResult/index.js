import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import api from "../../Api";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const HandlingResult = ({ route }) => {
  const handling = route.params;

  const [initialCondition, setInitialCondition] = useState("");
  const [action, setAction] = useState("");
  const [repairResult, setRepairResult] = useState("");
  const [repairNotes, setRepairNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [handlingLocation, setHandlingLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  // Memeriksa apakah layanan lokasi aktif
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Layanan Lokasi Tidak Aktif",
        "Silakan aktifkan layanan lokasi Anda",
        [
          {
            text: "Batal",
            onPress: () => console.log("Tombol Batal Ditekan"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("Tombol OK Ditekan") },
        ]
      );
    }
  };

  // Dapatkan lokasi saat ini
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    // console.log("Status izin aplikasi :", status);
    if (status !== "granted") {
      Alert.alert(
        "Izin Ditolak",
        "Izinkan aplikasi untuk menggunakan layanan lokasi",
        [
          {
            text: "Batal",
            onPress: () => console.log("Tombol Batal Ditekan"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("Tombol OK Ditekan") },
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    const latitude = coords.latitude;
    const longitude = coords.longitude;

    setHandlingLocation(latitude + " " + longitude);
  };

  const handleFileUpload = async () => {
    let repairEvidence = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
      copyToCacheDirectory: true,
    });

    if (repairEvidence.assets[0].size > 3 * 1024 * 1024) {
      Alert.alert("File terlalu besar", "Ukuran file maksimal 3MB");
    } else {
      setSelectedFile(repairEvidence);
    }
  };

  const handleUpdate = async () => {
    if (
      !selectedFile ||
      !status ||
      !initialCondition ||
      !action ||
      !repairResult ||
      !repairNotes
    ) {
      Alert.alert("Error", "Harap mengisi semua field");
      return;
    }

    // Memeriksa kembali apakah layanan lokasi diaktifkan
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Layanan Lokasi Tidak Aktif",
        "Silakan aktifkan layanan lokasi Anda dan coba lagi."
      );
      return;
    }

    await getCurrentLocation();
    if (!handlingLocation) {
      Alert.alert(
        "Error",
        "Layanan lokasi diperlukan. Silakan izinkan lokasi untuk aplikasi ini."
      );
      return;
    }

    const fileData = selectedFile.assets[0];

    const formData = new FormData();
    formData.append("initial_condition", initialCondition);
    formData.append("action", action);
    formData.append("repair_result", repairResult);
    formData.append("repair_notes", repairNotes);
    formData.append("repair_evidence", {
      uri: fileData.uri,
      name: fileData.name,
      type: fileData.mimeType,
    });
    formData.append("handling_location", handlingLocation);
    formData.append("status", status);
    formData.append("_method", "PATCH");

    setLoading(true);

    try {
      const response = await api.post(`/handling/${handling.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        Alert.alert("Success", response.data.message);
        navigation.navigate("Handling");
      } else {
        Alert.alert("Error", "Terjadi kesalahan saat menyimpan data");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error sending data:", error.message);

      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert("Error", "Unauthenticated. Silakan login ulang.");
        } else {
          const errorMessage =
            error.response.data.message ||
            "Terjadi kesalahan saat mengirim data";
          Alert.alert("Error", errorMessage);
        }
      } else {
        Alert.alert("Error", "Terjadi kesalahan saat mengirim data");
      }

      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Kondisi Awal</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={initialCondition}
          onChangeText={(text) => setInitialCondition(text)}
          placeholder="Kondisi awal..."
        />

        <Text style={styles.label}>Tindakan</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={action}
          onChangeText={(text) => setAction(text)}
          placeholder="Tindakan yang dilakukan..."
        />

        <Text style={styles.label}>Hasil Perbaikan</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={repairResult}
          onChangeText={(text) => setRepairResult(text)}
          placeholder="Hasil perbaikan..."
        />

        <Text style={styles.label}>Catatan Perbaikan</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={repairNotes}
          onChangeText={(text) => setRepairNotes(text)}
          placeholder="Catatan perbaikan..."
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Bukti Penanganan</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleFileUpload}
        >
          <Text style={styles.uploadButtonText}>Upload File</Text>
        </TouchableOpacity>
        {selectedFile && (
          <Text style={styles.fileInfo}>{selectedFile.assets[0].name}</Text>
        )}
        <Text style={styles.note}>
          Jika bukti perbaikan hanya satu, silahkan upload file dengan format
          JPG, JPEG, atau PNG. Jika bukti perbaikan lebih dari satu, silahkan
          convert ke PDF terlebih dahulu, kemudian upload file PDF tersebut.
          Ukuran Maks file adalah 3MB.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Status Penanganan</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Pilih Status Perbaikan" value="" />
            <Picker.Item label="Sudah diperbaiki" value="Sudah diperbaiki" />
            <Picker.Item
              label="Tidak dapat diperbaiki"
              value="Tidak dapat diperbaiki"
            />
          </Picker>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpdate}>
          <Text style={styles.uploadButtonText}>Simpan</Text>
        </TouchableOpacity>
      )}

      <View style={{ marginBottom: 30 }}></View>
    </ScrollView>
  );
};

export default HandlingResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  fileInfo: {
    marginBottom: 10,
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    color: "gray",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
