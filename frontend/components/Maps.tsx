"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  Polyline,
  Rectangle,
  Circle,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../styles/maps.module.css";

const multiPolyline = [
  [28.645623, 77.122096],
  [28.6459, 77.12205],
  [28.64591, 77.12268],
  [28.64613, 77.1236],
  [28.6469, 77.12632],
  [28.64729, 77.12617],
  [28.64911, 77.12539],
  [28.64925, 77.1257],
  [28.64752, 77.12637],
  [28.64048, 77.12894],
  [28.63031, 77.13287],
  [28.5985, 77.16367],
  [28.59437, 77.1666],
  [28.58077, 77.17487],
  [28.56994, 77.18686],
  [28.56967, 77.19646],
  [28.56965, 77.20579],
  [28.57004, 77.20714],
  [28.58212, 77.25899],
  [28.58126, 77.26661],
  [28.58095, 77.26756],
  [28.5802, 77.29895],
  [28.57269, 77.30991],
  [28.57183, 77.31036],
  [28.56541, 77.3151],
  [28.56158, 77.31798],
  [28.45602, 77.49933],
  [28.45654, 77.49975],
  [28.45838, 77.49966],
  [28.45906, 77.49947],
  [28.46009, 77.49853],
  [28.46282, 77.49527],
];

const fillBlueOptions = { fillColor: "blue" };
const blackOptions = { color: "black" };
const limeOptions = { color: "lime" };
const purpleOptions = { color: "purple" };
const redOptions = { color: "red" };

export default function Maps() {
  const position = [28.46, 77.49];
  return (
    <MapContainer
      className={styles.map_container}
      center={position}
      zoom={15}
      style={{ backgroundColor: "#ceedf5" }}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Gypsy Maps</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={limeOptions} positions={multiPolyline} />
      <Marker position={position}>
        <Popup>
          Source <br /> NIET College Plot 14
        </Popup>
      </Marker>
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
