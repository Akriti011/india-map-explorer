import React, { useState, useEffect, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { statesData } from "../data/statesData";

// Public CDN GeoJSON for India states (updated with Telangana)
const GEO_URL =
  "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States";

// Fallback: use a known working alternate
const GEO_URL_ALT =
  "https://cdn.jsdelivr.net/npm/india-geojson@1.0.1/india-states.json";

const STATE_DEFAULT_COLOR = "#D4956A";
const STATE_HOVER_COLOR = "#B85C30";
const STATE_SELECTED_COLOR = "#7A2020";
const STATE_STROKE = "#FDF6ED";

function normalizeStateName(name) {
  if (!name) return "";
  // Handle common variations
  const map = {
    "NCT of Delhi": "Delhi",
    "Jammu & Kashmir": "Jammu and Kashmir",
    "Andaman & Nicobar Island": "Andaman & Nicobar Islands",
    "Daman & Diu": "Daman and Diu",
    "Dadra & Nagar Haveli": "Dadra and Nagar Haveli",
  };
  return map[name] || name;
}

function getStateColor(name, selectedState, hoveredState) {
  const normalized = normalizeStateName(name);
  const stateInfo = statesData[normalized];
  const baseColor = stateInfo?.color || STATE_DEFAULT_COLOR;

  if (selectedState && normalizeStateName(selectedState) === normalized) {
    return STATE_SELECTED_COLOR;
  }
  if (hoveredState && normalizeStateName(hoveredState) === normalized) {
    return STATE_HOVER_COLOR;
  }
  return baseColor;
}

function Tooltip({ tooltip }) {
  if (!tooltip.visible) return null;
  return (
    <div
      className="map-tooltip"
      style={{
        left: tooltip.x + 14,
        top: tooltip.y - 10,
      }}
    >
      {tooltip.name}
    </div>
  );
}

function IndiaMap({ selectedState, onStateSelect }) {
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: "" });
  const [geoData, setGeoData] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Fetch from multiple possible sources
    const urls = [
      "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States",
      "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson",
    ];

    const tryFetch = async (urlList) => {
      for (const url of urlList) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            setGeoData(data);
            return;
          }
        } catch (e) {
          continue;
        }
      }
      setLoadError(true);
    };

    tryFetch(urls);
  }, []);

  const handleMouseEnter = (geo, evt) => {
    const name = geo.properties.NAME_1 || geo.properties.ST_NM || geo.properties.name || "";
    setHoveredState(name);
    setTooltip({ visible: true, x: evt.clientX, y: evt.clientY, name: normalizeStateName(name) });
  };

  const handleMouseMove = (evt) => {
    setTooltip((prev) => ({ ...prev, x: evt.clientX, y: evt.clientY }));
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
    setTooltip({ visible: false, x: 0, y: 0, name: "" });
  };

  const handleClick = (geo) => {
    const raw = geo.properties.NAME_1 || geo.properties.ST_NM || geo.properties.name || "";
    const name = normalizeStateName(raw);
    onStateSelect(name);
  };

  if (loadError) {
    return (
      <div className="map-error">
        <p>⚠️ Could not load map data.</p>
        <p>Please check your internet connection and refresh.</p>
      </div>
    );
  }

  if (!geoData) {
    return (
      <div className="map-loading">
        <div className="loading-spinner" />
        <p>Loading India Map…</p>
      </div>
    );
  }

  return (
    <div className="map-wrapper" onMouseMove={handleMouseMove}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [82, 23],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={6}>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const rawName =
                  geo.properties.NAME_1 ||
                  geo.properties.ST_NM ||
                  geo.properties.name ||
                  "";
                const isSelected =
                  selectedState &&
                  normalizeStateName(rawName) === normalizeStateName(selectedState);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleClick(geo)}
                    onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      default: {
                        fill: getStateColor(rawName, selectedState, hoveredState),
                        stroke: STATE_STROKE,
                        strokeWidth: 0.6,
                        outline: "none",
                        transition: "fill 0.2s ease",
                      },
                      hover: {
                        fill: STATE_HOVER_COLOR,
                        stroke: STATE_STROKE,
                        strokeWidth: 0.8,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: STATE_SELECTED_COLOR,
                        stroke: STATE_STROKE,
                        strokeWidth: 0.8,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip tooltip={tooltip} />
    </div>
  );
}

export default memo(IndiaMap);
