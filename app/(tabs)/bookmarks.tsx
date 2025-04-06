import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const mockBookmarks = [
    { id: '1', title: 'React Native Documentation', url: 'https://reactnative.dev/' },
    { id: '2', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
    { id: '3', title: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
];

export default function Bookmarks() {
    const renderItem = ({ item }: { item: { id: string; title: string; url: string } }) => (
        <TouchableOpacity style={styles.card} onPress={() => console.log(`Opening ${item.url}`)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.url}>{item.url}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bookmarks</Text>
            <FlatList
                data={mockBookmarks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    list: {
        paddingBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    url: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
});