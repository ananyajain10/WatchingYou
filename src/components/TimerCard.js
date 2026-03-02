import React, {memo, useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput
} from "react-native";
import useTimer from "../hooks/useTimer";

const TimerCard = ({ timer, onStart, onStop, isActive, disabled, onUpdateNotes }) => {
  const formattedTime = useTimer(timer);
  const [modalVisible, setModalVisible] = useState(false);
  const [localNotes, setLocalNotes] = useState(timer.notes);

  useEffect(() => {
  setLocalNotes(timer.notes);
}, [timer.notes]);

  const handleSaveNotes = () => {
  onUpdateNotes(timer.id, localNotes);
  setModalVisible(false);
};


  return (
  <View
    style={[
      styles.card,
      timer.isRunning && styles.activeCard,
    ]}
  >
    {/* Header */}
    <View style={styles.topRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{timer.name}</Text>

        {timer.notes?.trim() ? (
          <Text
            style={styles.notesPreview}
            numberOfLines={2}
          >
            {timer.notes}
          </Text>
        ) : null}
      </View>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.notesButton}
      >
        <Text style={{ fontSize: 18 }}>
          {timer.notes?.trim() ? "📝" : "✏️"}
        </Text>
      </Pressable>
    </View>

    <Text style={styles.time}>{formattedTime}</Text>

    <Pressable
      style={[
        styles.button,
        timer.isRunning
          ? styles.stopButton
          : styles.startButton,
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

    {/* Bottom Sheet Modal */}
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />

          <Text style={styles.modalTitle}>
            Notes for {timer.name}
          </Text>

          <TextInput
            value={localNotes}
            onChangeText={setLocalNotes}
            multiline
            placeholder="Write reflections, learnings..."
            style={styles.input}
          />

          <View style={styles.modalActions}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={handleSaveNotes}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
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

  modalContainer: {
  flex: 1,
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  padding: 20,
},

modalContent: {
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 20,
},

modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
},

input: {
  minHeight: 100,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 10,
  textAlignVertical: "top",
},

saveButton: {
  marginTop: 12,
  backgroundColor: "#2196F3",
  padding: 10,
  borderRadius: 8,
  alignItems: "center",
},
notesButton: {
  padding: 6,
},

notesPreview: {
  fontSize: 13,
  color: "#666",
  marginTop: 4,
},

modalOverlay: {
  flex: 1,
  justifyContent: "flex-end",
  backgroundColor: "rgba(0,0,0,0.4)",
},

bottomSheet: {
  backgroundColor: "#fff",
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},

sheetHandle: {
  width: 40,
  height: 5,
  borderRadius: 3,
  backgroundColor: "#ccc",
  alignSelf: "center",
  marginBottom: 10,
},

modalActions: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 15,
},

cancelButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
},

cancelText: {
  color: "#888",
  fontWeight: "600",
},

saveText: {
  color: "#fff",
  fontWeight: "600",
},

saveButton: {
  backgroundColor: "#111",
  paddingVertical: 10,
  paddingHorizontal: 25,
  borderRadius: 8,
},
});