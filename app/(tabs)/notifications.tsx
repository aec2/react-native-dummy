import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type NotificationType = 'message' | 'update' | 'reminder' | 'system';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { 
    id: '1', 
    title: 'New Message', 
    description: 'You have a new message from John',
    time: '2m ago',
    type: 'message',
    read: false
  },
  { 
    id: '2', 
    title: 'Update Available', 
    description: 'A new update is available for the app',
    time: '1h ago',
    type: 'update',
    read: false
  },
  { 
    id: '3', 
    title: 'Reminder', 
    description: 'Dont forget your meeting at 3 PM',
    time: '3h ago',
    type: 'reminder',
    read: true
  },
  { 
    id: '4', 
    title: 'Welcome!', 
    description: 'Thanks for joining our app!',
    time: '1d ago',
    type: 'system',
    read: true
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'message':
      return 'chatbox-outline';
    case 'update':
      return 'refresh-circle-outline';
    case 'reminder':
      return 'alarm-outline';
    case 'system':
      return 'information-circle-outline';
    default:
      return 'notifications-outline';
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationCard,
        item.read && styles.notificationCardRead
      ]}
      onPress={() => {
        setNotifications(prev =>
          prev.map(n => n.id === item.id ? { ...n, read: true } : n)
        );
      }}
    >
      <View style={styles.notificationIcon}>
        <Ionicons 
          name={getNotificationIcon(item.type)} 
          size={24} 
          color="#32d296" 
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={markAllAsRead}
          >
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: "Sunset-Serial-Medium",
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    color: '#32d296',
    fontSize: 14,
    fontFamily: "Sunset-Serial-Medium",
  },
  list: {
    paddingBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#3d3d45',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  notificationCardRead: {
    opacity: 0.7,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(50, 210, 150, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: "Sunset-Serial-Medium",
  },
  description: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginTop: 4,
    fontFamily: "Sunset-Serial-Medium",
  },
  time: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.5,
    marginTop: 8,
    fontFamily: "Sunset-Serial-Medium",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#32d296',
    position: 'absolute',
    top: 16,
    right: 16,
  },
});