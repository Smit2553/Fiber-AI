import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {useState} from 'react';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function topProducts() {
    const [items, setItems] = useState<string[]>(['blank']);

    const [showPreview, setShowPreview] = useState(0);

    const [showFilter, setShowFilter] = useState(false);

    type FilterOptions = {
        option1: boolean;
        option2: boolean;
        option3: boolean;
    }

    const [currFilter, setCurrFilter] = useState<FilterOptions>({
        option1: false, 
        option2: false, 
        option3: false
    });

    const handleButtonClick = (index: number) => {
        // 0 = none, 1 = food, 2 = drink, 3 = snack
        // console.log(showPreview);
        if (index === showPreview) {
            setShowPreview(0);
        } else {
            grabItems(index);
            setShowPreview(index);
        }
    }

    const handleFilterChange = (option: keyof FilterOptions) => {
        setCurrFilter(prev => ({ ...prev, [option]: !prev[option] }));
      };

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
    }

    const grabItems = (index: number) => {
        // 1 = food, 2 = drink, 3 = snack
        // grab top items for each either from a file or backend
        if (index === 1) { 
            setItems(['Meat', 'Fruit', 'Vegetables']); // placeholders
        } else if (index === 2) {
            setItems(['Sports Drinks', 'Energy Drinks', 'Soda']);
        } else if (index === 3) {
            setItems(['Chips', 'Nuts', 'Baked Goods']);
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <div style={styles.titleContainer}>
                <ThemedText style={styles.title} type='title'>Top Products</ThemedText>
                <button style={styles.buttonFix} onClick={() => {handleFilterClick()}}>
                    <MaterialIcons name="filter-list" style={{paddingRight: 5}} size={24} color={showFilter ? "orange" : "black"} />
                    <Text style={{fontSize: 14, paddingRight: 15}}>Filter</Text>
                </button>
            </div>
            
            <div style={{marginTop: -20}}>
                <SafeAreaView style={styles.catContainer}> 
                    <button style={styles.catCard} onClick={() => {handleButtonClick(1)}}>
                        <MaterialCommunityIcons name="food-apple-outline" size={60} color="black" />
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
                </SafeAreaView>

                {/* conditionally render items */}
                {/* TODO: fix routing */}
                {showPreview > 0 && (
                        <View style={styles.dataContainer}>
                            {/* <Link href="/food"></Link> */}
                            {items.map((item, index) => (
                                <Link href={`/topProduct/${item}`} key={index} style={styles.dataItems}>{item}</Link>
                            ))}
                        </View>
                    )}

                {/* filter pop up */}
                {showFilter && (
                    <View style={styles.filterWindow}>
                        <Text>Temp Filter Window</Text>
                        <label>
                        <input
                            type="checkbox"
                            checked={currFilter.option1}
                            onChange={() => handleFilterChange('option1')}
                        />
                        Option 1
                        </label>
                        <label>
                        <input
                            type="checkbox"
                            checked={currFilter.option2}
                            onChange={() => handleFilterChange('option2')}
                        />
                        Option 2
                        </label>
                        <label>
                        <input
                            type="checkbox"
                            checked={currFilter.option3}
                            onChange={() => handleFilterChange('option3')}
                        />
                        Option 3
                        </label>
                    </View>
                )}
            </div>
        </SafeAreaView>
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
    buttonFix: {
        display: 'flex', 
        alignItems: 'center', 
        borderWidth: 0, 
        backgroundColor: 'white',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        marginBottom: 10,
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
        textDecorationLine: 'none',
        fontFamily: 'Segoe UI',
    },
    catContainer: {
        padding: 10,
        // paddingLeft: 10,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      catCard: {
        backgroundColor: '#DAD7CD',
        display: 'flex',
        flexDirection: 'column',
        width: 115,
        height: 115,
        margin: '1%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderWidth: 0,
      },
      filterWindow: {
        zIndex: 9999,
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: '#DAD7CD',
        borderRadius: 20,
        padding: 30,
        transform: 'translate(-50%, -50%)',
        borderWidth: 2,
      }
});