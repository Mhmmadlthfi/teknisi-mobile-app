import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import api from "../../Api";
import { AuthContext } from "../../utils/AuthContext";
import HandlingCard from "../../components/HandlingCard";
import { useFocusEffect } from "@react-navigation/native";

const Handling = () => {
  const { token } = useContext(AuthContext);
  const [handlings, setHandlings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHandlings = useCallback(async () => {
    try {
      const response = await api.get("/handling", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHandlings(response.data.handlings);
    } catch (error) {
      console.error("Gagal mengakses data handling. Error : ", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    fetchHandlings();
  }, [fetchHandlings]);

  useFocusEffect(
    useCallback(() => {
      fetchHandlings();
    }, [fetchHandlings])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHandlings();
  }, [fetchHandlings]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {handlings.length > 0 ? (
        <>
          <Text style={styles.screenTitle}>Daftar Penanganan</Text>
          <FlatList
            data={handlings}
            renderItem={({ item }) => <HandlingCard handling={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      ) : (
        <View>
          <Text style={styles.noDataText}>Tidak ada penanganan</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  screenTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#555",
  },
  list: {
    paddingBottom: 10,
  },
});

export default Handling;
