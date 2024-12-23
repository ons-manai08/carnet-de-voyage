import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from './screens/supabase'; // Importer votre client Supabase
import { ActivityIndicator, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CreateSouvenirScreen from './screens/CreateSouvenirScreen';
import SouvenirsListScreen from './screens/SouvenirsListScreen';
import DetailSouvenirScreen from './screens/DetailSouvenirScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditSouvenirScreen from './screens/EditSouvenirScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // État de la connexion
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
          setIsLoggedIn(false);
        } else {
          console.log("User login or not:", data.user);
          setIsLoggedIn(!!data.user);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change event:", event);
      setIsLoggedIn(!!session?.user);
    });

    // Unsubscribe lorsque le composant est démonté
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  console.log("islogged", isLoggedIn);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "HomeScreen" : "Welcome"}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        {!isLoggedIn ? (
          <>
            {/* Écrans pour les utilisateurs non connectés */}
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            {/* Écrans pour les utilisateurs connectés */}
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CreateSouvenir" component={CreateSouvenirScreen} />
            <Stack.Screen name="SouvenirsListScreen" component={SouvenirsListScreen} />
            <Stack.Screen name="DetailSouvenir" component={DetailSouvenirScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="EditSouvenir" component={EditSouvenirScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
