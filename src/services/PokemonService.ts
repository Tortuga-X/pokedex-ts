// src/services/PokemonService.ts
import { PokemonRepository } from '../repositories/PokemonRepository';
import { Pokemon } from '../models/Pokemon';

export class PokemonService {

    constructor(private pokemonRepository: PokemonRepository) { }

    getAverageLevel(): number {
        const repo = this.pokemonRepository.getPokemonList();
        if (repo.length === 0) {
            return 0;
        }

        const sum = repo.reduce((accu, po) => accu + po.level, 0);
        return sum / repo.length;
    }

    getFastestPokemon(): Pokemon | null {
        const repo = this.pokemonRepository.getPokemonList();
        if (repo.length === 0) {
            return null;
        }

        return repo.slice().sort((a, b) => b.stats.speed - a.stats.speed)[0];
    }
}   