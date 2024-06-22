import {View, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';

export default function topProducts() {
return (
    <View style={styles.test}>
        <ThemedText style={{color: "#000"}}>top products page</ThemedText>
    </View>
);
}

const styles = StyleSheet.create({
    test: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});