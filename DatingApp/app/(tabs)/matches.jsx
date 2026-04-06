import { useEffect } from "react";
import { Text, View } from "react-native";
import * as api from "../../util/api.js";

export default function MatchesScreen() {
  useEffect(() => {
    const getPaidMembers = async () => {
      try {
        let result = await api.data.getPaidMembers();
        console.log("Paid members count", result);
      } catch (err) {
        console.error(err);
      }
    };
    const getNonPaidMembers = async () => {
      try {
        let result = await api.data.getNonPaidMembers();
        console.log("Paid members count", result);
      } catch (err) {
        console.error(err);
      }
    };
    getPaidMembers();
    getNonPaidMembers();
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Matches</Text>
    </View>
  );
}
