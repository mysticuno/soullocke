import AddPokemon from "components/AddPokemon";
import LocationActions from "components/LocationActions";
import LocationSummary from "components/LocationSummary";
import Pokemon from "components/Pokemon";
import React from "react";

import LocationListing from "../LocationListing";
import type { Data } from "./Timeline";

function TimelineRow({
  data,
  handleFinishAdd,
  moveToTeam,
}: {
  data: Data;
  handleFinishAdd: (locationKey: string) => (caught: boolean) => void;
  moveToTeam: (origin: string, location: string) => void;
}) {
  return (
    <>
      <LocationListing location={data.location.name} />

      {data.players?.map((p) => {
        const key = data.location.key + p.name;
        const playerPokemon = p.pokemon?.[data.location.key];
        const isBadge = /badge/gi.test(data.location.name);
        const props = {
          playerId: p.id,
          location: data.location.key,
          onFinish: handleFinishAdd(data.location.key),
          pokemon: playerPokemon,
        };

        let display: any = <AddPokemon {...props} />;
        if (isBadge) display = "-";
        if (playerPokemon) display = <Pokemon {...props} />;
        return <td key={key}>{display}</td>;
      })}

      <td>
        <LocationSummary
          pokemon={data.pokemon}
          pokemonLocation={data.pokemonLocation}
        />
      </td>

      <LocationActions locationKey={data.location.key} {...{ moveToTeam }} />
    </>
  );
}

export default TimelineRow;
