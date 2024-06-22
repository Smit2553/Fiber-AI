import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import Cat from '@/components/categories';


export default function HomeScreen() {
  return (
    <View style={styles.bodyContainer}> 
      <Octicons name="feed-person" size={40} color="black" style={{paddingLeft: 10, margin: 0, }} />
      <View style={{position:'relative', top: -30}}> 
        <Image
          style={styles.foodGirl}
          source={{
            uri: 'https://www.goteso.com/products/assets/images/clone-scripts/doordash/doordash-clone-banner.png',
          }}
        />
        <Text style={styles.mainText}> Good Food {"\n"} Better Alternatives</Text>
        <Text style={{color: 'gray', marginLeft: 10}}> Tap "scan" to get started </Text>
        <Text style={styles.categContainer}> 
          Categories
        </Text>
        <View style={styles.catContainer}> 
          <View style={styles.catCard}>
            <MaterialCommunityIcons name="food-apple-outline" size={50} color="black" />
            <Text> Food </Text>
          </View>
          <View style={styles.catCard}>
            <Entypo name="drink" size={50} color="black" />
            <Text> Drinks</Text>
          </View>
          <View style={styles.catCard}>
            <FontAwesome6 name="bowl-food" size={50} color="black" />
            <Text> Snacks </Text>
          </View>
        </View>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  foodGirl: {
    width: '90%',
    textAlign: 'center',
    aspectRatio: 1, 
    resizeMode: 'contain',
  },
  pictureContainer: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Optima',
    marginBottom: 5,
  },

  categContainer: {
    marginLeft: 10,
    marginTop: 40,

  },
  catContainer: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'row',
  },
  catCard: {
    backgroundColor: '#FAF7EE',
    width: 115,
    height: 115,
    marginRight: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }

});
