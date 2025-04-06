import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const mockData = {
  name: 'Abdullah Enes Can',
  bio: 'Software Developer | Tech Enthusiast | Coffee Lover',
  profilePicture: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  posts: [
    { id: '1', title: 'Exploring React Native', date: '2023-10-01' },
    { id: '2', title: 'Understanding TypeScript', date: '2023-09-25' },
    { id: '3', title: '10 Tips for Clean Code', date: '2023-09-15' },
  ],
};

export default function Profile() {
  const { signOut } = useAuth();

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
      <View style={styles.signOutContainer}>
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={() => signOut()}
        >
        <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.signOutIcon} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292933',
    padding: 16,
    paddingBottom: 0,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
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
    color: '#fff',
    fontFamily: "Sunset-Serial-Medium",
  },
  bio: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    textAlign: 'center',
    fontFamily: "Sunset-Serial-Medium",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
    fontFamily: "Sunset-Serial-Medium",
  },
  postItem: {
    backgroundColor: '#3d3d45',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: "Sunset-Serial-Medium",
  },
  postDate: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
    marginTop: 4,
    fontFamily: "Sunset-Serial-Medium",
  },
  signOutContainer: {
    marginTop: 'auto',
    marginBottom: 50,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#32d296',
    padding: 16,
    borderRadius: 8,
    marginTop: 'auto',
    marginHorizontal: 16,
    marginBottom: 40,
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: "Sunset-Serial-Medium",
  },
});