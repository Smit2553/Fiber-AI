import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState} from 'react';

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
        // grab top items for each
        if (index === 1) { 
            setItems(['food1', 'food2', 'food3']); // placeholders
        } else if (index === 2) {
            setItems(['drink1', 'drink2', 'drink3']);
        } else if (index === 3) {
            setItems(['snack7', 'snack8', 'snack9']);
        }
    }

    return (
        <ThemedView>
            <div style={styles.mainContainer}>
            <Text style={{color: '#000000'}} type='title'>Top Products</Text>
            </div>
            <div className='contentContainer'>
                <button onClick={() => {handleButtonClick(1)}}>
                    <ThemedText>Food</ThemedText>
                </button>
                <button onClick={() => {handleButtonClick(2)}}>
                    <ThemedText>Drink</ThemedText>
                </button>
                <button onClick={() => {handleButtonClick(3)}}>
                    <ThemedText>Snack</ThemedText>
                </button>
            </div>

            {/* conditionally render items */}
            {showPreview > 0 && (
                    <ThemedView>
                        {items.map((item, index) => (
                            <ThemedText key={index}>{item}</ThemedText>
                        ))}
                    </ThemedView>
                )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        // gap: 8,
    },
    mainText: {
        color: 'black',
    },
    contentContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // gap: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});