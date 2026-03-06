import * as SecureStore from "expo-secure-store";

const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

const getValueFor = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  return result;
};

const deleteValue = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

export { save, getValueFor, deleteValue };
