import { Text, View } from "react-native";

const [page, setPage] = useState("Home");
//conditional rendering of app

export default function HomeScreen() {
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {page == "Home" && <Text>Home</Text>}
      
      {page == "Login" && <Text>Login</Text>}

      {page == "Profile" && <Text>Your Profile</Text>}

      {page == "Matches" && <Text>Your Matches</Text>}


    </View>
  );
}
