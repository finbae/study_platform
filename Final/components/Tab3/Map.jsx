
import React, { useState,useEffect } from "react";
import "./Map.css";

function Map() {
    const [map,setMap] = useState(null);
  useEffect(() => {
   
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=94b55c4dc3cf1474fbc66f7071636408&libraries=services";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(35.145755, 129.007232),
        level: 3,
      };
      const initialMap = new kakao.maps.Map(container, options);
      const map = new kakao.maps.Map(container, options);
      const marker = new kakao.maps.Marker();

      kakao.maps.event.addListener(map,"tilesloaded",displayMarker);

      function displayMarker(){
        marker.setPosition(map.getCenter());
        marker.setMap(map);
      }
    };
    }, []);

  return <div id="map" className="Map"></div>;
}

export default Map;
