import { Router, Request, Response } from "express";
import { Pokemon } from "../models/Pokemon";
import { PokeAPIAdapter } from "../adapters/PokeApiAdapter";
import { PokemonRepository } from "../repositories/PokemonRepository";
import { PokemonService } from "../services/PokemonService";

export const pokemonRouter = Router();

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);
const pokeAPI = new PokeAPIAdapter();

pokemonRouter.get("/add-pokemon/:name", async (req: Request, res: Response) => {
    try {
        const { name } = req.params;

        const data = await pokeAPI.getPokemonInfo(name);
        const pokemon = new Pokemon(
            data.name, 100,
            {
                hp: data.hp,
                attack: data.attack,
                defense: data.defense,
                speed: data.speed
            }
        );
        pokemonRepository.addPokemon(pokemon);
        return res.status(201).json({ message: `Pokemon added successfully` });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || `Error add the Pokemon` });
    }
});

pokemonRouter.get("/average", (req: Request, res: Response) => {
    try {
        const averageLevel = pokemonService.getAverageLevel();
        return res.json({ averageLevel });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || `Error calculating the average` });
    }
});

pokemonRouter.get("/fastest", (req: Request, res: Response) => {
    try {
        const fastestPokemon = pokemonService.getFastestPokemon();
        return res.json({ fastestPokemon });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || `Error getting the fastest Pokemon` });
    }
});