import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import StackNavigator from "./components/StackNavigator";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { AuthProvider } from "./hooks/useAuth";

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        {/* HOC */}
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
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
