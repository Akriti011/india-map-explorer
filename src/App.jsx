import React, { useState, useMemo } from "react";
import IndiaMap from "./components/IndiaMap";
import StateInfo from "./components/StateInfo";
import { statesData } from "./data/statesData";

function SearchBar({ query, onQuery, results, onSelect }) {
  return (
    <div className="search-container">
      <div className="search-input-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search a state or territory…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button className="search-clear" onClick={() => onQuery("")}>
            ✕
          </button>
        )}
      </div>
      {results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((name) => (
            <li
              key={name}
              className="search-result-item"
              onClick={() => {
                onSelect(name);
                onQuery("");
              }}
            >
              <span className="result-dot" style={{ background: statesData[name]?.color }} />
              {name}
              <span className="result-region">{statesData[name]?.region}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return Object.keys(statesData).filter(
      (name) =>
        name.toLowerCase().includes(q) ||
        statesData[name].capital?.toLowerCase().includes(q) ||
        statesData[name].region?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleStateSelect = (name) => {
    setSelectedState(name);
    setSearchQuery("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="header-flag">🇮🇳</span>
          <div>
            <h1 className="header-title">India Map Explorer</h1>
            <p className="header-sub">Discover every state &amp; territory</p>
          </div>
        </div>
        <SearchBar
          query={searchQuery}
          onQuery={setSearchQuery}
          results={searchResults}
          onSelect={handleStateSelect}
        />
      </header>

      <main className="app-main">
        <section className="map-section">
          <IndiaMap
            selectedState={selectedState}
            onStateSelect={handleStateSelect}
          />
          <div className="map-legend">
            <span className="legend-dot selected-dot" />
            <span>Selected</span>
            <span className="legend-dot hover-dot" />
            <span>Hover</span>
          </div>
        </section>

        <section className="info-section">
          <StateInfo
            selectedState={selectedState}
            onClear={() => setSelectedState(null)}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
