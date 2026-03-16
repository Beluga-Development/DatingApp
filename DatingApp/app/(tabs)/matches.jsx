import { Text, View } from "react-native";

const Matches = ({matches}) => {

if(!matches)
  return(<>
  </>)


const items = []; // will push matches into a match array, 
// TODO set data
  for (const match of matches) {
    items.push(
        <Paper elevation={4} sx={{ marginTop: "0.5em" }}>
      <CardContent key={match.id}>
      </CardContent>
      </Paper>
    );
  }




  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Matches</Text>
      
    </View>
  );

}

export default Matches;
