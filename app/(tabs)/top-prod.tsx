import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {useState} from 'react';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export default function topProducts() {
    const [items, setItems] = useState<string[]>(['blank']);

    const [showPreview, setShowPreview] = useState(0);

    const handleButtonClick = (index: number) => {
        // 0 = none, 1 = food, 2 = drink, 3 = snack
        console.log(showPreview);
        if (index === showPreview) {
            setShowPreview(0);
        } else {
            grabItems(index);
            setShowPreview(index);
        }
    }

    const grabItems = (index: number) => {
        // 1 = food, 2 = drink, 3 = snack
        // grab top items for each either from a file or backend
        if (index === 1) { 
            setItems(['food1', 'food2', 'food3']); // placeholders
        } else if (index === 2) {
            setItems(['drink1', 'drink2', 'drink3']);
        } else if (index === 3) {
            setItems(['snack7', 'snack8', 'snack9']);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <div>
                <ThemedText style={styles.title} type='title'>Top Products</ThemedText>
            </div>
            {/* <div className='contentContainer'>
                <button onClick={() => {handleButtonClick(1)}}>
                    <Text>Food</Text>
                </button>
                <button onClick={() => {handleButtonClick(2)}}>
                    <Text>Drink</Text>
                </button>
                <button onClick={() => {handleButtonClick(3)}}>
                    <Text>Snack</Text>
                </button>
            </div> */}
            
            <View style={styles.catContainer}> 
                <button style={styles.catCard} onClick={() => {handleButtonClick(1)}}>
                    <MaterialCommunityIcons name="food-apple-outline" size={50} color="black" />
                    <Text> Food </Text>
                </button>
                <button style={styles.catCard} onClick={() => {handleButtonClick(2)}}>
                    <Entypo name="drink" size={50} color="black" />
                    <Text> Drinks</Text>
                </button>
                <button style={styles.catCard} onClick={() => {handleButtonClick(3)}}>
                    <FontAwesome6 name="bowl-food" size={50} color="black" />
                    <Text> Snacks </Text>
                </button>
            </View>

            {/* conditionally render items */}
            {showPreview > 0 && (
                    <View style={styles.dataContainer}>
                        {/* <Link href="/food"></Link> */}
                        {items.map((item, index) => (
                            <Text key={index} style={styles.dataItems}>{item}</Text>
                        ))}
                    </View>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        color: 'black',
        padding: 20,
    },
    mainText: {
        color: 'black',
    },
    contentContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
    },
    dataContainer: {
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        width: '100%',
        gap: 5,
    },
    dataItems: {
        backgroundColor: '#DAD7CD',
        color: 'black',
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        width: '90%',
        borderRadius: 10,
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
        cursor: 'pointer',
      }
});