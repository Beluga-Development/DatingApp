import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import { SessionContext } from "../../util/session";
import { TabBar } from "../../components/TabBar";
export default function TabsLayout(props) {
  const { isLoggedIn } = useContext(SessionContext);
  const { isProfileComplete } = useContext(SessionContext);
  
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  else if(!isProfileComplete){
    return <Redirect href="/profile_creation" />;
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
