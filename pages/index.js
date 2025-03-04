import Layout from "../components/Layout";
import { useState } from "react";
import Pokemon from "../components/Pokemon";

export default function Home({ initialPokemon }) {
    const [pokemon, setPokemon] = useState(initialPokemon);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState("");

    const fetchPokemon = async (url, next) => {
        const response = await fetch(url);
        const nextPokemon = await response.json();
        setOffset(next ? offset + 20 : offset - 20);
        setPokemon(nextPokemon);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const filteredPokemon = pokemon.results.filter(monster =>
        monster.name.includes(search)
    );

    return (
        <Layout title={"Pokemon Explorer"}>
            <div className="flex flex-col gap-[40px] mb-8">
                <div className="flex justify-center mb-5 px-4">
                    <input
                        type="text"
                        placeholder="Search Pokemon..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
                    {filteredPokemon.map((monster, index) => (
                        <Pokemon key={index} pokemon={monster} index={index + offset} />
                    ))}
                </div>

                <div className="flex justify-center mt-4 px-4 gap-4">
                    <button
                        disabled={!pokemon.previous}
                        className="disabled:bg-gray-500 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-700 transition-colors"
                        onClick={() => fetchPokemon(pokemon.previous, false)}
                    >
                        Prev
                    </button>
                    <button
                        disabled={!pokemon.next}
                        className="disabled:bg-gray-500 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-700 transition-colors"
                        onClick={() => fetchPokemon(pokemon.next, true)}
                    >
                        Next
                    </button>
                </div>

            </div>
        </Layout>
    );
}

export async function getStaticProps(context) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const initialPokemon = await response.json();

    return {
        props: {
            initialPokemon
        }
    };
}
