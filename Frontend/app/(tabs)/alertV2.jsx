// import { useEffect, useRef, useState } from "react";
// import { Linking, Alert, Platform } from "react-native";
// import * as Location from "expo-location";
// import {
//   View,
//   StyleSheet,
//   Text,
//   Pressable,
//   Animated,
//   Easing,
//   Dimensions,
//   Image,
// } from "react-native";
// import MapView, { Polyline, Marker } from "react-native-maps";
// import { FIRE_INCIDENT_LOCATION } from "../Constants/Data";
// import FireTruckIcon from "../../assets/FireTruckLocation.png";
  
// export default function AlertScreen() {
//   // ================= STATES =================
//   const [isCheckListVisible, setIsCheckListVisible] = useState(true);
//   const [ResponseMode, setIsResponseMode] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [locationPermission, setLocationPermission] = useState(false);
//   const [routeCoords, setRouteCoords] = useState([]);
//   const [etaMinutes, setEtaMinutes] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [isLoadingLocation, setIsLoadingLocation] = useState(true);
//   const [isLoadingRoute, setIsLoadingRoute] = useState(false);

//   const [checkList, setCheckList] = useState([
//     { id: 1, label: " ⛑ Helmet", checked: false },
//     { id: 2, label: "🧤 Gloves", checked: false },
//     { id: 3, label: "🎎 Oxygen", checked: false },
//     { id: 4, label: "🔦 Torch", checked: false },
//   ]);

//   // ================= REFS =================
//   const slideAnim = useRef(new Animated.Value(0)).current;
//   const mapRef = useRef(null);
//   const locationSubscription = useRef(null);

//   // ================= CONSTANTS =================
//   const showChecklist = checkList.every((item) => item.checked);
//   const SCREEN_HEIGHT = Dimensions.get("window").height;
//   const fireIncidentCoord = routeCoords[routeCoords.length - 1];

//   // ================= HELPERS =================

//   const toggleItem = (id) => {
//     setCheckList((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, checked: !item.checked } : item
//       )
//     );
//   };

//   const openGoogleMapsNavigation = async () => {
//     if (!currentLocation) {
//       Alert.alert("Location not ready", "Unableto get truck location");
//       return;
//     }

//     const origin = `${currentLocation.latitude} , ${currentLocation.longitude}`;
//     const destination = `${FIRE_INCIDENT_LOCATION.latitude} , ${FIRE_INCIDENT_LOCATION.longitude}`;

//     const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

//     const canOpen = await Linking.canOpenURL(googleMapsUrl);

//     if (!canOpen) {
//       Alert.alert("Error", "Google maps is not available");
//       return;
//     }

//     Linking.openURL(googleMapsUrl);
//   };

//   const hideChecklist = () => {
//     setIsResponseMode(true);
//     Animated.timing(slideAnim, {
//       toValue: SCREEN_HEIGHT * 0.6,
//       duration: 600,
//       easing: Easing.out(Easing.cubic),
//       useNativeDriver: true,
//     }).start(() => setIsCheckListVisible(false), openGoogleMapsNavigation());
//   };

//   // ================= POLYLINE DECODER =================
//   const decodePolyline = (encoded) => {
//     let points = [];
//     let index = 0,
//       lat = 0,
//       lng = 0;

//     while (index < encoded.length) {
//       let b,
//         shift = 0,
//         result = 0;
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       lat += result & 1 ? ~(result >> 1) : result >> 1;

//       shift = 0;
//       result = 0;
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       lng += result & 1 ? ~(result >> 1) : result >> 1;

//       points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
//     }
//     return points;
//   };

//   const formatDistance = (m) =>
//     m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
//   const formatETA = (s) => `${Math.ceil(s / 60)} mins`;

//   // ================= REQUEST LOCATION PERMISSION =================
//   useEffect(() => {
//     const requestPermission = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();

//         if (status !== "granted") {
//           Alert.alert(
//             "Permission Denied",
//             "Location permission is required for live tracking"
//           );
//           setIsLoadingLocation(false);
//           return;
//         }

//         setLocationPermission(true);
//         console.log(" Location permission granted");
//       } catch (error) {
//         console.error("Error requesting permission:", error);
//       }
//     };

//     requestPermission();
//   }, []);

//   // ================= START LIVE TRACKING =================

//   useEffect(() => {
//     if (!locationPermission) return;

//     const startTracking = async () => {
//       try {
//         //  STRATEGY 1: Try to get last known location FIRST (instant)
//         console.log(" Trying last known location...");
//         const lastKnown = await Location.getLastKnownPositionAsync({
//           maxAge: 60000, // Accept location up to 1 minute old
//           requiredAccuracy: 100, // Accept accuracy within 100 meters
//         });

