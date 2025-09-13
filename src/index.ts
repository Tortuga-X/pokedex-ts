import { Pokemon } from './models/Pokemon';
import { PokemonRepository } from './repositories/PokemonRepository';
import { PokemonService } from './services/PokemonService';

const DEFAULT_POKEMONS: Record<string, Pokemon> = {
    bulbasaur: new Pokemon('bulbasaur', 96, { hp: 95, attack: 65, defense: 90, speed: 70 }),
    charmander: new Pokemon('charmander', 79, { hp: 78, attack: 95, defense: 82, speed: 88 }),
    squirtle: new Pokemon('squirtle', 64, { hp: 78, attack: 75, defense: 68, speed: 65 }),
    pikachu: new Pokemon('pikachu', 81, { hp: 85, attack: 110, defense: 75, speed: 120 }),
    mewtwo: new Pokemon('mewtwo', 100, { hp: 106, attack: 130, defense: 90, speed: 130 }),
    dragonite: new Pokemon('dragonite', 88, { hp: 91, attack: 134, defense: 95, speed: 80 })
};

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);

function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add': {
            const pokemonName = args[1].toLocaleLowerCase();
            const pokemon = DEFAULT_POKEMONS[pokemonName];
            if (!pokemonName || !pokemon) {
                console.log('You must specify a Pokemon name that is on the list.');
                break;
            }
            pokemonRepository.addPokemon(pokemon);
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