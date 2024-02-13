import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => {
    return { 
      pokemons: [] 
    }
  },

  actions: {
    setPokemons(datos) {
      this.pokemons = datos
    },
    deletePokemons() {
      this.pokemons = []
    }
  }
})