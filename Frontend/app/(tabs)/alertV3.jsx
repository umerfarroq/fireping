


///v1

import { useEffect, useRef, useState } from "react";
import { Linking, Alert, Platform, ScrollView, View, StyleSheet, Text, Pressable, Animated, Easing, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import MapView, { Polyline, Marker } from "react-native-maps";
import { FIRE_INCIDENT_LOCATIONS } from "../../Constants/Data.js";
import FireTruckIcon from "../../assets/FireTruckLocation.png";
import helmetImg from "../../assets/helmet.png";
import torchImg from "../../assets/torch.png";
import oxygenImg from "../../assets/oxygencylider.png";
import glovesImg from "../../assets/gloves.png";
import AnimatedFireIcon from "../../components/animatedFireIcon.jsx";

export default function AlertScreen() {
  // ================= STATES =================

  const [isCheckListVisible, setIsCheckListVisible] = useState(true);
  const [ResponseMode, setIsResponseMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [etaMinutes, setEtaMinutes] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [allRoutes, setAllRoutes] = useState([]);
  const [clickSound, setClickedSound] = useState(null);
  const [assignedIncident, setAssignedIncident] = useState(null);

  const [checkList, setCheckList] = useState([
    {
      id: 1,
      label: "Helmet",
      emoji: helmetImg,
      checked: false,
    },
    {
      id: 2,
      label: "Gloves",
      emoji: glovesImg,
      checked: false,
    },
    {
      id: 3,
      label: "Oxygen",
      emoji: oxygenImg,
      checked: false,
    },
    {
      id: 4,
      label: "Torch",
      emoji: torchImg,
      checked: false,
    },
  ]);

  // ================= REFS =================
  const slideAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);
  const locationSubscription = useRef(null);

  // ================= CONSTANTS =================
  const showChecklist = checkList.every((item) => item.checked);
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const fireIncidentCoord = routeCoords[routeCoords.length - 1];

  // ================= HELPERS =================

  const toggleItem = (id) => {
    setCheckList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  // Find the nearest fire incident to the firefighter
  const findNearestIncident = (firefighterLocation) => {
    if (!firefighterLocation) return null;

    let nearest = null;
    let minDistance = Infinity;

    FIRE_INCIDENT_LOCATIONS.forEach((incident) => {
      const distance = calculateDistance(
        firefighterLocation.latitude,
        firefighterLocation.longitude,
        incident.latitude,
        incident.longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = { ...incident, distanceToFirefighter: distance };
      }
    });

    return nearest;
  };

  const openGoogleMapsNavigation = async () => {
    if (!currentLocation || !assignedIncident) {
      Alert.alert("Not Ready", "Location or incident not assigned yet");
      return;
    }

    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${assignedIncident.latitude},${assignedIncident.longitude}`;

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

    const canOpen = await Linking.canOpenURL(googleMapsUrl);

    if (!canOpen) {
      Alert.alert("Error", "Google maps is not available");
      return;
    }

    Linking.openURL(googleMapsUrl);
  };

  const hideChecklist = () => {
    setIsResponseMode(true);
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT * 0.6,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setIsCheckListVisible(false);
      openGoogleMapsNavigation();
    });
  };

  const handleOpenGoogleMapsBtn = () => {
    openGoogleMapsNavigation();
  };

  // ================= POLYLINE DECODER =================

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lat += result & 1 ? ~(result >> 1) : result >> 1;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lng += result & 1 ? ~(result >> 1) : result >> 1;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  const formatDistance = (m) =>
    m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
  const formatETA = (s) => `${Math.ceil(s / 60)} mins`;

  // ================= REQUEST LOCATION PERMISSION =================
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required for live tracking"
          );
          setIsLoadingLocation(false);
          return;
        }

        setLocationPermission(true);
        console.log("Location permission granted");
      } catch (error) {
        console.error("Error requesting permission:", error);
      }
    };

    requestPermission();
  }, []);

  // ================= AUTO-ASSIGN NEAREST INCIDENT =================
  useEffect(() => {
    if (currentLocation && !assignedIncident) {
      const nearest = findNearestIncident(currentLocation);
      setAssignedIncident(nearest);
      console.log("Auto-assigned nearest incident:", nearest);
      
      if (nearest) {
        Alert.alert(
          "Incident Assigned",
          `You've been assigned to ${nearest.address || 'Fire Incident'}
Distance: ${formatDistance(nearest.distanceToFirefighter)}`,
          [{ text: "OK" }]
        );
      }
    }
  }, [currentLocation]);

  // Sound and haptic feedback
  useEffect(() => {
    let sound;

    const loadSound = async () => {
      const result = await Audio.Sound.createAsync(
        require("../../assets/MouseClickSound.wav")
      );

      sound = result.sound;
      setClickedSound(sound);
    };
    loadSound();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const playFeedback = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      if (clickSound) {
        await clickSound.replayAsync();
      }
    } catch (err) {
      console.log("Feedback error:", err);
    }
  };

  // ================= START LIVE TRACKING =================

  useEffect(() => {
    if (!locationPermission) return;

    const startTracking = async () => {
      try {
        console.log("Trying last known location...");
        const lastKnown = await Location.getLastKnownPositionAsync({
          maxAge: 60000,
          requiredAccuracy: 100,
        });

        if (lastKnown?.coords) {
          const quickCoords = {
            latitude: lastKnown.coords.latitude,
            longitude: lastKnown.coords.longitude,
          };
          console.log("Got last known location (FAST):", quickCoords);
          setCurrentLocation(quickCoords);
          setIsLoadingLocation(false);

          if (mapRef.current) {
            mapRef.current.animateToRegion(
              {
                ...quickCoords,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              },
              1000
            );
          }
        }

        console.log("Getting precise location...");
        const initialLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });

        const preciseCoords = {
          latitude: initialLocation.coords.latitude,
          longitude: initialLocation.coords.longitude,
        };

        console.log("Got precise location:", preciseCoords);
        setCurrentLocation(preciseCoords);
        setIsLoadingLocation(false);

        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...preciseCoords,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            1000
          );
        }

        console.log("Starting live tracking...");
        locationSubscription.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 5000,
            distanceInterval: 5,
          },
          (location) => {
            const newCoords = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };

            console.log("New location:", newCoords);
            setCurrentLocation(newCoords);

            if (ResponseMode && mapRef.current) {
              mapRef.current.animateCamera(
                {
                  center: newCoords,
                },
                { duration: 1000 }
              );
            }
          }
        );

        console.log("Live tracking started");
      } catch (error) {
        console.error("Error starting tracking:", error);
        Alert.alert("Error", "Could not start location tracking");
        setIsLoadingLocation(false);
      }
    };

    startTracking();

    return () => {
      console.log("Stopping live tracking");
      locationSubscription.current?.remove();
    };
  }, [locationPermission, ResponseMode]);

  // ================= FETCH ROUTE FROM OSRM =================
  const fetchOSRMRoute = async (coordsParam) => {
    const coords = coordsParam || currentLocation;
    if (!coords || !assignedIncident) return;

    setIsLoadingRoute(true);

    const origin = `${coords.longitude},${coords.latitude}`;
    const dest = `${assignedIncident.longitude},${assignedIncident.latitude}`;

    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${origin};${dest}?overview=full&geometries=polyline&alternatives=true`
      );
      const data = await res.json();

      if (!data.routes?.length) {
        console.log("No route found");
        setIsLoadingRoute(false);
        return;
      }

      const decodedRoutes = data.routes.map((r) => decodePolyline(r.geometry));
      setAllRoutes(decodedRoutes);

      const PrimaryRoute = data.routes[0];
      setRouteCoords(decodedRoutes[0]);
      setDistance(formatDistance(PrimaryRoute.distance));
      setEtaMinutes(formatETA(PrimaryRoute.duration));
      setIsLoadingRoute(false);

      console.log("Routes fetched:", {
        totalRoutes: data.routes.length,
        PrimaryDistance: formatDistance(PrimaryRoute.distance),
        primaryETA: formatETA(PrimaryRoute.duration),
      });
    } catch (error) {
      console.error("Error fetching route:", error);
      setIsLoadingRoute(false);
    }
  };

  useEffect(() => {
    if (currentLocation && assignedIncident) {
      fetchOSRMRoute();
    }
  }, [currentLocation, assignedIncident]);

  // ================= UI =================
  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: FIRE_INCIDENT_LOCATIONS[0].latitude,
          longitude: FIRE_INCIDENT_LOCATIONS[0].longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {/* Show ALL fire incidents */}
        {FIRE_INCIDENT_LOCATIONS.map((incident) => (
          <Marker
            key={incident.id}
            coordinate={{
              latitude: incident.latitude,
              longitude: incident.longitude,
            }}
            opacity={assignedIncident?.id === incident.id ? 1 : 0.4}
          >
            <View style={styles.incidentMarkerContainer}>
              {/* <AnimatedFireIcon /> */}
              <Text style={styles.fireText}>🔥</Text>
              {assignedIncident?.id === incident.id && (
                <View style={styles.assignedBadge}>
                  <Text style={styles.assignedText}>ASSIGNED</Text>
                </View>
              )}
            </View>
          </Marker>
        ))}

        {/* Fire truck marker */}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
          >
            <Image style={styles.truckMarker} source={FireTruckIcon} />
          </Marker>
        )}

        {/* Route polylines */}
        {allRoutes.map((route, index) => (
          <Polyline
            key={index}
            coordinates={route}
            strokeWidth={index === 0 ? 10 : 2}
            strokeColor={index === 0 ? "#ff4f0d" : "#888"}
          />
        ))}
      </MapView>

      {/* ETA Box */}
      <View style={styles.etaWrapper}>
        <View style={styles.etaBox}>
          <Text style={styles.etaLabel}>ETA</Text>
          <Text style={styles.etaValue}>
            {etaMinutes ? `${etaMinutes} • ${distance}` : "Calculating..."}
          </Text>
        </View>
        {assignedIncident && (
          <View style={styles.incidentInfoBox}>
            <Text style={styles.incidentInfoText}>
              📍 {assignedIncident.address || `Incident #${assignedIncident.id}`}
            </Text>
            {assignedIncident.severity && (
              <View style={[
                styles.severityBadge,
                assignedIncident.severity === 'high' && styles.severityHigh,
                assignedIncident.severity === 'medium' && styles.severityMedium,
                assignedIncident.severity === 'low' && styles.severityLow,
              ]}>
                <Text style={styles.severityText}>
                  {assignedIncident.severity.toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Open Map Button */}
      {!isCheckListVisible && (
        <View style={styles.openMapBtnContainer}>
          <Pressable onPress={handleOpenGoogleMapsBtn}>
            <Text style={styles.openMapBtnText}>Open Map</Text>
          </Pressable>
        </View>
      )}

      {/* Checklist */}
      {isCheckListVisible && (
        <Animated.View
          style={[
            styles.checklistContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.gridContainer}>
              {checkList.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={async () => {
                    await playFeedback();
                    toggleItem(item.id);
                  }}
                  style={styles.gridItemWrapper}
                >
                  <View
                    style={[
                      styles.gridItem,
                      item.checked && styles.gridItemActive,
                    ]}
                  >
                    <Image source={item.emoji} style={styles.itemEmoji} />
                    <Text
                      style={[
                        styles.itemLabel,
                        item.checked && styles.itemLabelActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <View
                      style={[
                        styles.checkbox,
                        item.checked && styles.checkboxActive,
                      ]}
                    >
                      {item.checked && (
                        <Text style={styles.checkboxTick}>✓</Text>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {showChecklist && (
            <View style={styles.readyWrapper}>
              <Pressable onPress={hideChecklist} style={styles.readyButton}>
                <Text style={styles.readyText}>Ready</Text>
              </Pressable>
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  marker: { fontSize: 40 },
  truckMarker: {
    width: 50,
    height: 50,
  },
  incidentMarkerContainer: {
    alignItems: 'center',
  },
  assignedBadge: {
    backgroundColor: '#ff4f0d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  assignedText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  checklistContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: "#e23003",
    borderBottomColor: "#fff",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  gridItemWrapper: {
    width: "47%",
  },
  gridItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 140,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    position: "relative",
    boxShadow: "0 4 10 0 rgba(0, 0, 0, 0.8)",
  },
  gridItemActive: {
    backgroundColor: "#ff4f0d",
    borderColor: "#c92205",
  },
  itemEmoji: {
    height: 100,
    width: 100,
    objectFit: "contain",
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "roboto",
    color: "#801b0e",
    textAlign: "center",
  },
  itemLabelActive: {
    color: "#fff",
  },
  checkbox: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ff4f0d",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: "#ff4f0d",
    borderColor: "#fff",
  },
  checkboxTick: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  etaWrapper: {
    position: "absolute",
    top: 56,
    alignSelf: "center",
    paddingTop: 8,
    alignItems: 'center',
  },
  etaBox: {
    backgroundColor: "#ff4f0d",
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 300,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  etaLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  openMapBtnContainer: {
    backgroundColor: "#ff4f0d",
    color: "#ffff",
    position: "absolute",
    bottom: 15,
    right: 10,
    alignSelf: "center",
    padding: 12,
    borderRadius: 8,
  },
  openMapBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  etaValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  incidentInfoBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#ff4f0d',
  },
  incidentInfoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  severityHigh: {
    backgroundColor: '#ff0000',
  },
  severityMedium: {
    backgroundColor: '#ff9500',
  },
  severityLow: {
    backgroundColor: '#ffcc00',
  },
  severityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  readyWrapper: {
    alignItems: "center",
    marginTop: 8,
  },
  readyButton: {
    width: "50%",
    height: 56,
    marginTop: 16,
    backgroundColor: "#ff4f0d",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  readyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  scrollContainer: {
    height: 350,
  },
  fireText:{
    fontSize: 44,
    fontWeight: 'bold',
    
   
  }
});

