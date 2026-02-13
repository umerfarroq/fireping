
// import { Redirect, Slot, usePathname } from "expo-router";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { FireAlertProvider, useFireAlert } from "../context/FireAlertContext";

// function AppNavigator() {
//   const { isAuthenticated, isLoading } = useAuth();
//   const { hasFireAlert } = useFireAlert();
//   const pathname = usePathname();

//   if (isLoading) return null;

//   //  Not logged in → always go to login
//   if (!isAuthenticated && pathname !== "/Login") {
//     return <Redirect href="/Login" />;
//   }

//   //  Fire alert ON → only redirect if currently on idle
//   if (
//     isAuthenticated &&
//     hasFireAlert &&
//     pathname === "/(tabs)/idleScreen"
//   ) {
//     return <Redirect href="/(tabs)/alertV3" />;
//   }

//   //  Fire alert OFF → only redirect if currently on alert
//   if (
//     isAuthenticated &&
//     !hasFireAlert &&
//     pathname === "/(tabs)/alertV3"
//   ) {
//     return <Redirect href="/(tabs)/idleScreen" />;
//   }

//   //  Otherwise allow normal navigation (settings, etc)
//   return null;
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <FireAlertProvider>
//         <Slot />
//         <AppNavigator />
//       </FireAlertProvider>
//     </AuthProvider>
//   );
// }



// import { Redirect, Slot, usePathname } from "expo-router";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { FireAlertProvider, useFireAlert } from "../context/FireAlertContext";

// function AppNavigator() {
//   const { isAuthenticated, isLoading } = useAuth();
//   const { hasFireAlert } = useFireAlert();
//   const pathname = usePathname();

//   if (isLoading) return null;

//   //  Not logged in → always go to login
//   if (!isAuthenticated && pathname !== "/Login") {
//     return <Redirect href="/Login" />;
//   }

//   //  Fire alert ON → only redirect if currently on idle
//   if (
//     isAuthenticated &&
//     hasFireAlert &&
//     pathname === "/(tabs)/idleScreen"
//   ) {
//     return <Redirect href="/(tabs)/alertV3" />;
//   }

//   //  Fire alert OFF → only redirect if currently on alert
//   if (
//     isAuthenticated &&
//     !hasFireAlert &&
//     pathname === "/(tabs)/alertV3"
//   ) {
//     return <Redirect href="/(tabs)/idleScreen" />;
//   }

//   //  Otherwise allow normal navigation (settings, etc)
//   return null;
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <FireAlertProvider>
//         <Slot />
//         <AppNavigator />
//       </FireAlertProvider>
//     </AuthProvider>
//   );
// }
  




import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { FireAlertProvider, useFireAlert } from "../context/FireAlertContext";
import { useEffect } from "react";

function NavigationGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasFireAlert } = useFireAlert();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait for auth check to complete

    const inAuthGroup = segments[0] === "(tabs)";

    console.log("Navigation Guard:", {
      isAuthenticated,
      hasFireAlert,
      segments,
      inAuthGroup,
    });

    if (!isAuthenticated && inAuthGroup) {
      // Not logged in but trying to access protected route
      router.replace("/Login");
    } else if (isAuthenticated && !inAuthGroup) {
      // Logged in but on login screen - redirect based on fire alert
      if (hasFireAlert) {
        router.replace("/(tabs)/alertV3");
      } else {
        router.replace("/(tabs)/idleScreen");
      }
    } else if (isAuthenticated && inAuthGroup) {
      // Logged in and in tabs - handle fire alert changes
      const currentScreen = segments[1];
      
      if (hasFireAlert && currentScreen === "idleScreen") {
        router.replace("/(tabs)/alertV3");
      } else if (!hasFireAlert && currentScreen === "alertV3") {
        router.replace("/(tabs)/idleScreen");
      }
    }
  }, [isAuthenticated, segments, isLoading]);

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <FireAlertProvider>
        <NavigationGuard />
        <Slot />
      </FireAlertProvider>
    </AuthProvider>
  );
}