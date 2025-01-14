import { Tooltip } from "antd";
import cn from "classnames";
import { useAddNewLocation } from "hooks/useAddNewLocation";
import { useDeleteLocation } from "hooks/useDeleteLocation";
import useEarnedBadges from "hooks/useEarnedBadges";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import React from "react";
import styles from "styles/Summary.module.scss";

// import { badgeImages } from "lib/badges";

/**
 * Badge Progress Box
 */
export function BadgeBox({ allBadges }: { allBadges: string[] }) {
  const earnedBadges = useEarnedBadges();

  return (
    <div className={styles.badgeBox}>
      {allBadges.map((badge) => (
        <SingleBadge
          key={badge}
          badge={badge}
          isEarned={earnedBadges.includes(badge)}
        />
      ))}
    </div>
  );
}

function SingleBadge({
  badge,
  isEarned,
}: {
  badge: string;
  isEarned: boolean;
}) {
  const addNewLocation = useAddNewLocation();
  const badgeKey = useBadgeLocationKey(badge);
  const deleteLocation = useDeleteLocation(badgeKey ?? "");

  function addBadge(badge: string) {
    return () => {
      if (isEarned) badgeKey && deleteLocation();
      else addNewLocation(badge);
    };
  }

  return (
    <Tooltip key={badge} title="Double click to toggle badge">
      <img
        className={cn({ [styles.earned]: isEarned }, "pointer")}
        src={`https://nuzlocke-generator.herokuapp.com/img/checkpoints/${badge
          .replaceAll("_", "-")
          .toLowerCase()}.png`}
        alt={badge}
        onDoubleClick={addBadge(badge)}
      />
    </Tooltip>
  );
}

function useBadgeLocationKey(badge: string) {
  const allLocations = useTimelineLocations();
  const badgeKey = allLocations.find((l) => l.name === badge)?.key;
  return badgeKey;
}
