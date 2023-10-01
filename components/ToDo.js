
import { Text, StyleSheet, View } from "react-native";
import { Card, CheckBox } from "react-native-paper";


const ToDo = ({ todo }) => {
   
    return (
        <Card style={styles.card}>
        <View style={styles.todo}>
        <CheckBox
        status={todo.completed ? "checked" : "unchecked"}
        onPress={() => toggleCompleted(todo.id)}
        />
        <Text style={todo.completed ? styles.done : styles.text}>{todo.text}</Text>

        </View>
        </Card>
    );
  }

const styles = StyleSheet.create({
    card: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
      },
      todo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        paddingVertical: 10
        },
    });

    export default ToDo;