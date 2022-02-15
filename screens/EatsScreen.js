import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";

const EatsScreen = () => {
  return (
    <SafeAreaView style={tw`items-center`}>
      <Text style={tw`text-xl font-bold`}>EatsScreen</Text>
      <Text>Place holder</Text>
      <Text>A screen to order food</Text>
    </SafeAreaView>
  );
};

export default EatsScreen;

const styles = StyleSheet.create({});
