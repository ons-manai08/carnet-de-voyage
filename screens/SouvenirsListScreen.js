import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Utilisation de useNavigation
import { supabase } from './supabase';

const SouvenirsListScreen = () => {
  const [souvenirs, setSouvenirs] = useState([]);
  const navigation = useNavigation();

  // Fonction pour récupérer les souvenirs depuis Supabase
  const fetchSouvenirs = async () => {
    try {
      const { data, error } = await supabase
        .from('Souvenir') // Nom de la table Supabase
        .select('*'); // Sélectionne toutes les colonnes

      if (error) {
        console.error('Erreur lors de la récupération des souvenirs :', error);
        Alert.alert('Erreur', 'Impossible de charger les souvenirs.');
      } else {
        setSouvenirs(data); // Met à jour l'état avec les souvenirs récupérés
      }
    } catch (error) {
      console.error('Erreur inconnue :', error.message);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération des souvenirs.');
    }
  };

  useEffect(() => {
    fetchSouvenirs();
  }, []);

  const handleSelectSouvenir = (souvenirId) => {
    navigation.navigate('DetailSouvenir', { souvenirId, refreshSouvenirs: fetchSouvenirs });
  };

  const renderSouvenirItem = ({ item }) => (
    <TouchableOpacity style={styles.souvenirContainer} onPress={() => handleSelectSouvenir(item.id)}>
      <Image source={{ uri: item.image }} style={styles.souvenirImage} />
      <Text style={styles.souvenirTitle}>{item.title}</Text>
      <Text style={styles.souvenirLocation}>{item.location}</Text>
      <Text style={styles.souvenirNotes}>{item.notes}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={souvenirs}
        renderItem={renderSouvenirItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Soft background color for better contrast
    padding: 10,
  },
  souvenirContainer: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // For Android shadow effect
    borderWidth: 1,
    borderColor: '#e0e0e0', // Subtle border for a clean look
  },
  souvenirImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ddd', // Adds a slight border to images
  },
  souvenirTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  souvenirLocation: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  souvenirNotes: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});


export default SouvenirsListScreen;
