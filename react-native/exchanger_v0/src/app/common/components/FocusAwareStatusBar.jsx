import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "react-native";

export default function FocusAwareStatusBar(props) {
    const isFoucesed = useIsFocused();

    return isFoucesed ? <StatusBar {...props} /> : null;
}