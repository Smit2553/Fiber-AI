import React from "react";
import { View, StyleSheet } from "react-native";
import MyComponent from "@/components/Search";

export default function SearchScreen() {
  return (
    <View style={styles.search}>
      <View style={styles.searchBar}> 
         <MyComponent/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    top: 75,
  },
  searchBar: {
    width: '90%',
    margin: 'auto',
  }
});
