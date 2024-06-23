import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Link } from "expo-router";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  FontAwesome6,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopProducts() {
  const [items, setItems] = useState<string[]>(["blank"]);
  const [showPreview, setShowPreview] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  type FilterOptions = {
    option1: boolean;
    option2: boolean;
    option3: boolean;
  };

  const [currFilter, setCurrFilter] = useState<FilterOptions>({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleButtonClick = (index: number) => {
    if (index === showPreview) {
      setShowPreview(0);
    } else {
      grabItems(index);
      setShowPreview(index);
    }
  };

  const handleFilterChange = (option: keyof FilterOptions) => {
    setCurrFilter((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const grabItems = (index: number) => {
    if (index === 1) {
      setItems(["Meat", "Fruit", "Vegetables"]);
    } else if (index === 2) {
      setItems(["Sports Drinks", "Energy Drinks", "Soda"]);
    } else if (index === 3) {
      setItems(["Chips", "Nuts", "Baked Goods"]);
    } else if (index === 0) {
      setItems([]);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.title} type="title">
          Top Products
        </ThemedText>
        <Pressable style={styles.buttonFix} onPress={handleFilterClick}>
          <MaterialIcons
            name="filter-list"
            style={{ paddingRight: '1%' }}
            size={24}
            color={showFilter ? "orange" : "black"}
          />
          <Text style={{ fontSize: 14, paddingRight: 15 }}>Filter</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: -20, width:'100%' }}>
        <View style={styles.catContainer}>
          <Pressable
            style={styles.catCard}
            onPress={() => handleButtonClick(1)}
          >
            <MaterialCommunityIcons
              name="food-apple-outline"
              size={60}
              color="black"
            />
            <Text> Food </Text>
          </Pressable>
          <Pressable
            style={styles.catCard}
            onPress={() => handleButtonClick(2)}
          >
            <Entypo name="drink" size={50} color="black" />
            <Text> Drinks</Text>
          </Pressable>
          <Pressable
            style={styles.catCard}
            onPress={() => handleButtonClick(3)}
          >
            <FontAwesome6 name="bowl-food" size={50} color="black" />
            <Text> Snacks </Text>
          </Pressable>
        </View>

        {/* {showPreview > 0 && (
          <View style={styles.dataContainer}>
            {items.map((item, index) => (
              <Link
                href={`/topProduct/${item}`}
                key={index}
                style={styles.dataItems}
              >
                {item}
              </Link>
            ))}
          </View>
        )} */}

        <View style={styles.dataContainer}>
          {items.map((item, index) => (
            <>
            <View style={styles.dataItems}>
            <Link
              href={`/topProduct/${item}`}
              key={index}
              // style={styles.dataItems}
              style={{width:'100%'}}
            >
              {item}
            </Link>
            </View>
            </>
          ))}
        </View>

        {showFilter && (
          <View style={styles.filterWindow}>
            <Text>Temp Filter Window</Text>
            <View style={styles.filterOption}>
              <BouncyCheckbox
                size={25}
                fillColor="red"
                unFillColor="#FFFFFF"
                text="Option 1"
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                isChecked={currFilter.option1}
                onPress={() => handleFilterChange("option1")}
              />
            </View>
            <View style={styles.filterOption}>
              <BouncyCheckbox
                size={25}
                fillColor="red"
                unFillColor="#FFFFFF"
                text="Option 2"
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                isChecked={currFilter.option2}
                onPress={() => handleFilterChange("option2")}
              />
            </View>
            <View style={styles.filterOption}>
              <BouncyCheckbox
                size={25}
                fillColor="red"
                unFillColor="#FFFFFF"
                text="Option 3"
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                isChecked={currFilter.option3}
                onPress={() => handleFilterChange("option3")}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    color: "black",
    padding: 20,
  },
  buttonFix: {
    display: "flex",
    alignItems: "center",
    borderWidth: 0,
    backgroundColor: "white",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  dataContainer: {
    display: 'flex',
    alignItems: "center",
    color: "black",
    width: "100%",
    gap: 5,
  },
  dataItems: {
    backgroundColor: "#DAD7CD",
    color: "black",
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    width: "90%",
    borderRadius: 10,
    textDecorationLine: "none",
    fontFamily: "Segoe UI",
  },
  catContainer: {
    padding: 10,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  catCard: {
    backgroundColor: "#DAD7CD",
    display: "flex",
    flexDirection: "column",
    width: 115,
    height: 115,
    margin: "1%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  filterWindow: {
    zIndex: 9999,
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "#DAD7CD",
    borderRadius: 20,
    padding: 30,
    transform: [{ translateX: -50 }, { translateY: -50 }],
    borderWidth: 2,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
