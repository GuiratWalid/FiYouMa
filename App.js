import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import StackNavigator from "./components/StackNavigator";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { AuthProvider } from "./hooks/useAuth";
import { Provider as PaperProvider } from "react-native-paper";
import "./config/firebase";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore log notification by message

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        {/* <PaperProvider> */}
        {/* HOC */}
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
        {/* </PaperProvider> */}
      </TailwindProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
