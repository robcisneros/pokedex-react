import { createSlice } from "@reduxjs/toolkit";

const initialPokemonState = {
  name: "",
  photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png",
  weight: "",
  height: "",
  types: [],
  stats: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialPokemonState,
  reducers: {
    changePokemon(state, action) {
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state.weight = action.payload.weight;
      state.height = action.payload.height;
      state.types = action.payload.types;
      state.stats = action.payload.stats;
    },
  },
});

export const pokemonActions = pokemonSlice.actions;

export default pokemonSlice.reducer;
