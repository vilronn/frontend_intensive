import React, { useState, useEffect, useCallback } from "react";
import './App.css';

function Pokemon({ pokemon, onRemove }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        if (!response.ok) {
          throw new Error(`Pokemon ${pokemon.name} not found`);
        }
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemon.name]);

  const forms = details?.forms.map(form => form.name).join(', ') || "no data";

  if (loading) return <p>loading...</p>;

  return (
    <li class="pokemon">
      <div class="pokemon_name">Name: {pokemon.name}</div>
      <div class="pokemon_details">
      {details && (
        <>
          <div class="pokemon_info"><p>Number of forms: {details.forms.length}</p>
          <p>Forms: {forms}</p></div>
          <img src={details.sprites.front_default} alt={pokemon.name} />
        </>
      )}
      <button onClick={() => onRemove(pokemon.name)}>X</button>
      </div>
    </li>
  );
}

function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);

  // base list
  useEffect(() => {
    const loadInitialPokemons = async () => {
      try {
        const responses = await Promise.all(
          Array.from({ length: 20 }, (_, i) => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
          )
        );
        const data = await Promise.all(responses.map(res => res.json()));
        setPokemonList(data);
      } catch (err) {
        console.error("Loading's error...", err);
      }
    };

    loadInitialPokemons();
  }, []);

  // search the pokemon
  const fetchPokemon = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error(`Pokemon ${name} not found`);
      }
      const data = await response.json();
      // Adding the pokemon in the list
      setPokemonList(prevList => {
        if (prevList.some(pokemon => pokemon.name === data.name)) {
          return prevList;
        }
        return [data, ...prevList];
      });
      setError(null);
      setQuery(""); // Clear searching form
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchPokemon(query.trim().toLowerCase());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleRemove = useCallback((name) => {
    setPokemonList(prevList => prevList.filter(pokemon => pokemon.name !== name));
  }, []);

  return (
    <>
      <div class="searching">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Add new pokemon"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}
      <ul class="list">
        {pokemonList.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon} onRemove={handleRemove} />
        ))}
      </ul>
    </>
  );
}

function App() {
  return (
    <SearchForm />
  );
}

export default App;
