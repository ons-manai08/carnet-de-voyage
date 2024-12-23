import React, { useState } from 'react';
import { View, TextInput, Button, Text,StyleSheet ,TouchableOpacity } from 'react-native';
import { supabase } from '../screens/supabase'; // Assurez-vous que votre client Supabase est correctement importé
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Tentative de connexion avec email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erreur de connexion:', error.message);
        setErrorMessage(error.message);
      } else {
        console.log('Utilisateur connecté:', data.user);
        if (data.user?.email_confirmed_at) {
          console.log('Email confirmé');
          navigation.navigate('HomeScreen');  
        } else {
          console.log("L'email n'a pas encore été vérifié");
          setErrorMessage('Veuillez vérifier votre email avant de vous connecter.');
          setInfoMessage('Un email de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.');
        }
      }
    } catch (err) {
      console.error('Erreur lors de la connexion:', err.message);
      setErrorMessage(err.message);
    }
  };

  const resendConfirmationEmail = async () => {
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) {
        console.error("Erreur lors de l'envoi de l'email de confirmation:", error.message);
        setErrorMessage(error.message);
      } else {
        setInfoMessage("L'email de confirmation a été renvoyé. Vérifiez votre boîte de réception.");
      }
    } catch (err) {
      console.error("Erreur de renvoi de l'email de confirmation:", err.message);
      setErrorMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Mot de passe"
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {infoMessage ? <Text style={styles.infoText}>{infoMessage}</Text> : null}
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={resendConfirmationEmail}>
        <Text style={styles.linkText}>Renvoyer l'email de confirmation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f8fc',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});


export default LoginScreen;
