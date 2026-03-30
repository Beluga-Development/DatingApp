import { Text, View } from "react-native";
import { useState, useEffect, Paper, CardContent } from "react";
import * as api from "../../util/api.js";


const getMatchData = async (id) => {
    try {
      let result = await api.data.getMatchData(id);
      console.log(JSON.stringify(result));
      console.log(result);
      return result.map(match => match.user2_profile);
    } catch (error) {
      console.log(`Request failed: ${error.message}`);
      return [];
    }
  };

 



export default function MatchesScreen() {

const [matches, setMatches] = useState([]);

useEffect(() => {
    const loadMatches = async () => {
      let result = await getMatchData(3);
      console.log(typeof result, JSON.stringify(result));
      setMatches(result);
    }
    loadMatches();
  }, []);



  return (
   
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text></Text>
      {matches.map((match) => (
  <View key={match.id} style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
    <Text style={{ fontWeight: 'bold' }}>{`${match.FirstName} ${match.LastName}`}</Text>
    {match.Gender && <Text>{match.Gender}</Text>}
    {match.DateOfBirth && <Text>{match.DateOfBirth}</Text>}
    {match.Occupation && <Text>{match.Occupation}</Text>}
    {match.Sexuality && <Text>{match.Sexuality}</Text>}
  </View>
))}
    </View>
  );
}
