import React, { useContext, useEffect } from "react";
import {
  Splash,
  Login,
  Home,
  Handling,
  HandlingShow,
  HandlingResult,
} from "../pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "../utils/AuthContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Logout = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      navigation.replace("Login");
    };

    handleLogout();
  }, []);

  return null;
};

function HandlingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Handling"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Handling" component={Handling} />
      <Stack.Screen
        name="HandlingShow"
        component={HandlingShow}
        options={{ title: "Detail Penanganan" }}
      />
      <Stack.Screen
        name="HandlingResult"
        component={HandlingResult}
        options={{ title: "Input Hasil Penanganan" }}
      />
    </Stack.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen
        name="HandlingStack"
        component={HandlingStack}
        options={{ title: "Penanganan" }}
      />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login Teknisi" }}
      />
      <Stack.Screen
        name="DrawerNavigator"
        component={MainDrawer}
        options={{ title: "MainDrawer", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
