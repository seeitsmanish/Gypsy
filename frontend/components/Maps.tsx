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

// const multiPolyline = [
//   [ 28.675538 , 77.316325 ],
// [ 28.671681 , 77.316387 ],
// [ 28.670928 , 77.316726 ],
// [ 28.670124 , 77.314724 ],
// [ 28.669353 , 77.314165 ],
// [ 28.668701 , 77.314204 ],
// [ 28.666188 , 77.315482 ],
// [ 28.661016 , 77.314179 ],
// [ 28.659658 , 77.314087 ],
// [ 28.659544 , 77.314116 ],
// [ 28.659413 , 77.316891 ],
// [ 28.659522 , 77.316896 ],
// [ 28.659543 , 77.316469 ],
// ];

const fillBlueOptions = { fillColor: "blue" };
const blackOptions = { color: "black" };
const limeOptions = { color: "lime" };
const purpleOptions = { color: "purple" };
const redOptions = { color: "red" };

export default function Maps({ totalRoutes }) {
  const multiPolyline = totalRoutes;
  const position = [28.675538, 77.316325];
  // console.log(multiPolyline);
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
