import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Icon } from "@/constants/Icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.grey.light1,
        tabBarStyle: { height: "20%" },
        tabBarActiveTintColor: Colors.blue.grey,
        tabBarInactiveTintColor: Colors.grey.dark2,
        tabBarIconStyle: { fontSize: 28 },
        tabBarLabelStyle: Fonts.paragraph.p10,
        // tabBarInactiveBackgroundColor: Colors.
        // tabBarBackground: () => null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon tintColor={color} size={size} icon="Dashboard" />
          ),
          tabBarLabel: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon tintColor={color} size={size} icon="Chat" />
          ),
          tabBarLabel: "My Group",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon tintColor={color} size={size} icon="Profile" />
          ),
          tabBarLabel: "My Profile",
        }}
      />
    </Tabs>
  );
}
