import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'

interface AppTextProps extends TextProps {
  children: React.ReactNode
}

export default function AppText({ children, style, ...props }: AppTextProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins_Regular',
    fontSize: 16,
    color: '#333',
  },
})
