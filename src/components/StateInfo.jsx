import React from "react";
import { statesData, getStateData } from "../data/statesData";

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">🗺️</div>
      <h2 className="empty-title">India Map Explorer</h2>
      <p className="empty-subtitle">
        Click on any state on the map to discover its details — capital, population, culture, and more.
      </p>
      <div className="empty-hint">
        <span>💡</span>
        <span>Use scroll to zoom · Drag to pan</span>
      </div>
      <div className="states-count">
        <span>{Object.keys(statesData).length}</span>
        <small>states & territories covered</small>
      </div>
    </div>
  );
}

function StateInfo({ selectedState, onClear }) {
  const data = selectedState ? getStateData(selectedState) : null;

  if (!selectedState || !data) {
    return (
      <aside className="info-panel">
        <EmptyState />
      </aside>
    );
  }

  return (
    <aside className="info-panel">
      <div className="info-header" style={{ borderColor: data.color || "#D4956A" }}>
        <div className="info-region-badge" style={{ background: data.color || "#D4956A" }}>
          {data.region}
        </div>
        <h1 className="info-state-name">{selectedState}</h1>
        <p className="info-founded">Est. {data.founded}</p>
        <button className="clear-btn" onClick={onClear} title="Deselect state">
          ✕
        </button>
      </div>

      <p className="info-description">{data.description}</p>

      <div className="stats-grid">
        <StatCard icon="🏛️" label="Capital" value={data.capital} />
        <StatCard icon="👥" label="Population" value={data.population} />
        <StatCard icon="📐" label="Area" value={data.area} />
        <StatCard icon="🗣️" label="Language" value={data.language} />
      </div>

      <div className="info-divider" />

      <div className="info-footer">
        <span className="info-footer-label">Region</span>
        <span className="info-footer-value">{data.region}</span>
      </div>
    </aside>
  );
}

export default StateInfo;
