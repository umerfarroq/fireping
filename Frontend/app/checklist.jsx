// import { useState } from "react";
// import {
//   FlatList,
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Pressable,
// } from "react-native";
// import helmetImg from "../../assets/helmet.png";
// import glovesImg from "../../assets/gloves.png";
// import oxygencylinderImg from "../../assets/oxygencylider.png";
// import torchImg from "../../assets/torch.png";

// const Checklist = () => {
//   const [isCheckListVisible, setIsCheckListVisible] = useState(true);
//   const [checkList, setCheckList] = useState([
//     { id: 1, label: "Helmet", checked: false, img: helmetImg },
//     { id: 2, label: "Gloves", checked: false, img: glovesImg },
//     { id: 3, label: "Oxygen", checked: false, img: oxygencylinderImg },
//     { id: 4, label: "Torch", checked: false, img: torchImg },
//   ]);

//   return (
//     <FlatList
//       data={checkList}
//       numColumns={2}
//       renderItem={({ item }) => (
//         <Pressable>
//           <View
//             style={{
//               flex: 1,
//               height: 100,
//               backgroundColor: "lightblue",
//               margin: 5,
//             }}
//           >
//             <Image source={item.img} style={styles.imageContainer} />
//             <Text>{item.label}</Text>
//           </View>
//         </Pressable>
//       )}
//       keyExtractor={(item) => item.id}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   imageContainer: {
//     height: 50,
//     width: 50,
//     objectFit: "contain",
//   },
// });

// export default Checklist;
