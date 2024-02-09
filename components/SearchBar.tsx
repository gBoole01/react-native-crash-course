import { useEffect, useState } from "react"
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Pokemon } from "../types"

function SearchBar({navigation}) {
    const [text, setText] = useState("")
    const [pokemons, setPokemons] = useState<Pokemon[] | null>([])
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[] | null>([])
    
    useEffect(() => {
        fetch("https://tyradex.vercel.app/api/v1/pokemon")
          .then((response) => {
            if (!response.ok) console.error("Réponse réseau non OK");
            return response.json(); 
          })
          .then(json => setPokemons(json))
          .catch(error => console.error("Erreur de fetch:", error));
      }, []);
    
      useEffect(() => {
        if (text.length > 2) {
          const results = pokemons.filter((pokemon) =>
            pokemon.name.fr.toLowerCase().includes(text.toLowerCase()),
          );
          setFilteredPokemons(results);
        }
      }, [text, pokemons]);
    
      return (
        <View style={{ padding: 10 }}>
          <TextInput
            style={{
              height: 40,
              borderColor: "#800200",
              borderWidth: 3,
              borderTopLeftRadius: 20,
              borderBottomEndRadius: 20,
              margin: 5,
            }}
            placeholder="Recherchez un Pokemon"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />
          <FlatList
            data={filteredPokemons}
            renderItem={({ item }) => (
              <View style={{ flex: 1, paddingTop: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Pokemon", {
                      pokedexId: item.pokedexId,
                    })
                  }
                >
                  <Text style={{ padding: 10, fontSize: 18 }}>
                    {item.name.fr} - {item.category}
                  </Text>
                  <Image
                    source={{ uri: item.sprites.regular }}
                    style={{ width: 120, height: 120, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.pokedexId.toString()}
          />
        </View>
      );
    };
export default SearchBar