import { createSlice } from "@reduxjs/toolkit";

const initialPokemonState = {
  name: "el pokemon",
  photo: "la foto",
  types: ["water","grass"],
  stats: ["dos","tres"],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialPokemonState,
  reducers: {
    changePokemon(state, action) {
      state.pokemon = action.payload;
    },
  },
});

export const pokemonActions = pokemonSlice.actions;

export default pokemonSlice.reducer;
