import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import ItemInformation from './ItemInformation';

interface ProductSectionProps {
    propArray: {
        imageSource: string;
        title: string;
        rating: string;
      }[]
}

const ProductSection: React.FC<ProductSectionProps> = ({ propArray }) => {
    return (
        <ThemedView>
            {propArray.map((item, index) => (
                <ItemInformation
                    key={index}
                    imageSource={item.imageSource}
                    title={item.title}
                    rating={item.rating}
                />
            ))}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
});

export default ProductSection;