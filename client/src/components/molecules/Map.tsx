import React, { useMemo } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";

const GoogleMapWrapper = styled.div`
  width: 100%;
  height: 60vh;
  @media screen and (min-width: 900px) {
    height: 80vh;
  }
  -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  -moz-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  .map-container {
    width: 100%;
    height: 100%;
  }
`;

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCOVo-j32Cbq7GpjmgwcVC1RAKpwzIePKw",
  });

  const center = useMemo(() => ({ lat: 41.4100, lng: 2.2030 }), []);
  return (
    <GoogleMapWrapper>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <MarkerF
            position={{ lat: 41.4100, lng: 2.2030 }}
          />
        </GoogleMap>
      )}
    </GoogleMapWrapper>
  );
}

export default Map;

