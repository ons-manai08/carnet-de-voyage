# Mon Carnet de Voyage

## Présentation du Projet

**Nom du projet** : Mon Carnet de Voyage

**Description** :  
"Mon Carnet de Voyage" est une application mobile permettant aux utilisateurs de documenter leurs aventures et souvenirs de voyage. Elle permet d’enregistrer des moments précieux sous forme de photos, d'ajouter des notes ou souvenirs, et de capturer la localisation exacte de chaque souvenir. Grâce à une carte interactive, les utilisateurs peuvent visualiser les différents lieux visités et accéder à des détails pour chaque destination. Cette application vise à offrir une expérience unique de journal de voyage numérique, facile à utiliser et à consulter.

**Objectif principal** :  
Proposer aux utilisateurs un outil simple et intuitif pour capturer et consulter leurs souvenirs de voyage, tout en exploitant les fonctionnalités mobiles modernes (caméra, géolocalisation, etc.).

---

## Fonctionnalités

L'application **"Mon Carnet de Voyage"** inclura les fonctionnalités principales suivantes :

1. **Création et gestion des souvenirs de voyage** :  
   - Prise de photo avec la caméra pour capturer chaque souvenir.  
   - Localisation automatique grâce à la géolocalisation, enregistrant le lieu de chaque souvenir.  
   - Ajout de notes et de descriptions pour personnaliser chaque souvenir (par exemple : nom de l’endroit, activités réalisées, impression personnelle).

2. **Carte des souvenirs** :  
   - Affichage d'une carte interactive où sont marqués tous les souvenirs créés, chaque point correspondant à un lieu visité.  
   - Possibilité de cliquer sur un point pour afficher les détails de chaque souvenir (photo, description, et autres informations).

3. **Gestion et consultation des souvenirs** :  
   - Accès à une liste de souvenirs sous forme de cartes miniatures, avec photo, titre, et date.  

---

## Écrans Estimés

L’application comportera les écrans suivants :

1. **Écran d’accueil / Liste des souvenirs** :  
   - Affiche une liste de tous les souvenirs sous forme de cartes (image miniature, titre, date).  
   - Bouton pour accéder à la création d’un nouveau souvenir.  
   - Accès aux paramètres de l’application (ex : supprimer des souvenirs ou vider la mémoire).

2. **Écran de création d’un souvenir** :  
   - Champ titre : pour entrer un titre pour le souvenir (par ex., nom de la destination).  
   - Prise de photo : bouton pour ouvrir la caméra et capturer une image du moment.  
   - Localisation : champ pour afficher la localisation actuelle ou pour entrer une localisation manuelle.  
   - Notes : champ de texte pour ajouter une description ou des détails sur le souvenir.  
   - Boutons d’enregistrement et d’annulation.

3. **Écran de détails du souvenir** :  
   - Affiche les détails du souvenir sélectionné (photo en plein écran, titre, description, emplacement sur une carte).  
   - Bouton pour supprimer ou éditer le souvenir.

4. **Carte des souvenirs** :  
   - Carte interactive avec des marqueurs pour chaque souvenir enregistré.  
   - Cliquez sur un marqueur pour ouvrir une fenêtre contextuelle montrant un aperçu du souvenir (photo, titre).  
   - Option pour accéder directement aux détails d'un souvenir depuis la carte.

5. **Écran des paramètres (facultatif)** :  
   - Options pour supprimer des souvenirs en lot.

---

## Spécifications Techniques

**Technologies** :  
- **Framework** : React Native (Expo si possible pour simplifier la gestion des fonctionnalités natives)  
- **Bibliothèques** :  
  - `expo-camera` pour l’accès à la caméra.  
  - `expo-location` pour la géolocalisation.  
  - `react-native-maps` pour l’intégration de la carte interactive.  
  - Firebase pour le stockage local des souvenirs.

**Plateformes** :  
- L’application sera développée pour les appareils iOS et Android.

---

## Workflow Utilisateur

1. **Créer un souvenir** : L’utilisateur ouvre l’application, clique sur "Ajouter un souvenir", prend une photo, entre un titre et des notes, puis enregistre le souvenir. L’emplacement est automatiquement ajouté grâce à la géolocalisation.

2. **Consulter un souvenir** : L’utilisateur peut accéder à une liste de tous ses souvenirs ou afficher les souvenirs sur une carte interactive. Il peut filtrer ou trier ses souvenirs par date ou lieu pour faciliter la consultation.

3. **Gestion des souvenirs** : L’utilisateur peut supprimer, modifier ou ajouter de nouveaux souvenirs facilement.

---

## Installation

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/ons-manai08/carnet-de-voyage.git
2.Accédez au dossier du projet :
cd carnet-de-voyage
3.Installez les dépendances nécessaires :
npm install
4.Lancez l’application en mode développement :
expo start
