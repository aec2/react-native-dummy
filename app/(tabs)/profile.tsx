import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import React from 'react';

const mockData = {
  name: 'John Doe',
  bio: 'Software Developer | Tech Enthusiast | Coffee Lover',
  profilePicture: 'https://via.placeholder.com/150',
  posts: [
    { id: '1', title: 'Exploring React Native', date: '2023-10-01' },
    { id: '2', title: 'Understanding TypeScript', date: '2023-09-25' },
    { id: '3', title: '10 Tips for Clean Code', date: '2023-09-15' },
  ],
};

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: mockData.profilePicture }} style={styles.profileImage} />
        <Text style={styles.name}>{mockData.name}</Text>
        <Text style={styles.bio}>{mockData.bio}</Text>
      </View>
      <Text style={styles.sectionTitle}>Recent Posts</Text>
      <FlatList
        data={mockData.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postDate}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});