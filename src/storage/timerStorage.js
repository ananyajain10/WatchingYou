import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "TIMERS_STORAGE";

export const saveTimers = async (timers) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error("Error saving timers:", error);
  }
};

export const loadTimers = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading timers:", error);
    return [];
  }
};