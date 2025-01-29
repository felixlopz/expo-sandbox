import { Image, StyleSheet, Platform, SafeAreaView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Dropdown from "@/components/Dropdown";
import FloatingInput from "@/components/FloatingInput";
import { useState } from "react";

export default function HomeScreen() {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1, backgroundColor: "pink" }}>
        <ThemedText>Hello</ThemedText>
        <Dropdown
          data={[
            { value: "🐈", label: "🐈 Gato" },
            { value: "🦮", label: "🦮 Perro" },
            { value: "🐍", label: "🐍 Serpiente" },
            { value: "🐘", label: "🐘 Elefante" },
            { value: "🦒", label: "🦒 Jirafa" },
            { value: "🐧", label: "🐧 Pingüino" },
            { value: "🦁", label: "🦁 León" },
            { value: "🐼", label: "🐼 Panda" },
            { value: "🦊", label: "🦊 Zorro" },
            { value: "🐇", label: "🐇 Conejo" },
            { value: "🦄", label: "🦄 Unicornio" },
            { value: "🐢", label: "🐢 Tortuga" },
            { value: "🦉", label: "🦉 Búho" },
            { value: "🐬", label: "🐬 Delfín" },
            { value: "🦋", label: "🦋 Mariposa" },
          ]}
          onChange={(item) => {
            console.log(item);
          }}
          placeholder="Select pet"
        />
        <FloatingInput
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
          error={undefined}
          placeholder="Name"
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
