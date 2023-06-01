import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'


interface Props {
    item: any,
    animatedValue: any
}


const Card = ({item,animatedValue}:Props) => {

  const transformStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };


    return (
        <Animated.View
        style={[transformStyle,{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          margin:10,
          borderRadius:10,
          borderColor:"gray",
          backgroundColor:item.type === "Revenue" ? "#00bbf2" : "#F5B7B1",
          elevation:5,
          shadowColor:"gray",
          shadowOffset:{width:0,height:2},
          shadowOpacity:0.5,
          shadowRadius:5,
          width:Dimensions.get("window").width*0.9
        }]}
          
        >
          <Text style={{ fontSize: 20,color:"white" }}>{item.type}</Text>
          <View style={{flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
        }}>
          <Text style={{ fontSize: 20,color:"white" }}>{item.total}</Text>
          <Text style={{ fontSize: 20,color:"white" }}> ₺</Text>
          </View>
        </Animated.View>
      );
}

export default Card

const styles = StyleSheet.create({})