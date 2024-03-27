import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import * as Animatable from "react-native-animatable";

const Load = () => {
  const navigation = useNavigation(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Home"); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Animatable.Text animation="flipInX" style={styles.containerLogoText}>
          NotiFire
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a213a",
    paddingBottom: 80,
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogoText: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
  },
  logo: {
    width: 120,
    height: 120,
  },
});

export default Load;
