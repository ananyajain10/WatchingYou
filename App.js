import { SafeAreaProvider } from "react-native-safe-area-context";
import { TimerProvider } from "./src/context/TimerContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <TimerProvider>
        <AppNavigator />
      </TimerProvider>
    </SafeAreaProvider>
  );
}