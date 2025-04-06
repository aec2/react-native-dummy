import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

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
const CIRCLE_RADIUS = width * 0.3; // Radius of the circle where buttons will be placed

export default function Create() {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.parallel([
      Animated.timing(animation, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setIsOpen(!isOpen);
  };

  const renderOption = (option: CreateOption, index: number) => {
    const angle = (2 * Math.PI * index) / createOptions.length;
    const x = CIRCLE_RADIUS * Math.cos(angle - Math.PI / 2);
    const y = CIRCLE_RADIUS * Math.sin(angle - Math.PI / 2);

    const optionStyle = {
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
              transform: [{ scale: animation }],
            },
          ]}
        >
          {option.title}
        </Animated.Text>
      </Animated.View>
    );
  };

  const overlayStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.7],
    }),
  };

  return (
    <View style={styles.container}>
      {isOpen && (
        <Animated.View style={[styles.overlay, overlayStyle]} />
      )}
      
      <View style={styles.menuContainer}>
        {createOptions.map((option, index) => renderOption(option, index))}
        
        <TouchableOpacity
          style={[styles.mainButton, isOpen && styles.mainButtonActive]}
          onPress={toggleMenu}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                  }),
                },
              ],
            }}
          >
            <Ionicons name="add" size={32} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292933',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#32d296',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 100,
  },
  mainButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  optionButton: {
    position: 'absolute',
    alignItems: 'center',
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
  },
});