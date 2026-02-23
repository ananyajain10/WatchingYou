import React, {memo} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import useTimer from "../hooks/useTimer";

const TimerCard = ({ timer, onStart, onStop, isActive, disabled }) => {
  const formattedTime = useTimer(timer);

  return (
    <View
      style={[
        styles.card,
        timer.isRunning && styles.activeCard,
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.name}>{timer.name}</Text>
        {timer.isRunning && (
          <View style={styles.runningIndicator} />
        )}
      </View>

      <Text style={styles.time}>{formattedTime}</Text>

      <Pressable
        style={[
            styles.button,
            timer.isRunning ? styles.stopButton : styles.startButton,
            (isActive && !timer.isRunning) || disabled
            ? styles.disabledButton
            : null,
        ]}
        onPress={timer.isRunning ? onStop : onStart}
        disabled={(isActive && !timer.isRunning) || disabled}
        >
        <Text style={styles.buttonText}>
          {timer.isRunning ? "STOP" : "START"}
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(TimerCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  activeCard: {
    borderWidth: 2,
    borderColor: "#4CAF50",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
  },

  runningIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },

  time: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 14,
    letterSpacing: 1,
  },

  button: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  startButton: {
    backgroundColor: "#2196F3",
  },

  stopButton: {
    backgroundColor: "#F44336",
  },

  disabledButton: {
    backgroundColor: "#B0BEC5",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});