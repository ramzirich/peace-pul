import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

export const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor, disabled}) => {
  const containerStyles = [
    styles.container,
    styles[`container_${type}`],
    bgColor ? { backgroundColor: bgColor } : {},
    disabled ? styles.containerDisabled : {}, // Add a style for disabled state
  ];

  const textStyles = [
    styles.text,
    styles[`text_${type}`],
    fgColor ? { color: fgColor } : {},
    disabled ? styles.textDisabled : {}, // Add a style for disabled state
  ];
  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={containerStyles}
      disabled={disabled}
    >
      <Text
        style={textStyles}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  containerDisabled: {
    opacity: 0.7, 
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },

  textDisabled: {
    color: 'lightgray',
  },
});