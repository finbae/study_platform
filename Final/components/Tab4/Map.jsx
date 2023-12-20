import React, { useState, useEffect } from "react";
import './Map.css';
import { setPageTitle } from '../../../util';


function Map() {
  const [busData1, setBusData1] = useState(null);
  const [busData2, setBusData2] = useState(null);

  useEffect(()=>{
    setPageTitle("지도")
  },[]);

  // XML to JSON 변환 함수
  const xmlToJson = (xml) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
  
    const parseNode = (node) => {
      const obj = {};
  
      // 속성 처리
      if (node.nodeType === 1 && node.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attribute = node.attributes[i];
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
  
      // 자식 노드 처리
      if (node.hasChildNodes()) {
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (child.nodeType === 1) {
            // 엘리먼트 노드인 경우
            if (!obj[child.nodeName]) {
              obj[child.nodeName] = parseNode(child);
            } else {
              if (!Array.isArray(obj[child.nodeName])) {
                obj[child.nodeName] = [obj[child.nodeName]];
              }
              obj[child.nodeName].push(parseNode(child));
            }
          } else if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
            // 텍스트 노드인 경우
            obj['#text'] = child.nodeValue.trim();
          }
        }
      }
  
      return obj;
    };
  
    return parseNode(xmlDoc.firstChild);
  };

  const convertSecondsToMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, remainingSeconds };
  };

  const fetchData = async (url, setBusData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const jsonData = await response.json();
        console.log("JSON API Response:", jsonData);
        setBusData(jsonData.response.body.items.item);
      } else if (contentType && contentType.includes('application/xml')) {
        const xmlData = await response.text();
        const jsonData = xmlToJson(xmlData);
        console.log("XML API Response:", jsonData);
        setBusData(jsonData.response.body.items.item);
      } else {
        throw new Error(`Unsupported content type: ${contentType}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const apiKey = encodeURIComponent("%2B%2BXBbR9Rh3e7PgMIfLauYiSwD9iF%2Br%2F45tLcpYxhmTHX7xUVCeQ1JXzmiYTQLAZwIq%2F0rYajJSJyePmCyKiglQ%3D%3D");
    const cityCode = "21";
    const nodeId1 = "BSB195620201"; // 주례역
    const nodeId2 = "BSB195730101"; // 냉정역
    const numOfRows = "10";
    const pageNo = "1";
    const responseType = "json";
    const apiUrl1 = `http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${apiKey}&cityCode=${cityCode}&nodeId=${nodeId1}&numOfRows=${numOfRows}&pageNo=${pageNo}&_type=${responseType}`;
    const apiUrl2 = `http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${apiKey}&cityCode=${cityCode}&nodeId=${nodeId2}&numOfRows=${numOfRows}&pageNo=${pageNo}&_type=${responseType}`;

    // API 호출 - 정류장 1
    fetchData(apiUrl1, setBusData1);

    // API 호출 - 정류장 2
    fetchData(apiUrl2, setBusData2);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=94b55c4dc3cf1474fbc66f7071636408&libraries=services";
    script.async = true;

    script.onload = () => {
      const { kakao } = window;
      const mapContainer = document.getElementById("map");
      const busStopLatLng1 = new kakao.maps.LatLng(35.150323, 129.003929);
      const busStopLatLng2 = new kakao.maps.LatLng(35.151047, 129.010885);
      const mapOptions = {
        center: busStopLatLng1,
        level: 3,
      };

      const map = new kakao.maps.Map(mapContainer, mapOptions);

      const busStopMarker1 = new kakao.maps.Marker({
        position: busStopLatLng1,
        title: "주례 2번 버스 정류장",
      });

      busStopMarker1.setMap(map);

      const busStopMarker2 = new kakao.maps.Marker({
        position: busStopLatLng2,
        title: "냉정역 5번버스 정류장",
      });

      busStopMarker2.setMap(map);

      const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">버스 도착 정보</div>',
      });

      kakao.maps.event.addListener(busStopMarker1, 'click', function () {
        if (busData1 && Array.isArray(busData1) && busData1.length > 0) {
          const firstBusInfo = busData1[0];
          const { minutes, remainingSeconds } = convertSecondsToMinutesAndSeconds(firstBusInfo.arrtime);
          const popupContent = `
            <div style="padding:10px;">
              <p>노선번호: ${firstBusInfo.routeno}</p>
              <p>도착예상시간: ${minutes}분 ${remainingSeconds}초</p>
            </div>
          `;
          infowindow.setContent(popupContent);
          infowindow.open(map, busStopMarker1);
        }
      });

      const newInfowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">냉정역 버스 도착 정보</div>',
      });

      kakao.maps.event.addListener(busStopMarker2, 'click', function () {
        if (busData2 && Array.isArray(busData2) && busData2.length > 0) {
          const firstBusInfo = busData2[0];
          const { minutes, remainingSeconds } = convertSecondsToMinutesAndSeconds(firstBusInfo.arrtime);
          const popupContent = `
            <div style="padding:10px;">
              <p>노선번호: ${firstBusInfo.routeno}</p>
              <p>도착예상시간: ${minutes}분 ${remainingSeconds}초</p>
            </div>
          `;
          newInfowindow.setContent(popupContent);
          newInfowindow.open(map, busStopMarker2);
        }
      });
    };

    document.head.appendChild(script);
  }, [busData1, busData2]);

  return (
    <div id="content-wrap">
      <div className="Header">
      </div>
      <div id="map" className="Map" style={{ width: "900px", height: "900px" }} />
    </div>
  );
}

export default Map;
