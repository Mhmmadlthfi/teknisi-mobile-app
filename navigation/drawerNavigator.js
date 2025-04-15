import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home, Handling, ShowHandling } from "../pages";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Handling" component={Handling} />
      <Drawer.Screen name="ShowHandling" component={ShowHandling} />
    </Drawer.Navigator>
  );
}
