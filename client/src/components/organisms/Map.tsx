import { Grid } from "@mui/material";
import * as React from "react";
// import GoogleMapReact from 'google-map-react';

function PackageTabs() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        My marker
      </GoogleMapReact> */}
    </div>
  );
}

export default PackageTabs;
