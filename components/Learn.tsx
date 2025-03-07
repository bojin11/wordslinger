import { Text, View, StyleSheet, TextInput } from "react-native";
import { useAuth } from "./contexts/username";

export default function Learn() {
  const { user, setUser } = useAuth();
  
  return (
    <View style={styles.learn}>
      <Text>Time to Learn</Text>
      <TextInput>
        
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  learn: {
    backgroundColor: "green",
  },
});