//         if (lastKnown?.coords) {
//           const quickCoords = {
//             latitude: lastKnown.coords.latitude,
//             longitude: lastKnown.coords.longitude,
//           };
//           console.log(" Got last known location (FAST):", quickCoords);
//           setCurrentLocation(quickCoords);
//           setIsLoadingLocation(false);

//           //  FETCH ROUTE IMMEDIATELY with last known location
//           fetchOSRMRoute(quickCoords);

//           // Center map on truck location
//           if (mapRef.current) {
//             mapRef.current.animateToRegion(
//               {
//                 ...quickCoords,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//               },
//               1000
//             );
//           }
//         }

//         //  STRATEGY 2: Get fresh precise location (slower but accurate)
//         console.log("📍 Getting precise location...");
//         const initialLocation = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.BestForNavigation,
//         });

//         const preciseCoords = {
//           latitude: initialLocation.coords.latitude,
//           longitude: initialLocation.coords.longitude,
//         };

//         console.log(" Got precise location:", preciseCoords);
//         setCurrentLocation(preciseCoords);
//         setIsLoadingLocation(false);

//         //  RE-FETCH ROUTE with precise location (updates ETA)
//         fetchOSRMRoute(preciseCoords);

//         // Update map if location changed significantly
//         if (mapRef.current) {
//           mapRef.current.animateToRegion(
//             {
//               ...preciseCoords,
//               latitudeDelta: 0.01,
//               longitudeDelta: 0.01,
//             },
//             1000
//           );
//         }

//         //  STRATEGY 3: Start continuous tracking
//         console.log(" Starting live tracking...");
//         locationSubscription.current = await Location.watchPositionAsync(
//           {
//             accuracy: Location.Accuracy.BestForNavigation,
//             timeInterval: 5000, // Update every 5 seconds
//             distanceInterval: 5, // Update every 5 meters
//           },
//           (location) => {
//             const newCoords = {
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             };

//             console.log("📍 New location:", newCoords);
//             console.log("🚗 Speed:", location.coords.speed, "m/s");

//             // Update state with new location
//             setCurrentLocation(newCoords);

//             // Re-fetch route to update ETA as truck moves
//             fetchOSRMRoute(newCoords);

//             // Move map to follow truck (only in response mode)
//             if (ResponseMode && mapRef.current) {
//               mapRef.current.animateCamera(
//                 {
//                   center: newCoords,
//                 },
//                 { duration: 1000 }
//               );
//             }
//           }
//         );

//         console.log(" Live tracking started");
//       } catch (error) {
//         console.error(" Error starting tracking:", error);
//         Alert.alert("Error", "Could not start location tracking");
//         setIsLoadingLocation(false);
//       }
//     };

//     startTracking();

//     // Cleanup function
//     return () => {
//       console.log(" Stopping live tracking");
//       locationSubscription.current?.remove();
//     };
//   }, [locationPermission, ResponseMode]);

//   // ================= FETCH ROUTE FROM OSRM =================
//   // const fetchOSRMRoute = async (coordsParam) => {
//   //   const coords = coordsParam || currentLocation;
//   //   if (!coords) return;

//   //   setIsLoadingRoute(true);
//   //   // const origin = `${currentLocation.longitude},${currentLocation.latitude}`;
//   //   const origin = ~${coords.longitude}
//   //   const dest = `${FIRE_INCIDENT_LOCATION.longitude},${FIRE_INCIDENT_LOCATION.latitude}`;

//   //   try {
//   //     const res = await fetch(
//   //       `https://router.project-osrm.org/route/v1/driving/${origin};${dest}?overview=full&geometries=polyline`
//   //     );
//   //     const data = await res.json();

//   //     if (!data.routes?.length) {
//   //       console.log("No route found");
//   //       return;
//   //     }

//   //     const route = data.routes[0];
//   //     setRouteCoords(decodePolyline(route.geometry));
//   //     setDistance(formatDistance(route.distance));
//   //     setEtaMinutes(formatETA(route.duration));
//   //     setIsLoadingRoute(false);

//   //     console.log("✅ Route fetched:", {
//   //       distance: formatDistance(route.distance),
//   //       eta: formatETA(route.duration),
//   //     });
//   //   } catch (error) {
//   //     console.error("Error fetching route:", error);
//   //   }
//   // };

//   const fetchOSRMRoute = async (coordsParam) => {
//     const coords = coordsParam || currentLocation;
//     if (!coords) return;

//     setIsLoadingRoute(true);

//     //  Fixed: Use coords instead of currentLocation, proper template literal
//     const origin = `${coords.longitude},${coords.latitude}`;
//     const dest = `${FIRE_INCIDENT_LOCATION.longitude},${FIRE_INCIDENT_LOCATION.latitude}`;

//     try {
//       const res = await fetch(
//         `https://router.project-osrm.org/route/v1/driving/${origin};${dest}?overview=full&geometries=polyline`
//       );
//       const data = await res.json();

