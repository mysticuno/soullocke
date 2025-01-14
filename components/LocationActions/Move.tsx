import { Button } from "antd";
import MovePokemon from "components/MovePokemon";
import { useAddEvent } from "hooks/useAddEvent";
import { EventType, PokemonLocation } from "models";
import React from "react";
import styles from "styles/Location.module.scss";

export function Move({
  locationKey: origin,
  handleMoveToTeam,
}: {
  locationKey: string;
  handleMoveToTeam: (origin: string, locationKey: string) => void;
}) {
  const [showModal, setShowModal] = React.useState(false);

  const { addEvent } = useAddEvent("", origin, {
    callback: () => setShowModal(false),
    startMoveToTeam: handleMoveToTeam,
  });

  function handleMove(locationKey: string, pokemonLocation: PokemonLocation) {
    return addEvent(EventType.moved, locationKey, {
      location: pokemonLocation,
    });
  }

  return (
    <>
      <MovePokemon
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onFinish={handleMove}
        pokemonOrigin={origin}
      />
      <Button
        className={styles.listingMoveButton}
        onClick={() => setShowModal(true)}
        type="text"
        size="small"
      >
        Move
      </Button>
    </>
  );
}

export default Move;
