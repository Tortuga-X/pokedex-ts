import fs from 'fs';

import { Pokemon } from '../models/Pokemon';

export class PokemonRepository {

    private readonly FILE_PATH = 'data/pokemon-list.json';
    private pokemonList: Pokemon[] = [];

    constructor() {
        this.pokemonList = this.loadFromFile();
    }

    private loadFromFile(): Pokemon[] {
        try {
            if (fs.existsSync(this.FILE_PATH)) {
                const data = fs.readFileSync(this.FILE_PATH, 'utf-8');
                return JSON.parse(data) as Pokemon[];
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error loading');
            return [];
        }
    }

    private saveToFile(): void {
        try {
            const dir = this.FILE_PATH.substring(0, this.FILE_PATH.lastIndexOf('/'));
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(this.FILE_PATH, JSON.stringify(this.pokemonList, null, 2), 'utf-8');

        } catch (error) {
            console.log('Error saving');

        }
    }

    getPokemonList() {
        return this.pokemonList;
    }

    addPokemon(pokemon: Pokemon) {
        console.log(`Adding pokemon: ${pokemon.name}`);
        this.pokemonList.push(pokemon);
        this.saveToFile();
    }
}