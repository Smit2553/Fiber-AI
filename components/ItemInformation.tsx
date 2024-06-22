import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

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
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  description: {
    flexDirection: "column",
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
