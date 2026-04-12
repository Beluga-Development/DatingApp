import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import { SessionContext } from "../../util/session";
import { TabBar } from "../../components/TabBar";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
export default function TabsLayout(props) {
  const { isLoggedIn } = useContext(SessionContext);

  useFocusEffect(
  useCallback(() => {
    const loadMatches = async () => {
      try {
        let result = await api.data.getMatchData();
        setMatches(result ?? []);
      } catch (error) {
        console.log(`Request failed: ${error.message}`);
      }
    };
    loadMatches();
  }, [])
);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="matches"
        options={{ title: "Matches", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
}
