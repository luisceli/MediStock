import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Card = ({ title, imageSource, description, style, onCardPress }) => {
  return (
    <TouchableOpacity onPress={onCardPress} style={[styles.container, style]}>
      <View>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "40%",
    marginBottom: "8%",
    borderRadius: 13,
    padding: 16,
    backgroundColor: "#F5F8FD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
  card: {
    backgroundColor: "#F5F8FD",
    marginBottom: 20,
  },
});

export default Card;
