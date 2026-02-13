import { Slot } from "expo-router";
import { FireAlertProvider } from "./context/FireAlertContext";

export default function App() {

 
  if(loading) return null;
  return (
    <FireAlertProvider>
      <Slot />
    </FireAlertProvider>
  );
}
