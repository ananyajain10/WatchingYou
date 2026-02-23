import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTimerContext } from "../context/TimerContext";

const CalendarScreen = ({ navigation }) => {
  const { timers } = useTimerContext();

  /*
    MARK DATES THAT HAVE TIMERS
    We create an object like:
    {
      "2026-02-23": { marked: true, dotColor: "blue" }
    }
  */
  const markedDates = useMemo(() => {
    const marks = {};

    timers.forEach(timer => {
      if (!marks[timer.date]) {
        marks[timer.date] = {
          marked: true,
          dotColor: "blue",
        };
      }
    });

    return marks;
  }, [timers]);

  const handleDayPress = (day) => {
    navigation.navigate("DayScreen", {
      date: day.dateString,
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});