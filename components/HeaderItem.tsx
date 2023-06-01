import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface Props {
    name: string,
    value?: string,
    setValue: (value:string) => void
}

const HeaderItem = ({name,value,setValue}:Props) => {
   
  return (
    <TouchableOpacity 
    activeOpacity={0.5}
    onPress={() => {
        setValue(name)
    }
    }
    style={value===name ? 
        styles.selectedContainer : styles.container
    }>
      <Text style={value === name ? styles.selectedText : styles.text
    }>{name}</Text>
    </TouchableOpacity>
  )
}

export default HeaderItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 10,
    },
    selectedContainer: {
        padding: 10,
        backgroundColor: "#7675A1",
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 10,
    },
    selectedText:{
        color: "#fff"
    },
    text: {
        color: "#000"
    },
})