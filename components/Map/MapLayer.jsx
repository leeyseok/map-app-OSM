"use client"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import { LatLngTuple, Icon } from 'leaflet';

// icon Url
const customIconUrl = '/leaflet/images/marker-icon.png';

// // 地図の位置情報タイプ
// interface MapLayerProps {
//   center: LatLngTuple;
//   zoom: number;
// }

const UpdateMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    console.log('center', center)
    console.log('map', map)
    if (center) {
      map.setView(center, map.getZoom()); 
    } 
  }, [center, map]);
  return null;
};

const MapLayer = ({ myCenter, searchedPlaces, selectedLocation, zoom }) => {
  const [center, setCenter] = useState(myCenter);

  useEffect(() => {
    if (selectedLocation) {
      console.log('selectedLocation:', selectedLocation)
      setCenter(selectedLocation);
    }
  },[selectedLocation]);

  // Leaflet Icon setting
  const customIcon = new Icon({
    iconUrl: customIconUrl,
    iconSize: [26, 32], // icon size
    iconAnchor: [13, 32], // 아이콘의 앵커 포인트
    popupAnchor: [0, -32] // 팝업의 앵커 포인트
  });

  return (
    <div>
      <section>
        <div>
          <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
            <UpdateMap center={center} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            {/* Marker　追加 */}
            {/* myCenter를 표시하는 Marker */}
            <Marker position={myCenter} icon={customIcon}>
              <Popup>
                현재 위치입니다.<br />위도: {myCenter[0]}<br />경도: {myCenter[1]}
              </Popup>
            </Marker>
            {/* searchedPlaces Markers*/}
            {searchedPlaces && searchedPlaces.map((place, index) => (
              <Marker
                key={index}
                position={[Number(place.lat), Number(place.lon)]}
                icon={customIcon}
              >
                <Popup>
                  {place.display_name}<br />위도: {place.lat}<br />경도: {place.lon}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default MapLayer;