//       if (!data.routes?.length) {
//         console.log("No route found");
//         setIsLoadingRoute(false); //  Added: Stop loading even if no route found
//         return;
//       }

//       const route = data.routes[0];
//       setRouteCoords(decodePolyline(route.geometry));
//       setDistance(formatDistance(route.distance));
//       setEtaMinutes(formatETA(route.duration));
//       setIsLoadingRoute(false);

//       console.log(" Route fetched:", {
//         distance: formatDistance(route.distance),
//         eta: formatETA(route.duration),
//       });
//     } catch (error) {
//       console.error("Error fetching route:", error);
//       setIsLoadingRoute(false); //  Added: Stop loading on error
//     }
//   };

//   // Fetch route when location is available and in response mode
//   useEffect(() => {
//     if (currentLocation) {
//       fetchOSRMRoute();
//     }
//   }, [currentLocation]);

//   // ================= UI =================
//   return (
//     <View style={StyleSheet.absoluteFill}>
//       <MapView
//         ref={mapRef}
//         style={StyleSheet.absoluteFillObject}
//         initialRegion={{
//           latitude: FIRE_INCIDENT_LOCATION.latitude,
//           longitude: FIRE_INCIDENT_LOCATION.longitude,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//         showsUserLocation={false}
//         showsMyLocationButton={false}
//       >
//         {/* Fire Incident Marker */}
//         {fireIncidentCoord && (
//           <Marker coordinate={fireIncidentCoord}>
//             <Text style={styles.marker}>🔥</Text>
//           </Marker>
//         )}

//         {/* Fire Truck Marker - Live Tracking */}
//         {currentLocation && (
//           <Marker
//             coordinate={currentLocation}
//             anchor={{ x: 0.5, y: 0.5 }}
//             flat={true}
//           >
//             <Image style={styles.truckMarker} source={FireTruckIcon} />
//           </Marker>
//         )}

//         {/* Route Polyline */}
//         {routeCoords.length > 0 && (
//           <Polyline
//             coordinates={routeCoords}
//             strokeWidth={5}
//             strokeColor="#EF3935"
//           />
//         )}
//       </MapView>

//       {/* ETA Badge - Only show in Response Mode */}

//       <View style={styles.etaWrapper}>
//         <View style={styles.etaBox}>
//           <Text style={styles.etaLabel}>ETA</Text>
//           <Text style={styles.etaValue}>
//             {etaMinutes ? `${etaMinutes} • ${distance}` : "Calculating..."}
//           </Text>
//         </View>
//       </View>

//       {/* Checklist */}
//       {isCheckListVisible && (
//         <Animated.View
//           style={[
//             styles.checklistContainer,
//             { transform: [{ translateY: slideAnim }] },
//           ]}
//         >
//           {checkList.map((item) => (
//             <Pressable key={item.id} onPress={() => toggleItem(item.id)}>
//               <View
//                 style={[
//                   styles.checkItem,
//                   item.checked && styles.checkItemActive,
//                 ]}
//               >
//                 <View style={styles.checkbox}>
//                   {item.checked && <Text style={styles.checkboxTick}>✓</Text>}
//                 </View>
//                 <Text
//                   style={[
//                     styles.checkLabel,
//                     item.checked && styles.checkLabelActive,
//                   ]}
//                 >
//                   {item.label}
//                 </Text>
//               </View>
//             </Pressable>
//           ))}

//           {showChecklist && (
//             <View style={styles.readyWrapper}>
//               <Pressable onPress={hideChecklist} style={styles.readyButton}>
//                 <Text style={styles.readyText}>Ready</Text>
//               </Pressable>
//             </View>
//           )}
//         </Animated.View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   marker: { fontSize: 40 },
//   truckMarker: {
//     width: 50,
//     height: 50,
//   },
//   checklistContainer: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 24,
//     borderWidth: 2,
//     borderColor: "#e23003",
//   },
//   checkItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingVertical: 16,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     marginBottom: 24,
//   },
//   etaWrapper: {
//     position: "absolute",
//     top: 56,
//     alignSelf: "center",
//     paddingTop: 8,
//   },
//   etaBox: {
//     backgroundColor: "#ff4f0d",
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     minWidth: 300,
//     borderRadius: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   etaLabel: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   etaValue: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   checkItemActive: { backgroundColor: "#ff4f0d" },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderRadius: 6,
//     borderWidth: 2,
//     borderColor: "#ff4f0d",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   checkboxTick: { color: "#fff", fontSize: 12, fontWeight: "700" },
//   checkLabel: { fontSize: 16, fontWeight: "700", color: "#801b0e" },
//   checkLabelActive: { color: "#fff4ec" },
//   readyWrapper: { alignItems: "center" },
//   readyButton: {
//     width: "50%",
//     height: 56,
//     marginTop: 16,
//     backgroundColor: "#ff4f0d",
//     borderRadius: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   readyText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
// });
