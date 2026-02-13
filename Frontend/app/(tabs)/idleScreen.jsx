import { View, Text, StyleSheet, FlatList, Dimensions, Platform , Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState, useCallback } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ProfilePic from "../../assets/Firefighter-removebg-preview.png"
const Idlescreen = () => {
  const TipsData = [
    { id: "1", tip: "Know your exit before you need it." },
    { id: "2", tip: "Low and slow in zero visibility." },
    { id: "3", tip: "Call a MAYDAY early — pride has no place here." },
    { id: "4", tip: "Watch your partner before watching the fire." },
    { id: "5", tip: "Train like it will fail — because it might." },
  ];

  const NoticeBoardData = [
    { id: "1", notice: "Morning drill at 9:00 AM." },
    { id: "2", notice: "Equipment inspection due today." },
    { id: "3", notice: "Safety briefing mandatory." },
    { id: "4", notice: "Morning drill at 9:00 AM." },
    { id: "5", notice: "Equipment inspection due today." },
    { id: "6", notice: "Safety briefing mandatory." },
  ];

  const ITEM_HEIGHT = 66;
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const NOTICE_HEIGHT = SCREEN_HEIGHT * 0.29;

  const tipsRef = useRef(null);
  const noticeRef = useRef(null);

  const [tipsIndex, setTipsIndex] = useState(0);
  const [noticeIndex, setNoticeIndex] = useState(0);

  useEffect(() => {
    const tipsTimer = setInterval(() => {
      setTipsIndex((prev) => (prev + 1) % TipsData.length);
    }, 2000);

    const noticeTimer = setInterval(() => {
      setNoticeIndex((prev) => (prev + 1) % NoticeBoardData.length);
    }, 2000);

    return () => {
      clearInterval(tipsTimer);
      clearInterval(noticeTimer);
    };
  }, []);

  useEffect(() => {
    tipsRef.current?.scrollToOffset({
      offset: tipsIndex * ITEM_HEIGHT,
      animated: true, // Fixed typo: was "Animated"
    });
  }, [tipsIndex]);

  useEffect(() => {
    noticeRef.current?.scrollToOffset({
      offset: noticeIndex * ITEM_HEIGHT,
      animated: true, // Fixed typo: was "Animated"
    });
  }, [noticeIndex]);

  // Memoized render functions for better performance
  const renderTip = useCallback(({ item }) => (
    <View style={styles.listCard}>
      <View style={styles.rowContainer}>
        <MaterialCommunityIcons name="fire" size={28} color="#FF6B00" />
        <Text style={styles.listText}>{item.tip}</Text>
      </View>
    </View>
  ), []);

  const renderNotice = useCallback(({ item }) => (
    <View style={styles.noticeCard}>
      <View style={styles.rowContainer}>
        <Ionicons name="pin" size={28} color="#C0392B" />
        <Text style={styles.noticeText}>{item.notice}</Text>
      </View>
    </View>
  ), []);

  return (
    <View style={styles.fullScreenBackground}>
      {/* <StatusBar style="light" /> */}

      {/* Changed to SafeAreaView with edges prop for iOS */}
      <SafeAreaView style={styles.mainContainer} edges={[ 'left', 'right' ]}>
        {/* Profile Badge */}
        <View style={styles.nameBadgeContainer}>
          <View>
            <Text style={styles.badgeNo}>#128293</Text>
            <Text style={styles.badgeText}>Umar Farooq</Text>
          </View>
          <View style={styles.profileContainer}>
            <Image source={ProfilePic} style={styles.profileImage}/>
          </View>
        </View>

        {/* Tips Section */}
        

      
        <View style={styles.sectionHeader}>
          <View>
            <Ionicons name="notifications" size={24} color="#e23003"/>
          </View>
          <Text style={styles.sectionTitle}>Quick Tips</Text>
           
        </View>

        <View style={styles.TipsCardContainer}>
          <FlatList
            ref={tipsRef}
            data={TipsData}
            keyExtractor={(item) => item.id}
            renderItem={renderTip}
            showsVerticalScrollIndicator={false}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            removeClippedSubviews={true}
            maxToRenderPerBatch={3}
            windowSize={3}
          />
        </View>

        {/* Notice Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Ionicons name="megaphone" size={23} color="#e23003" />
          </View>
          <Text style={styles.sectionTitle}>Notice Board</Text>
        </View>

        <View style={[styles.cardContainerSmall, ]}>
          <FlatList
            ref={noticeRef}
            data={NoticeBoardData}
            keyExtractor={(item) => item.id}
            renderItem={renderNotice}
            showsVerticalScrollIndicator={false}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            removeClippedSubviews={true}
            maxToRenderPerBatch={3}
            windowSize={3}
          />
        </View>
         
      </SafeAreaView>
    </View>
  );
};

export default Idlescreen;

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F6FA", // Added to ensure consistent background
    marginTop:30
  },

  /* Profile */
  nameBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 8,
    justifyContent:"space-between",
    alignContent:'center',
    alignItems:'center',
    // borderWidth:1,
    // borderColor:'#e23003',
    
    
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },


  profileContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    alignSelf:'center',
   
    borderRadius:"50%",
   
  },

  profileImage:{
    height:50,
    width:50,
    borderRadius:100,
    overflow:'hidden',
    objectFit:'cover'
  },

  badgeNo: {
    fontSize: 13,
    color: "#888",
    marginBottom: 2,
  },

  badgeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  /* Section Header */
  sectionHeader: {
    marginBottom: 20,
    marginTop: 20,
    display:"flex",
    flexDirection:"row",
    gap:10,
    // backgroundColor:"#ffcba7",
     backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
   
    // borderWidth:1,
    padding:10,
    borderRadius:12,
    alignSelf:'flex-start',
    paddingHorizontal:12,
    
   
    
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  /* Cards */
  TipsCardContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    // height: 260,
    height:'32%',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 2,
      },
    }),
  },

  cardContainerSmall: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    height:'32%',
    
    // marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 2,
      },
    }),
  },

  /* List Items */
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  listCard: {
    backgroundColor: "#F9FAFC",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },

  listText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 20,
    flex: 1, // Prevents text overflow
  },

  noticeCard: {
    backgroundColor: "#FFF1EC",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  noticeText: {
    fontSize: 15,
    color: "#C0392B",
    fontWeight: "500",
    flex: 1, // Prevents text overflow
  },
});