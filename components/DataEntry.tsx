import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

interface DataEntryProps {
    item: string;
}

const DataEntry: React.FC<DataEntryProps> = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text>{item}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
});

export default DataEntry;