import React from 'react'
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native'

interface InputFieldProps extends TextInputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  error?: string
  style?: object // Allow custom styles
}

export default function InputField({ placeholder, value, onChangeText, secureTextEntry, error, style, ...rest }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]} // Merge default and custom styles
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...rest} // Spread additional TextInput props
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
//   input: {
//     flex: 1,
//     padding: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//   },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
})
