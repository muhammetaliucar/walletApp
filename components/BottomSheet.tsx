import {
  StyleSheet,
  View,
  Keyboard,
  Pressable,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useState,
  ReactNode,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Portal } from "@gorhom/portal";

const MAX_TRANSLATE_Y = -Dimensions.get("window").height;
const SCREEN_HEIGHT = Dimensions.get("window").height;

interface Props {
  children: ReactNode;
  top: number;
}

const BottomSheet = forwardRef(({ children, top = 100 }: Props, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const [showPortal, setShowPortal] = useState<boolean>(false);

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    active.value = destination !== 0;

    if (destination === 0) {
      setTimeout(() => {
        setShowPortal(false);
      }, 300); //for animation
      Keyboard.dismiss(); //for keyboard
    } else {
      setShowPortal(true);
    }

    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .runOnJS(true) // because gesture is causing problems.
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = translateY.value = Math.max(
        event.translationY + context.value.y,
        MAX_TRANSLATE_Y
      ); // ilk update attığında konumlandırdığı yer.
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 1.5) {
        //If you scroll the percentage of the screen, it will go down.

        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 2.9) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <>
      {showPortal && (
        // to make the background black
        <Portal>
          <Pressable
            onPress={() => scrollTo(0)}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              zIndex: 1,
              left: 0,
              backgroundColor: "black",
              opacity: 0.6,
            }}
          />
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top,
              zIndex: 2,
              left: 0,
              bottom: 150,
            }}
          >
            <GestureDetector gesture={gesture}>
              <Animated.View
                style={[styles.bottomSheetContainer, rBottomSheetStyle]}
              >
                <View style={styles.line} />
                {children}
              </Animated.View>
            </GestureDetector>
          </View>
        </Portal>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 100,
  },
});

export default BottomSheet;
