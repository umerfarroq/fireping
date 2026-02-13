

import { createContext, useContext, useState } from "react";

const FireAlertContext = createContext(null);

export function FireAlertProvider({ children }) {
  const [hasFireAlert, setHasFireAlert] = useState(true);

  return (
    <FireAlertContext.Provider value={{ hasFireAlert, setHasFireAlert }}>
      {children}
    </FireAlertContext.Provider>
  );
}

export function useFireAlert() {
  const context = useContext(FireAlertContext);
  if (!context) {
    throw new Error("useFireAlert must be used inside FireAlertProvider");
  }
  return context;
}