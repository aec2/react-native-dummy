import { Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [count, setCount] = useState(0);
  const [counterName, setCounterName] = useState("Unnamed Counter");
  const [isEditing, setIsEditing] = useState(false);
  
  const handleNameSave = () => {
    setIsEditing(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
          style={styles.resetButton} 
          onPress={() => setCount(0)}
        >
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
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
          onPress={() => setCount(count + 1)}
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
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Sunset-Serial-Medium",
  },
  resetButton: {
    position: "absolute",
    right: 20,
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
    marginBottom: 60, // Add bottom margin to avoid overlap with tab bar
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
});