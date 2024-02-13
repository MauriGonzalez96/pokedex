import { api } from "./axios";

export const getPokemonArray = async () => {
    try{
        const response = await api.get("/pokemon?limit=50&offset=0");
        return response }
    catch(error){
        throw error;
    }
    
};

export const getPokemon = async (id) => {
    try{
        const response = await api.get("/pokemon/" + id);
        return response}
    catch(error){
        throw error;
    }

};