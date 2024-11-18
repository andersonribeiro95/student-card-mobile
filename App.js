// App.js
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/screens/Login";
import EsqueciSenha from "./src/screens/EsqueciSenha";
import Signup from "./src/screens/Signup";
import GetStarted from "./src/screens/GetStarted";
import Home from "./src/screens/Home";
import Scan from "./src/screens/Scan";
import AddDocument from "./src/screens/AddDocument";
import DocumentDetails from "./src/screens/DocumentDetails";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="AddDocument" component={AddDocument} />
        <Stack.Screen name="DocumentDetails" component={DocumentDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;