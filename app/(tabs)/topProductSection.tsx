import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ProductSection from '@/components/ProductSection';

function testProduct(a: string, b: string, c: string) {
    let product = {
        'imageSource': a,
        'title': b,
        'rating': c
    }

    return product;
}

export default function topProductSection() {
    // sample prop array
    const propArray = [
        {
        'imageSource': 'https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.633.400.jpg',
        'title': 'Nutella',
        'rating': '32/100'},
        testProduct('https://via.placeholder.com/50', 'Sample Item 2', '0/100'),
        testProduct('https://via.placeholder.com/100', 'Sample Item 3', '1/100'),
        testProduct('https://via.placeholder.com/50', 'Sample Item 4', '2/100')
    ];

    return (
        <View>
            <ProductSection propArray={propArray} />
        </View>
    );
}