<script>
import { ref } from 'vue';
import {usePokemonStore} from '../stores/pokemon.js'

export default{
name:"popUpInformacion",
props:['pokemon'],
  data (){
    const store = usePokemonStore();
    return {
        store,
        popUpOn: ref(false),
        arrayPokemones:[]
    }
  },
  methods:{
    abrirPopUp(){
        this.popUpOn = true;
    },
    cerrarPopUp(){
        this.popUpOn = false;
    }
  },
}
</script>

<template>
  <button class="card"
  @click="abrirPopUp">
    <div>
        <section align="center">
            <h3 class="color-fuente text-center"> {{ pokemon.name }}</h3>
            <img v-if="pokemon!=null" :src="pokemon.sprites.front_default" :alt="pokemon.sprites.front_shiny">
            <h4 class="color-fuente">Peso: {{ pokemon.weight }}</h4>
            <h4 class="color-fuente" >Tipo: {{ pokemon.types[0].type.name }}</h4>
        </section> 
    </div>
  </button>
  <dialog :open ="this.popUpOn" style="background-color: rgba(0, 0, 0, 0.5); z-index: 999; width: 100%; height: 100%;">
        <div class="dialog">
            <h3 class="color-fuente" style="margin: 2%;">⊛ Información</h3>
            <div align="center" style="margin: 2%;">
                <h4 class="color-fuente">--Nombre: {{ pokemon.name }}</h4>
                <h4 class="color-fuente">--Peso: {{ pokemon.weight }}</h4> 
                <h4 class="color-fuente">--Altura: {{ pokemon.height }}</h4>
                <h4 v-for="(type,key) in pokemon.types" :key="key" class="color-fuente">--Tipo {{ type.slot }}: {{ type.type.name}}</h4>
                <p class="color-fuente">--Estadísticas:</p>
                <div style="font-family: 'Press Start 2P', sans-serif;">
                  <h6 v-for="(stat,key) in pokemon.stats" :key="key" class="color-fuente" style="display: inline-block; margin: 5px; font-weight:lighter; color: grey;">{{ stat.stat.name }}:{{ stat.base_stat}}</h6>
                </div>
                <p class="color-fuente">--Lista de Movimientos:</p>
                <div style="font-family: 'Press Start 2P', sans-serif;">
                  <h6 v-for="(move, key) in pokemon.moves" :key="key" style="display: inline-block; margin: 5px; font-weight:lighter; color: grey;">
                    {{ move.move.name }},
                  </h6>
                </div>
            </div>
        </div>
        <button align="center" class="btn-cerrar" @click="cerrarPopUp">cerrar</button>
    </dialog>
</template>

<style>
.text-center{
  text-align: center !important;
}
.card{
    height: 250px;
    width: 200px;
    margin: 1em;
    position: relative;
    z-index: 995;
    background-color:#020202 ;
    border-radius: 10px;
}
.color-fuente{
  font-family: 'Press Start 2P', sans-serif;
  font-weight: bold;
  color: azure;
  padding: 8px;
  text-align: start;
}
.dialog{
  background-color:#020202 ;
  border-radius: 10px;
  width: 95vw;
  height: 75vh;
}
.btn-cerrar{
  background-color: #d43833;
  border-radius: 10px;
  margin: 1em;
  padding: 1em;
  font-family: 'Press Start 2P', sans-serif;
  font-weight: bold;
  color: azure;
  cursor: pointer;
}</style>