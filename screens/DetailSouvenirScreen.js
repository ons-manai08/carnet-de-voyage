import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator, Button } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './supabase'; // Assurez-vous que l'importation de supabase est correcte
import { Ionicons } from '@expo/vector-icons';
const DetailSouvenirScreen = ({ route }) => {
  console.log("route",route)
  const { souvenirId } = route.params;  // Récupérer l'ID du souvenir passé en paramètre
  const [souvenir, setSouvenir] = useState(null); // État pour stocker les détails du souvenir
  const [loading, setLoading] = useState(true); // État pour le chargement
  const navigation = useNavigation();

  useEffect(() => {
    console.log("route",souvenirId)
    if (!souvenirId) {
      Alert.alert('Erreur', 'ID du souvenir manquant');
      setLoading(false);
      return;
    }

    const fetchSouvenir = async () => {
      try {
        const { data, error } = await supabase
          .from('Souvenir')
          .select('*')
          .eq('id', souvenirId)
          .single();

        if (error) {
          console.error('Erreur lors de la récupération du souvenir :', error);
          Alert.alert('Erreur', 'Impossible de charger les détails du souvenir.');
        } else {
          setSouvenir(data);
        }
      } catch (error) {
        console.error('Erreur inconnue :', error.message);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération du souvenir.');
      } finally {
        setLoading(false);
      }
    };

    fetchSouvenir();
  }, [souvenirId]);

  const handleDelete = (souvenirId) => {
    if (!souvenirId || (typeof souvenirId !== 'string' && typeof souvenirId !== 'number')) {
      Alert.alert('Erreur', 'ID du souvenir invalide');
      return;
    }
  
    Alert.alert(
      'Supprimer le souvenir',
      'Êtes-vous sûr de vouloir supprimer ce souvenir ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: async () => {
            console.log('ID du souvenir à supprimer:', souvenirId);
  
            try {
              // Supprimer le souvenir dans la base de données via Supabase
              const { data, error } = await supabase
                .from('Souvenir')
                .delete()
                .eq('id', souvenirId);
  
              if (error) {
                console.error('Erreur lors de la suppression du souvenir :', error.message);
                Alert.alert('Erreur', 'Impossible de supprimer le souvenir.');
              } else {
                console.log('Réponse de la suppression:', data);
                Alert.alert('Souvenir supprimé avec succès');
                // Rafraîchir la liste des souvenirs si nécessaire
                if (route.params?.refreshList) {
                  route.params.refreshList(); // Appeler la fonction de rappel pour rafraîchir la liste
                }
                navigation.goBack(); // Retour en arrière après suppression
              }
            } catch (error) {
              console.error('Erreur inconnue lors de la suppression :', error.message);
              Alert.alert('Erreur', 'Une erreur s\'est produite lors de la suppression du souvenir.');
            }
          },
        },
      ]
    );
  };
  
  
  

  const handleEdit = () => {
    navigation.navigate('EditSouvenir', { souvenir });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!souvenir) {
    return <Text>Aucun souvenir trouvé.</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: souvenir.image }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{souvenir.title}</Text>
        <Text style={styles.description}>{souvenir.notes}</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: souvenir.latitude,
              longitude: souvenir.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: souvenir.latitude,
                longitude: souvenir.longitude,
              }}
              title={souvenir.title}
            />
          </MapView>
        </View>

        <View style={styles.actions}>
          <Button title="Modifier" onPress={handleEdit} />
          <Button title="Supprimer" onPress={() => handleDelete(souvenir.id)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    marginVertical: 15,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  mapContainer: {
    height: 200,
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    width: 150,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default DetailSouvenirScreen;
