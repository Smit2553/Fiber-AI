import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import StarRating from "./StarRating";
import { useState } from "react";

interface ItemComponentProps {
  imageSource: string;
  title: string;
  rating: string;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
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
      <StarRating starRating={starRating} handleStarRating={handleStarRating} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ItemComponent;
