import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import { SessionContext } from "../../util/session";
import { TabBar } from "../../components/TabBar";

export default function TabsLayout() {
  const { isLoggedIn } = useContext(SessionContext);
  const { isProfileComplete } = useContext(SessionContext);
  const { profileData } = useContext(SessionContext);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  if (!isProfileComplete) {
    return <Redirect href="/profile_creation" />;
  }

  return (
    <Tabs tabBar={(props) => <TabBar {...props} profileData={profileData} />}>
      <Tabs.Screen
        name="index"
        options={{ title: "Matches", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
      <Tabs.Screen
        name="statistics"
        options={{ title: "Stats", headerShown: false }}
      />
    </Tabs>
  );
}
