import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ItemComponent from "@/components/ItemInformation";

export default function star() {
  return (
    <SafeAreaView>
      <ScrollView>
        <ItemComponent
          imageSource="https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.633.400.jpg"
          title="Nutella"
          rating="32/100"
        />
        <ItemComponent
          imageSource="https://via.placeholder.com/50"
          title="Sample Item 2"
          rating="0/100"
        />
        {/* Add more ItemComponent instances as needed */}
      </ScrollView>
    </SafeAreaView>
  );
}
