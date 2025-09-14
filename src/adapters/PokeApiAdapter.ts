interface PokemonInfo {
    name: string;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
}

export class PokeAPIAdapter {
    async getPokemonInfo(pokemonName: string): Promise<PokemonInfo> {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not get information for the pokemon ${pokemonName}`);
        }

        const data = await response.json();

        const infPoke: { [key: string]: number } = {};
        for (const stats of data.stats) {
            infPoke[stats.stat.name] = stats.base_stat;
        }

        return {
            name: data.name,
            hp: infPoke['hp'],
            attack: infPoke['attack'],
            defense: infPoke['defense'],
            speed: infPoke['speed'],
        };
    }
}