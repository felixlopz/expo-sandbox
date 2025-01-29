import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type OptionItem = {
  value: string | number;
  label: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
}

export default function Dropdown({
  data,
  onChange,
  placeholder,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const [value, setValue] = useState("");

  const buttonRef = useRef<View>(null);

  const onSelect = useCallback(
    (item: OptionItem) => {
      onChange(item);
      setValue(item.label);
      setExpanded(false);
    },
    [onChange, setValue, setExpanded]
  );
  return (
    <View style={styles.container} ref={buttonRef}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
          <View style={[styles.options]}>
            <FlatList
              keyExtractor={(item) => item.value.toString()}
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.optionItem}
                  onPress={() => onSelect(item)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  optionItem: {
    height: 50,
    justifyContent: "center",
  },
  separator: {
    height: 4,
  },
  options: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 6,
    position: "absolute",
    zIndex: 1,
    top: 54,
    maxHeight: 250,
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});
