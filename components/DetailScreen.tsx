import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pokemon } from '../types';

function DetailScreen({navigation, route}) {
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);

  useEffect(() => {
    const { pokedexId } = route.params;
    fetch("https://tyradex.vercel.app/api/v1/pokemon/" + pokedexId)
      .then((response) => {
        if (!response.ok) console.error("Réponse réseau non OK");
        return response.json(); 
      })
      .then(json => setPokemon(json))
      .catch(error => console.error("Erreur de fetch:", error));
  }, []);

  const renderEvolutions = (evolutions, title) => {
    if (!evolutions || evolutions.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {evolutions.map((evo, index) => (
          <View key={index} style={styles.evolutionItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.replace("Pokemon", { pokedexId: evo.pokedexId })
              }
            >
              <Text style={styles.evolutionText}>
                {evo.name} - {evo.condition}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  if (!pokemon) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {pokemon.name.fr} ({pokemon.name.en})
      </Text>
      <Image style={styles.image} source={{ uri: pokemon.sprites.regular }} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Types</Text>
        {pokemon.types.map((type, index) => (
          <View key={index} style={styles.typeItem}>
            <Image style={styles.typeImage} source={{ uri: type.image }} />
            <Text>{type.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Talents</Text>
        {pokemon.talents.map((talent, index) => (
          <Text key={index}>{talent.name}</Text>
        ))}
      </View>

      {renderEvolutions(pokemon.evolution.pre, "Évolutions Précédentes")}
      {renderEvolutions(pokemon.evolution.next, "Évolution Suivante")}

      {/* Ajoutez d'autres sections pour les statistiques, résistances, etc. */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  typeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  typeImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  evolutionItem: {
    marginTop: 5,
  },
  evolutionText: {
    color: "blue",
  },
  // Ajoutez d'autres styles selon vos besoins
});

export default DetailScreen