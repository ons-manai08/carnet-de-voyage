import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Pour utiliser les icônes d'Ionicons
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Titre de la page */}
      <Text style={styles.header}>Mon Carnet de Voyage</Text>

      {/* Description */}
      <Text style={styles.subHeader}>Capturez vos moments, explorez de nouveaux lieux</Text>

      {/* Icônes de navigation */}
      <View style={styles.iconContainer}>
        {/* Accès à la page de création de souvenir */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CreateSouvenir')}>
          <Ionicons name="camera" size={40} color="#fff" />
          <Text style={styles.iconLabel}>Créer un souvenir</Text>
        </TouchableOpacity>
        

        {/* Accès à la page de souvenirs enregistrés */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('SouvenirsListScreen')}>
          <Ionicons name="albums" size={40} color="#fff" />
          <Text style={styles.iconLabel}>Mes Souvenirs</Text>
        </TouchableOpacity>

        {/* Accès aux paramètres */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={40} color="#fff" />
          <Text style={styles.iconLabel}>Paramètres</Text>
        </TouchableOpacity>
      </View>

      {/* Image d'illustration (par exemple une image de nature ou de voyage) */}
      <Image source={require('../assets/travel-image.jpg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',  // Bleu pâle pour un fond apaisant
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3a6e3a',  // Vert inspiré de la nature
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#7f7f7f',  // Gris doux pour un texte subtil
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  iconButton: {
    backgroundColor: '#4CAF50',  // Vert pour rappeler la nature
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  iconLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 30,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
