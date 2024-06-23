import React from "react";
import { View, StyleSheet, Image, Text, Pressable, ScrollView} from "react-native";
import MyComponent from "@/components/Search";


export default function SearchScreen() {
  return (
    <View style={styles.body}>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}> 
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}> Search </Text>
          <Text style={{color: 'white', fontSize: 28, marginBottom: 10,}}> for items </Text>
          <MyComponent/>
          <View style={{flexDirection: 'row'}}> 
            <Pressable style={styles.catButton}> 
              <Text> Food</Text>
            </Pressable>
            <Pressable style={styles.catButton}> 
              <Text> Drinks</Text>
            </Pressable>
            <Pressable style={styles.catButton}> 
              <Text> Snacks</Text>
            </Pressable>
          </View>
        </View>

        <Text style={{margin: 20, fontSize: 22, fontWeight: 'bold'}}> Search Results </Text>

        {/* Items container */}
        <ScrollView> 
        <View style={styles.itemsContainer}> 
          <View style={styles.itemsCard}>
            <Image
              style={styles.foodPic}
              source={{
                uri: 'https://images.ctfassets.net/pxcfulgsd9e2/articleImage76944/fced4ee60a24295b593cd6214c61e69d/Foods-with-high-water-content-HN1023-iStock-578273202-Sized.jpg?f=top&fit=fill&fl=progressive&fm=jpg&h=786&q=85&w=1396',
              }}
            />
            <View>
              <Text style={styles.foodText}> Watermelon </Text>
              <Text style={{color: 'gray'}}> ⭐100/100 - Food </Text>
            </View>
          </View>
          <View style={styles.itemsCard}>
            <Image
              style={styles.foodPic}
              source={{
                uri: 'https://m.media-amazon.com/images/I/813axPlVxBL.jpg',
              }}
            />
            <View>
              <Text style={styles.foodText}> Lay's Potato Chips </Text>
              <Text style={{color: 'gray'}}> ⭐10/100 - Snack </Text>
            </View>
          </View>  
          <View style={styles.itemsCard}>
            <Image
              style={styles.foodPic}
              source={{
                uri: 'https://i5.walmartimages.com/seo/Gatorade-Thirst-Quencher-Orange-Sports-Drinks-28-fl-oz-Bottle_08e92cf5-b27a-4c0f-a7f1-cc816546357c_1.871e04fcef49c26bc171ec1b51789309.jpeg',
              }}
            />
            <View>
              <Text style={styles.foodText}> Gatorade </Text>
              <Text style={{color: 'gray'}}> ⭐17/100 - Drink </Text>
            </View>
          </View>  
          <View style={styles.itemsCard}>
            <Image
              style={styles.foodPic}
              source={{
                uri: 'https://www.eatthis.com/wp-content/uploads/sites/4//media/images/ext/993191471/roast-chicken-how-buy-healthiest-chicken.jpg?quality=82&strip=1',
              }}
            />
            <View>
              <Text style={styles.foodText}> Chicken </Text>
              <Text style={{color: 'gray'}}> ⭐95/100 - Food </Text>
            </View>
          </View> 
        </View>
      </ScrollView>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    height: '100%',
  },
  searchSection: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  itemsContainer: {
    
  },
  itemsCard: {
    backgroundColor: 'white',
    width: '100%',
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodPic: {
    width: 80, 
    height: 80,
    margin: 20,
    borderRadius: 20,
  },
  foodText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Roboto Condensed',
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: '#FF7F3E',
    padding: 20,
    paddingTop: 60,
    borderRadius: 30,
  },
  catButton: {
    backgroundColor: "#FFF6E9",
    padding: 10,
    margin: 5,
    borderRadius: 15,
  }
});
