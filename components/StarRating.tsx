import React from "react";
import { Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function StarRating({ starRating, handleStarRating }: any) {
  return (
    <Pressable onPress={() => handleStarRating()}>
      {starRating ? (
        <AntDesign name="star" size={24} color="#FF7F3E" />
      ) : (
        <AntDesign name="staro" size={24} color="#FF7F3E" />
      )}
    </Pressable>
  );
}
