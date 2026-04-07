import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as api from "../../util/api.js";
import Button from "../../components/Button";

export default function MatchesScreen() {
  const [matches, setMatches] = useState([]);

  const getMatchData = async () => {
    try {
      let result = await api.data.getMatchData();
      return result;
    } catch (error) {
      console.log(`Request failed: ${error.message}`);
      return [];
    }
  };

  useEffect(() => {
    const loadMatches = async () => {
      let result = await getMatchData();
      setMatches(result);
      //console.log(result[0].profile_data.contact);
      //console.log(result[0].profile_data.user_interest);
    };
    loadMatches();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Ranked Matches</Text>
      <Button text="get matches" onPress={getMatchData} />
      {matches &&
        matches.map((match, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 10,
              padding: 10,
              borderWidth: 2,
              borderColor: "#ccc",
              borderRadius: 20,
            }}
          >
            <View>
              <Button id="profileButton">
                <img src="" />
              </Button>
            </View>
            <View id="userInfo">
              <Text
                style={{ fontWeight: "bold" }}
              >{`${match.profile_data.FirstName}\n${match.match_score}`}</Text>
            </View>
            <View>
              <Button text="Contact"></Button>
            </View>
          </View>
        ))}
    </View>
  );
}
