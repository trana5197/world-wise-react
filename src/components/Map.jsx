import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";

import { useGeolocation } from "../hooks/useGeolocation";
import { usePosition } from "../hooks/usePosition";
import { useCities } from "../contexts/CitiesContext";

import Button from "./Button";

import styles from "./Map.module.css";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { cities } = useCities();
  const {
    isLoading: isLoadingGeoLocation,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const { mapLat, mapLng } = usePosition();

  useEffect(
    function () {
      if ((mapLat, mapLng)) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPosition) setMapPosition(geoLocationPosition);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={() => getPosition()}>
          {isLoadingGeoLocation ? "Loading..." : "Get you current Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
