import colors from "@/src/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
type BotonAccionesProps = {
  text: string;
  onPress?: () => void;
};

function BotonAcciones({ text, onPress }: BotonAccionesProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Feather name="settings" size={14} color="white" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purpura,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderTopColor: colors.purpuraClaro,
    borderBottomColor: colors.purpuraOscuro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 10,
    color: "white",
    fontFamily: "PixelFont",
  },
});

export { BotonAcciones };

