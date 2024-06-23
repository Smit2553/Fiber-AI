import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import StarRating from "@/components/StarRating";
import { Feather } from "@expo/vector-icons";

export default function star() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Favorites</Text>
          <View style={styles.headerRight}>
            <AntDesign name="questioncircleo" size={28} color="black" />
          </View>
        </View>

        {favorites.map((element) => (
          <View style={styles.element}>
            <FavItemComponent
              key={element.key}
              imageSource={element.imageSource}
              title={element.title}
              rating={element.rating}
            />
          </View>
        ))}

        {/* Add more ItemComponent instances as needed */}
      </ScrollView>
    </SafeAreaView>
  );
}

interface ItemComponentProps {
  imageSource: string;
  title: string;
  rating: string;
}

const FavItemComponent: React.FC<ItemComponentProps> = ({
  imageSource,
  title,
  rating,
}) => {
  const [starRating, setStarRating] = useState(false);

  const handleStarRating = () => {
    setStarRating(!starRating);
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <Feather name="trash-2" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
  },
  headerRight: {
    flexDirection: "row",
    gap: 2,
  },
  element: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    flexWrap: "nowrap",
    borderRadius: 20,
  },
  description: {
    flexDirection: "column",
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  rating: {
    fontSize: 16,
    color: "#000",
  },
});

const favorites = [
  {
    imageSource:
      "https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.633.400.jpg",
    title: "Nutella",
    rating: "32/100",
    key: "1",
  },
  {
    imageSource:
      "https://images.openfoodfacts.org/images/products/500/015/946/1122/front_en.267.400.jpg",
    title: "Snickers",
    rating: "12/100",
    key: "2",
  },
  {
    imageSource:
      "https://images.openfoodfacts.org/images/products/405/648/945/1136/front_da.18.400.jpg",
    title: "Vegan Pizza - Bruschetta - Vemondo",
    rating: "30/100",
    key: "3",
  },
  {
    imageSource:
      "https://images.openfoodfacts.org/images/products/20951337/front_da.47.400.jpg",
    title: "Chicken Nuggets",
    rating: "40/100",
    key: "4",
  },
];
