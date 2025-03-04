import React from 'react';
import Layout from "../../components/Layout";
import Image from "next/image";

const Pokemon = ({ pokemon }) => {
    const pokeIndex = ('000' + (pokemon.id)).slice(-3);
    const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    return (
        <Layout title={pokeName}>
            <div className="flex flex-col justify-center items-center text-center relative px-4">
                {/* <span className="absolute text-[100px] md:text-[200px] lg:text-[300px] font-bold text-slate-500 opacity-50">
                    #{pokeIndex}
                </span> */}
                <Image
                    alt={pokemon.name}
                    width={300}
                    height={300}
                    className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 z-10"
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
                />
            </div>

            <div className="bg-slate-900 rounded p-5 mx-auto my-4 w-full max-w-3xl">
                <div className="mt-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center flex-wrap gap-2">
                            <h5>Name:</h5>
                            <p>{pokemon.name},</p>
                        </div>

                        <div className="flex items-center flex-wrap gap-2">
                            <h5>Type:</h5>
                            {pokemon.types.map((type) => {
                                return <p key={type.type.name}>{type.type.name},</p>;
                            })}
                        </div>

                        <div className="flex items-center flex-wrap gap-2">
                            <h5>Height:</h5>
                            <p>{pokemon.height}</p>
                        </div>

                        <div className="flex items-center flex-wrap gap-2">
                            <h5>Abilities:</h5>
                            {pokemon.abilities.map((ability) => {
                                return (
                                    <p key={ability.ability.name}>{ability.ability.name},</p>
                                );
                            })}
                        </div>

                        <div className="flex items-center flex-wrap gap-2">
                            <h5>Stats:</h5>
                            {pokemon.stats.map((stat) => {
                                return <p key={stat.stat.name}>{stat.stat.name},</p>;
                            })}
                        </div>

                        <div className="flex items-center flex-wrap gap-2">
                            <h5>A few moves:</h5>
                            {pokemon.moves.slice(0, 3).map((move) => {
                                return <p key={move.move.name}>{move.move.name},</p>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Pokemon;

export async function getServerSideProps(context) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.query.name}`);
    const pokemon = await response.json();

    return {
        props: {
            pokemon
        }
    };
}