import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { BlurView } from 'expo-blur';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface CreateOption {
  id: string;
  title: string;
  icon: IconName;
  color: string;
}

const createOptions: CreateOption[] = [
  { 
    id: '1', 
    title: 'New Post', 
    icon: 'create-outline',
    color: '#32d296'
  },
  { 
    id: '2', 
    title: 'New Quote', 
    icon: 'chatbubble-outline',
    color: '#6C5CE7'
  },
  { 
    id: '3', 
    title: 'New Photo', 
    icon: 'camera-outline',
    color: '#FF7675'
  },
  { 
    id: '4', 
    title: 'New Poll', 
    icon: 'bar-chart-outline',
    color: '#FDCB6E'
  },
  { 
    id: '5', 
    title: 'New Story', 
    icon: 'book-outline',
    color: '#00B894'
  },
];

const { width, height } = Dimensions.get('window');
const CIRCLE_RADIUS = width * 0.3; // Slightly larger radius for better spacing

export default function TabLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1;
        
        Animated.timing(animation, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setIsOpen(!isOpen);
    };

    const renderOption = (option: CreateOption, index: number) => {
        const angle = (2 * Math.PI * index) / createOptions.length;
        const x = CIRCLE_RADIUS * Math.cos(angle - Math.PI / 2);
        const y = CIRCLE_RADIUS * Math.sin(angle - Math.PI / 2);

        const optionStyle = {
            opacity: animation,
            transform: [
                {
                    translateX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, x],
                    }),
                },
                {
                    translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, y],
                    }),
                },
                {
                    scale: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                    }),
                },
            ],
        };

        return (
            <Animated.View key={option.id} style={[styles.optionButton, optionStyle]}>
                <TouchableOpacity
                    style={[styles.optionTouchable, { backgroundColor: option.color }]}
                    onPress={() => {
                        toggleMenu();
                        // Handle option press
                        console.log(`Selected: ${option.title}`);
                    }}
                >
                    <Ionicons name={option.icon} size={24} color="#fff" />
                </TouchableOpacity>
                <Animated.Text
                    style={[
                        styles.optionLabel,
                        {
                            opacity: animation,
                        },
                    ]}
                >
                    {option.title}
                </Animated.Text>
            </Animated.View>
        );
    };

    return (
        <>
            {isOpen && (
                <>
                    <Animated.View 
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                opacity: animation,
                                zIndex: 1,
                            },
                        ]} 
                    >
                        <BlurView
                            intensity={80}
                            tint="dark"
                            style={[
                                StyleSheet.absoluteFill,
                                { backgroundColor: 'rgba(0,0,0,0.5)' }
                            ]}
                        />
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={toggleMenu}
                            style={StyleSheet.absoluteFill}
                        />
                    </Animated.View>
                    
                    <View style={styles.menuContainer}>
                        {createOptions.map((option, index) => renderOption(option, index))}
                    </View>
                </>
            )}

            <Tabs 
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.grey,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        height: 60,
                        paddingBottom: 10,
                        paddingTop: 10,
                    },
                }}
            >
                <Tabs.Screen 
                    name="index" 
                    options={{ 
                        tabBarIcon: ({size,color}) => <Ionicons name='home' size={size} color={color} />
                    }} 
                />
                <Tabs.Screen 
                    name="bookmarks" 
                    options={{ 
                        tabBarIcon: ({size,color}) => <Ionicons name='bookmark' size={size} color={color} />
                    }} 
                />
                <Tabs.Screen 
                    name="create" 
                    options={{
                        tabBarButton: (props) => (
                            <TouchableOpacity
                                style={styles.createTab}
                                onPress={toggleMenu}
                            >
                                <Animated.View
                                    style={{
                                        transform: [{
                                            rotate: animation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '45deg'],
                                            }),
                                        }],
                                    }}
                                >
                                    <Ionicons 
                                        name="add-circle" 
                                        size={32} 
                                        color={isOpen ? '#FF6B6B' : COLORS.primary} 
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="notifications" 
                    options={{ 
                        tabBarIcon: ({size,color}) => <Ionicons name='notifications' size={size} color={color} />
                    }} 
                />
                <Tabs.Screen 
                    name="profile" 
                    options={{ 
                        tabBarIcon: ({size,color}) => <Ionicons name='person-circle' size={size} color={color} />
                    }} 
                />
            </Tabs>
        </>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        width: 0,
        height: 0,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionButton: {
        position: 'absolute',
        alignItems: 'center',
        marginLeft: -24,
        marginTop: -24,
    },
    optionTouchable: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    optionLabel: {
        color: '#fff',
        marginTop: 8,
        fontSize: 12,
        fontFamily: "Sunset-Serial-Medium",
        backgroundColor: '#3d3d45',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        width: 'auto',
        textAlign: 'center',
    },
    createTab: {
        width: 64,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});