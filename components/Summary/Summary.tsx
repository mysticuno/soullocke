import React from "react";
import Box from "ui-box";
import cn from "classnames";
import { RunContext } from "pages/run/[id]";
import styles from "styles/Summary.module.scss";
import { PokemonLocation } from "models";
import { oKey, oVal } from "lib/utils";

import BadgeBox from "./BadgeBox";
import Team from "./Team";
import Grave from "./Grave";

import type { Player, Timeline as TL, Pokemon as PokemonData } from "models";
export interface Data {
  location: TL;
  players: Player[];
  pokemon: PokemonData[];
  pokemonLocation: PokemonLocation;
  notes: string;
}

/**
 * Timeline Grid
 */
function Summary({ allBadges }: { allBadges: string[] }) {
  const { RUN } = React.useContext(RunContext);

  //----------------------------------#01F2DF
  // Data
  const playerArr = RUN.getPlayersArray();
  const teamPokemon: { [playerId: string]: PokemonData[] } = {};

  // Sort pokemon per player into categories
  for (const player of playerArr) {
    // Initialize arrays
    teamPokemon[player.id] = [];

    const pokemon = oVal(player.pokemon || {});
    for (const p of pokemon) {
      if (!p) continue;

      const l = p.location;
      if (l === PokemonLocation.team) {
        teamPokemon[player.id].push(p);
      }
    }
  }

  //----------------------------------#01F2DF
  return (
    <div className={styles.container}>
      <BadgeBox {...{ allBadges }} />
      <div className={styles.teamsContainer}>
        {oKey(teamPokemon).map((player, j) => (
          <Team key={j} {...{ player, j }} />
        ))}
      </div>
      <div className={styles.graveHeader}>
        <div className={styles.graveDivider} />
        <span aria-details="Graveyard">🪦</span>
        <div className={styles.graveDivider} />
      </div>
      <div className={styles.gravesContainer}>
        {playerArr.map((player, j) => (
          <Grave key={j} {...{ player: player.id, j }} />
        ))}
      </div>
    </div>
  );
}

export default Summary;
