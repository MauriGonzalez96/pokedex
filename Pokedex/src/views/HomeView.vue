<script>
import PopUpInformacion from '../components/popUpInformacion.vue';
import {usePokemonStore} from '../stores/pokemon.js'
import { getPokemon, getPokemonArray } from '../api/apiPokedex.js'


export default{
    data() {
        const store = usePokemonStore();
        return {
            store,
            pokemonName:"",
        };
    },
    components: { PopUpInformacion }
,
methods: {
  async cargarPokemones() {
    try {
      this.store.deletePokemons()
      const response = await getPokemonArray();
      this.arrayPokemones = response.data.results;
      for (let i = 0; i < this.arrayPokemones.length; i++) {
        const index = this.arrayPokemones[i].name; 
        try {
          const resp = await getPokemon(index);
          this.store.pokemons.push(resp.data);
        } catch (error) {
          console.error(`Error al obtener datos de ${index}: ${error}`);
        }
      }

    } catch (error) {
      window.alert(error);
    }
  },
  async BuscarPorNombre(pokemonName) {
    try {
      this.store.deletePokemons()
      const resp = await getPokemon(pokemonName);
          this.store.pokemons.push(resp.data);
    } catch (error) {
      window.alert(`Error al buscar datos de ${pokemonName}`);
    }
}},
}
</script>

<template>
  <main>
    <header class="header"
   align="center">
   <h3 class="titulo">Bienvenido a Pokedex!</h3>
   <label class="label-input" for="pokemonInput">
      Busca un Pokemon por Nombre o ID :
      <input
        type="text"
        id="pokemonInput"
        v-model="pokemonName"
      >
      <button
      :disabled="pokemonName.length < 1"
      class="btn-buscar"
      @click="BuscarPorNombre(pokemonName)"
    >
      BUSCAR
    </button>
    </label>
    <label class="label-input">
      Si lo deseas Puedes ver los primeros 50 IDs!
      <button class="btn-buscar" @click="cargarPokemones">BUSCAR</button>
    </label>
  </header>
  <body class="container">
    <div>
  <div v-if="this.store.pokemons.length > 0" class="card-container">
    <popUpInformacion v-for="pokemon in this.store.pokemons" :key="pokemon.order" :pokemon="pokemon"/>
  </div>
  <div v-else>
    <label class="alternativa titulo">Hola, realiza una búsqueda!!!</label>
  </div>
</div>

</body>

  <footer></footer>
  </main>
</template>
<style scoped>
.alternativa{
  font-family: 'Press Start 2P', sans-serif;
  color: yellow;
  justify-content: center;
  margin: 1em;
  padding: 10em;
  display: grid;
  width: 100vw;
  height: 100vh;
  font-size: 25px;
  background-color: #4ac0e7
}
.btn-buscar{
  background-color: #4ac0e7;
  border-radius: 10px;
  margin: 1em;
  padding: 1em;
  font-family: 'Press Start 2P', sans-serif;
  font-weight: bold;
  font-size:x-small;
  color: azure;
  cursor: pointer;
}
.label-input{
  text-shadow: 4px 0px 0px black,
    0px 4px 0px black,
    -4px 0px 0px black,
    0px -4px 0px black;
  font-size: small;
  color: rgb(253, 253, 67);
}
.titulo{
  text-shadow: 4px 0px 0px black,
    0px 4px 0px black,
    -4px 0px 0px black,
    0px -4px 0px black;
}
.header {
  font-family: 'Press Start 2P', sans-serif;
  color: yellow;
}

.header {
  font-size: 1.5rem;
}

.container {
  font-size: 1.2rem;
  background-color: #4ac0e7;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#d43833 ;
  position: top;
  padding: 1rem;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(6, minmax(120px, 1fr));
  align-content: center;
  justify-items: center;
}
</style>