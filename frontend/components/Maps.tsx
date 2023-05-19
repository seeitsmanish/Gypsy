"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../styles/maps.module.css";

const fillBlueOptions = { fillColor: "blue" };
const blackOptions = { color: "black" };
const limeOptions = { color: "lime" };
const purpleOptions = { color: "purple" };
const redOptions = { color: "red" };

export default function Maps({
  totalRoutes,
  safeRoutes,
  source,
  destination,
  sourceName,
  destName,
}) {
  const multiPolyline = totalRoutes;
  // console.log(multiPolyline);
  return (
    <MapContainer
      className={styles.map_container}
      center={source}
      zoom={15}
      style={{ backgroundColor: "#ceedf5" }}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Gypsy Maps</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={{ color: "blue" }} positions={safeRoutes} />
      <Polyline pathOptions={limeOptions} positions={multiPolyline} />
      <Marker position={source}>
        <Popup>
          Source <br /> {sourceName}
        </Popup>
      </Marker>
      <Marker position={destination}>
        <Popup>
          Source <br /> {destName}
        </Popup>
      </Marker>
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
