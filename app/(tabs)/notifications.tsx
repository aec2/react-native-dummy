import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockNotifications = [
  { id: '1', title: 'New Message', description: 'You have a new message from John', time: '2m ago' },
  { id: '2', title: 'Update Available', description: 'A new update is available for the app', time: '1h ago' },
  { id: '3', title: 'Reminder', description: 'Don’t forget your meeting at 3 PM', time: '3h ago' },
  { id: '4', title: 'Welcome!', description: 'Thanks for joining our app!', time: '1d ago' },
];

export default function Notifications() {
  const renderItem = ({ item }: { item: typeof mockNotifications[0] }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
  notificationCard: {
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
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});