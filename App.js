import axios from "axios";
import { MaterialIcons } from "expo-vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Checkbox,
  TextInput,
  Text,
  Divider,
  FAB,
  Card,
} from "react-native-paper";

const initialTodos = [
  { id: 3, text: "Do homework", completed: false },
  { id: 2, text: "Clean the house", completed: false },
  { id: 1, text: "Buy groceries", completed: false },
];

const API_BASE_URL = "http://localhost:8080/api/todos"

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [inputValue, setInputValue] = useState("");

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const todoRef = useRef(null);

  const saveTodo = async () => {

    let todo = {
        content: inputValue,
        completed: false
    }
    await axios.post(`${API_BASE_URL}/todos`, todo)
        .then((res) => {
            let data = res.data
            setTodos([...todos, data])
        })
        .catch((err) => {
            console.log("Err saving todo", err)
        });

  }

  const getTodos = async () => {

    await axios.get(`${API_BASE_URL}/todos`)
        .then((res) => {
            let data = res.data
            setTodos(data)
        })
        .catch((err) => {
            console.log("Err getting todos", err)
        });

  }

  const addTodo = () => {
    todoRef.current.focus();
    if (inputValue.trim()) {
      saveTodo()
      setInputValue("");
    }
  };

  useEffect(() => {
   getTodos()
}, []);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>tOdOs</Text>

      <TextInput
        label="Add something new"
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.input}
        ref={todoRef}
      />

      <ScrollView>
        {!!todos.length &&
          todos.map((todo) => (
            <View key={todo.id}>
              <Card style={styles.card}>
                <View style={styles.todo}>
                  <Checkbox
                    status={todo.completed ? "checked" : "unchecked"}
                    onPress={() => toggleCompleted(todo.id)}
                  />
                  <Text style={todo.completed ? styles.done : styles.text}>
                    {todo.text}
                  </Text>
                </View>
              </Card>
              <Divider />
            </View>
          ))}
      </ScrollView>

      <FAB
        icon={() => <MaterialIcons name="add" size={24} color="white" />}
        onPress={addTodo}
        style={styles.addbtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "transparent",
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 10,
  },
  text: {
    marginLeft: 8,
    fontSize: 18,
  },
  done: {
    marginLeft: 8,
    fontSize: 18,
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  addbtn: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "purple",
  },
  delbtn: {
    position: "absolute",
    left: 16,
    bottom: 16,
    borderRadius: 50,
  },
  header: {
    fontSize: 30,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 30,
   }

});

export default App;
