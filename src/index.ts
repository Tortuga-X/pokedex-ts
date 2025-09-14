import { Pokemon } from './models/Pokemon';
import { PokemonRepository } from './repositories/PokemonRepository';
import { PokemonService } from './services/PokemonService';
import { PokeAPIAdapter } from './adapters/PokeApiAdapter';

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);
const pokeAPI = new PokeAPIAdapter;

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add': {
            const pokemonName = args[1].toLocaleLowerCase();
            if (!pokemonName) {
                console.log('You must specify a correct Pokemon name')
            }

            try {
                const data = await pokeAPI.getPokemonInfo(pokemonName);
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
            } catch (error) {
                console.log('Could not be added.');
            }
            break;
        }

        case 'average': {
            const averageLevel = pokemonService.getAverageLevel();
            console.log("Average level: ", averageLevel);
            break;
        }

        case 'fastest': {
            const fastestPokemon = pokemonService.getFastestPokemon();
            console.log("Fastest pokemon: ", fastestPokemon);
            break;
        }
        default: {
            console.log('Comandos disponibles:');
            console.log('add <pokemonName>');
            console.log('average');
            console.log('fastest');
        }
    }
}

main();