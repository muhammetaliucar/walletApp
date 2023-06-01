import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderItem from './HeaderItem'

interface Props {
    modalHeaderSelected:string,
    setModalHeaderSelected:(e:string)=>void
}

const Header = ({
    modalHeaderSelected,
    setModalHeaderSelected
}:Props) => {
  return (
    <View
    style={{
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    }}
  >
    <HeaderItem
      value={modalHeaderSelected}
      setValue={setModalHeaderSelected}
      name={"Revenue"}
    />
    <HeaderItem
      value={modalHeaderSelected}
      setValue={setModalHeaderSelected}
      name={"Expense"}
    />
  </View>
  )
}

export default Header

const styles = StyleSheet.create({})