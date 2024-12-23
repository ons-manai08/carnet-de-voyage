import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from './supabase';  // Assurez-vous que vous importez correctement votre client Supabase

const SettingsScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fonction pour gérer la déconnexion
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigation.replace('Welcome');  // Redirige vers l'écran de login après déconnexion
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      Alert.alert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
    }
  };
  

  // Fonction pour gérer le changement de mot de passe
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const { user, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw error;
      }
      Alert.alert('Succès', 'Votre mot de passe a été mis à jour.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  // Fonction pour gérer la mise à jour de l'email
  const handleChangeEmail = async () => {
    try {
      const { user, error } = await supabase.auth.updateUser({
        email: email,
      });
      if (error) {
        throw error;
      }
      Alert.alert('Succès', 'Votre email a été mis à jour.');
      setEmail('');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paramètres</Text>

      {/* Formulaire pour changer l'email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nouvel Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nouvel email"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
          <Text style={styles.buttonText}>Mettre à jour l'email</Text>
        </TouchableOpacity>
      </View>

      {/* Formulaire pour changer le mot de passe */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nouveau Mot de Passe</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Entrez un nouveau mot de passe"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.label}>Confirmer le Mot de Passe</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Mettre à jour le mot de passe</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SettingsScreen;
