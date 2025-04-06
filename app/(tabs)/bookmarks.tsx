import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

interface Bookmark {
    id: string;
    title: string;
    url: string;
    category: 'article' | 'video' | 'post' | 'other';
    date: string;
    favicon?: string;
}

const mockBookmarks: Bookmark[] = [
    {
        id: '1',
        title: 'Understanding React Native Navigation',
        url: 'https://reactnative.dev/docs/navigation',
        category: 'article',
        date: '2 days ago',
        favicon: 'https://reactnative.dev/img/favicon.ico'
    },
    {
        id: '2',
        title: 'Building Beautiful UIs with Flutter',
        url: 'https://flutter.dev/beautiful-uis',
        category: 'video',
        date: '1 week ago',
        favicon: 'https://flutter.dev/favicon.ico'
    },
    {
        id: '3',
        title: 'TypeScript Best Practices',
        url: 'https://typescript.org/best-practices',
        category: 'article',
        date: '3 days ago',
        favicon: 'https://www.typescriptlang.org/favicon-32x32.png'
    },
    {
        id: '4',
        title: 'Mobile App Design Trends 2024',
        url: 'https://design.com/trends-2024',
        category: 'post',
        date: 'Just now',
    },
];

const categories = [
    { id: 'all', label: 'All', icon: 'bookmark' },
    { id: 'article', label: 'Articles', icon: 'document-text' },
    { id: 'video', label: 'Videos', icon: 'videocam' },
    { id: 'post', label: 'Posts', icon: 'newspaper' },
    { id: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
];

export default function Bookmarks() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBookmarks = mockBookmarks.filter(bookmark => 
        selectedCategory === 'all' || bookmark.category === selectedCategory
    );

    const getCategoryIcon = (category: string) => {
        switch(category) {
            case 'article': return 'document-text';
            case 'video': return 'videocam';
            case 'post': return 'newspaper';
            default: return 'bookmark';
        }
    };

    const renderBookmark = ({ item }: { item: Bookmark }) => (
        <TouchableOpacity 
            style={styles.bookmarkCard}
            onPress={() => console.log(`Opening ${item.url}`)}
        >
            <View style={styles.bookmarkHeader}>
                {item.favicon ? (
                    <Image 
                        source={{ uri: item.favicon }} 
                        style={styles.favicon}
                    />
                ) : (
                    <View style={[styles.categoryIcon, { backgroundColor: COLORS.primary }]}>
                        <Ionicons 
                            name={getCategoryIcon(item.category)} 
                            size={16} 
                            color="#fff" 
                        />
                    </View>
                )}
                <View style={styles.bookmarkInfo}>
                    <Text style={styles.bookmarkTitle}>{item.title}</Text>
                    <Text style={styles.bookmarkUrl} numberOfLines={1}>{item.url}</Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.bookmarkFooter}>
                <View style={styles.categoryTag}>
                    <Ionicons name={getCategoryIcon(item.category)} size={14} color="#fff" />
                    <Text style={styles.categoryText}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderCategory = ({ item }: { item: typeof categories[0] }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(item.id)}
        >
            <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={selectedCategory === item.id ? '#fff' : '#fff'} 
            />
            <Text style={[
                styles.categoryButtonText,
                selectedCategory === item.id && styles.categoryButtonTextActive
            ]}>
                {item.label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bookmarks</Text>
            
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                style={styles.categoriesList}
                contentContainerStyle={styles.categoriesContent}
            />

            <FlatList
                data={filteredBookmarks}
                renderItem={renderBookmark}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.bookmarksList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292933',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fff',
        fontFamily: "Sunset-Serial-Medium",
        marginTop: 20,
    },
    categoriesList: {
        marginBottom: 16,
    },
    categoriesContent: {
        paddingRight: 16,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3d3d45',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        height: 32,
    },
    categoryButtonActive: {
        backgroundColor: COLORS.primary,
    },
    categoryButtonText: {
        color: '#fff',
        marginLeft: 6,
        fontSize: 13,
        fontFamily: "Sunset-Serial-Medium",
        opacity: 0.8,
    },
    categoryButtonTextActive: {
        opacity: 1,
        fontWeight: '500',
    },
    bookmarksList: {
        paddingBottom: 100,
    },
    bookmarkCard: {
        backgroundColor: '#3d3d45',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
    },
    bookmarkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    favicon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 12,
    },
    categoryIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#32d296',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    bookmarkInfo: {
        flex: 1,
    },
    bookmarkTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        fontFamily: "Sunset-Serial-Medium",
    },
    bookmarkUrl: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.7,
        marginTop: 2,
        fontFamily: "Sunset-Serial-Medium",
    },
    moreButton: {
        padding: 4,
    },
    bookmarkFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    categoryTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(50, 210, 150, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    categoryText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 4,
        fontFamily: "Sunset-Serial-Medium",
    },
    dateText: {
        color: '#fff',
        opacity: 0.5,
        fontSize: 12,
        fontFamily: "Sunset-Serial-Medium",
    },
});