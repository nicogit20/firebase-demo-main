import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
};

export default function TasksScreen() {
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList: Task[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Omit<Task, "id">;
        taskList.push({ id: docSnap.id, ...data });
      });
      setTasks(taskList);
    });

    return unsubscribe;
  }, [user]);

  const addTask = async () => {
    if (!task.trim() || !user) return;

    try {
      await addDoc(collection(db, "tasks"), {
        text: task,
        completed: false,
        uid: user.uid,
        priority,
        dueDate: dueDate ? dueDate.toISOString().split("T")[0] : "",
      });
      setTask("");
      setDueDate(null);
      setPriority("Medium");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (taskId: string, currentValue: boolean) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), {
        completed: !currentValue,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editTask = (taskItem: Task) => {
    Alert.prompt(
      "Edit Task",
      "Update your task",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          onPress: (newText?: string) => {
            if (newText && newText.trim()) {
              updateDoc(doc(db, "tasks", taskItem.id), { text: newText }).catch(console.error);
            }
          },
        },
      ],
      "plain-text",
      taskItem.text
    );
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const priorityColor = (p: string) => {
    switch (p) {
      case "High":
        return "#EF4444";
      case "Medium":
        return "#F59E0B";
      case "Low":
        return "#10B981";
      default:
        return "#9CA3AF";
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // keep open on iOS
    if (selectedDate) setDueDate(selectedDate);
  };

  const formattedDate = dueDate ? dueDate.toISOString().split("T")[0] : "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter a new task"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Priority & Date */}
      <View style={styles.metaRow}>
        {["High", "Medium", "Low"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.priorityButton, { backgroundColor: priority === p ? priorityColor(p) : "#E5E7EB" }]}
            onPress={() => setPriority(p as "High" | "Medium" | "Low")}
          >
            <Text style={{ color: priority === p ? "#fff" : "#374151" }}>{p}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.dueButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: dueDate ? "#111827" : "#9CA3AF" }}>
            {dueDate ? formattedDate : "Select Due Date"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="date"
            display="calendar"
            onChange={onChangeDate}
          />
        )}
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <TouchableOpacity onPress={() => toggleTask(item.id, item.completed)}>
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? "#10B981" : "#9CA3AF"}
              />
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text
                style={[styles.taskText, { textDecorationLine: item.completed ? "line-through" : "none" }]}
              >
                {item.text}
              </Text>
              <View style={styles.metaInfo}>
                <Text style={{ color: priorityColor(item.priority), fontWeight: "600" }}>
                  {item.priority} Priority
                </Text>
                {item.dueDate ? <Text>Due: {item.dueDate}</Text> : null}
              </View>
            </View>

            <TouchableOpacity onPress={() => editTask(item)}>
              <Ionicons name="create-outline" size={20} color="#007AFF" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#FF3B30" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#111827" },
  inputRow: { flexDirection: "row", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 12, padding: 12, backgroundColor: "#fff" },
  addButton: { backgroundColor: "#007AFF", padding: 12, marginLeft: 10, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, flexWrap: "wrap" },
  priorityButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginRight: 10, marginBottom: 10 },
  dueButton: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  taskCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  taskText: { fontSize: 16, color: "#374151", fontWeight: "500" },
  metaInfo: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
});
