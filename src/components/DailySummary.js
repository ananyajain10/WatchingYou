import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { calculateDaySummary, formatDuration } from "../utils/timeUtils";

const DailySummary = ({ visible, onClose, timers, date }) => {
  const { summary, total } = useMemo(
    () => calculateDaySummary(timers),
    [timers]
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>
              Productivity Report
            </Text>

            <Text style={styles.date}>{date}</Text>

            <View style={styles.divider} />

            {summary.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.taskName}>
                  {item.name}
                </Text>
                <Text style={styles.duration}>
                  {formatDuration(item.duration)}
                </Text>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalLabel}>
                Total Focus Time
              </Text>
              <Text style={styles.totalTime}>
                {formatDuration(total)}
              </Text>
            </View>

            <Text style={styles.footer}>
              #TimeTracked
            </Text>
          </ScrollView>

          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DailySummary;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    maxHeight: "85%",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  date: {
    textAlign: "center",
    marginTop: 4,
    color: "#666",
  },

  divider: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  taskName: {
    fontSize: 16,
  },

  duration: {
    fontSize: 16,
    fontWeight: "600",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
  },

  totalTime: {
    fontSize: 20,
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },

  closeBtn: {
    marginTop: 16,
    paddingVertical: 10,
    backgroundColor: "#111",
    borderRadius: 12,
    alignItems: "center",
  },

  closeText: {
    color: "#fff",
    fontWeight: "600",
  },
});