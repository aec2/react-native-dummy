import { Text, TouchableOpacity, View, StyleSheet, TextInput, Modal, Vibration } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const [counterName, setCounterName] = useState("Unnamed Counter");
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [counterLimit, setCounterLimit] = useState("");

  const handleNameSave = () => {
    setIsEditing(false);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    if (counterLimit && newCount === parseInt(counterLimit, 10)) {
      Vibration.vibrate(500); // Vibrate for 500ms
    }
  };

  const handleReset = () => {
    setCount(0);
    setIsMenuVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {isEditing ? (
          <TextInput
            style={styles.nameInput}
            value={counterName}
            onChangeText={setCounterName}
            onBlur={handleNameSave}
            autoFocus
            onSubmitEditing={handleNameSave}
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.title}>{counterName}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setIsMenuVisible(true)}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>
            
            <View style={styles.optionItem}>
              <Text style={styles.optionLabel}>Counter Limit:</Text>
              <TextInput
                style={styles.limitInput}
                value={counterLimit}
                onChangeText={setCounterLimit}
                keyboardType="numeric"
                placeholder="Set limit"
                placeholderTextColor="#666"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handleReset}
            >
              <Text style={styles.optionButtonText}>Reset Counter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionButton, styles.closeButton]}
              onPress={() => setIsMenuVisible(false)}
            >
              <Text style={styles.optionButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleIncrement}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Sunset-Serial-Medium",
  },
  menuButton: {
    position: "absolute",
    right: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#292933",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    borderWidth: 1,
    borderColor: "#3d3d45",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Sunset-Serial-Medium",
  },
  optionItem: {
    marginBottom: 20,
  },
  optionLabel: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
  },
  limitInput: {
    backgroundColor: "#3d3d45",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  optionButton: {
    backgroundColor: "#3d3d45",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#32d296",
  },
  optionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Sunset-Serial-Medium",
  },
  counterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 200,
    color: "#32d296",
    fontWeight: "300",
  },
  buttonContainer: {
    flexDirection: "row",
    height: 120,
    marginBottom: 60,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#3d3d45",
  },
  buttonText: {
    fontSize: 40,
    color: "#fff",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#3d3d45",
  },
  nameInput: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
    borderBottomWidth: 1,
    borderBottomColor: "#32d296",
    paddingBottom: 2,
    minWidth: 150,
    fontFamily: "Sunset-Serial-Medium"
  },
}); 