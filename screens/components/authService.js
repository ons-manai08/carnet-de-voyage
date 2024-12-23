import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { supabase } from '../components/supabase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) console.log(error);
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password"    secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign In" onPress={handleSignIn}    />
    </View>
  );
};

export default Auth;
