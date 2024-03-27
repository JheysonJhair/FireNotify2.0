import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Button = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "#aaaaaa" : "#1f5187" },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.contentContainer}>
        <Icon name="fire" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical:8,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default Button;
