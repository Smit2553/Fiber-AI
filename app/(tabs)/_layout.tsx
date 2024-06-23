import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: colorScheme === "dark" ? "#ffff" : "gray",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="home"
              size={24}
              color={
                focused ? "#FF7F3E" : colorScheme === "dark" ? "white" : "black"
              }
            />
          ),
          tabBarLabelStyle: {
            color: colorScheme === "dark" ? "#ffff" : "gray", // Change title color here
          },
        }}
      />
      <Tabs.Screen
        name="star"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="star"
              size={24}
              color={
                focused ? "#FF7F3E" : colorScheme === "dark" ? "white" : "black"
              }
            />
          ),
          tabBarLabelStyle: {
            color: colorScheme === "dark" ? "#ffff" : "gray", // Change title color here
          },
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="scan"
              size={26}
              color={
                focused ? "#FF7F3E" : colorScheme === "dark" ? "white" : "black"
              }
            />
          ),
          tabBarLabelStyle: {
            color: colorScheme === "dark" ? "#ffff" : "gray", // Change title color here
          },
        }}
      />
      <Tabs.Screen
        name="recos"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="history"
              size={30}
              color={
                focused ? "#FF7F3E" : colorScheme === "dark" ? "white" : "black"
              }
            />
          ),
          tabBarLabelStyle: {
            color: colorScheme === "dark" ? "#ffff" : "gray", // Change title color here
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="search1"
              size={30}
              color={
                focused ? "#FF7F3E" : colorScheme === "dark" ? "white" : "black"
              }
            />
          ),
          tabBarLabelStyle: {
            color: colorScheme === "dark" ? "#ffff" : "gray", // Change title color here
          },
        }}
      />
    </Tabs>
  );
}
