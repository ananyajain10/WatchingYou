import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTimerContext } from "../context/TimerContext";
import TimerCard from "../components/TimerCard";
import DailySummary from "../components/DailySummary";
import { isToday } from "../utils/dateUtils";

const DayScreen = ({ route }) => {
  const { date } = route.params;

  const {
    getTimersByDate,
    addTimer,
    startTimer,
    stopTimer,
    activeTimerId,
    updateTimerNotes
  } = useTimerContext();

  const [taskName, setTaskName] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const timers = useMemo(() => getTimersByDate(date), [
    date,
    getTimersByDate,
  ]);

  const canEdit = isToday(date);

  const handleAddTimer = () => {
    if (!taskName.trim()) return;
    addTimer(date, taskName.trim());
    setTaskName("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={timers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TimerCard
            timer={item}
            isActive={activeTimerId === item.id}
            onStart={() => canEdit && startTimer(item.id)}
            onStop={() => canEdit && stopTimer(item.id)}
            onUpdateNotes={updateTimerNotes}
            disabled={!canEdit}
    />
          )}
        ListHeaderComponent={
        <View>
            <Text style={styles.header}>Date: {date}</Text>

            {!canEdit && (
            <Text style={styles.readOnlyText}>
                This day is read-only.
            </Text>
            )}

            {canEdit && (
            <View style={styles.inputRow}>
                <TextInput
                placeholder="Enter task name"
                value={taskName}
                onChangeText={setTaskName}
                style={styles.input}
                />
                <Button title="Add" onPress={handleAddTimer} />
            </View>
            )}
        </View>
}
        ListFooterComponent={
            <Pressable
                style={styles.summaryButton}
                onPress={() => setShowSummary(true)}
            >
                <Text style={styles.summaryButtonText}>
                View Daily Summary
                </Text>
            </Pressable>
            }

          
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
        <DailySummary
  visible={showSummary}
  onClose={() => setShowSummary(false)}
  timers={timers}
  date={date}
/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DayScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboard: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 60,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  summaryButton: {
  marginTop: 20,
  paddingVertical: 12,
  borderRadius: 12,
  backgroundColor: "#111",
  alignItems: "center",
},
summaryButtonText: {
  color: "#fff",
  fontWeight: "600",
},
readOnlyText: {
  color: "white",
  marginBottom: 12,
  fontWeight: "500",
},
});