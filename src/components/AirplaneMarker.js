import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L, { Popup } from "leaflet";

import carIcon from "../car.png";

const icon = L.icon({
  iconSize: [45, 45],
  popupAnchor: [2, -20],
  iconUrl:carIcon
});

export default function AirplaneMarker({ data }) {
  const { lat, lng } = data;
  const [prevPos, setPrevPos] = useState([lat, lng]);

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  return (
    <>
      <LeafletTrackingMarker
        icon={icon}
        position={[lat, lng]}
        previousPosition={prevPos}
        duration={1000}
        keepAtCenter={true}
      ></LeafletTrackingMarker>
    </>
  );
}
