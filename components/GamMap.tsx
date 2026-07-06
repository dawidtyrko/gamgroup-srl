"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

const LAT = 45.66099553158068;
const LNG = 12.276944105971117;

/**
 * Office map. Rendered via next/dynamic with ssr:false from <Site> (Leaflet
 * touches `window`/`document` at import time).
 *
 * CRITICAL stacking fix (see README):
 *  - the map container has `isolation: isolate` so Leaflet's internal panes
 *    (z-index 400–700) stay inside their own stacking context;
 *  - the floating address card sits at `z-index: 1000`.
 * Without both, the address card disappears behind the tiles.
 */
export default function GamMap() {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !elRef.current || mapRef.current) return;

      const map = L.map(elRef.current, {
        zoomControl: true,
        scrollWheelZoom: false, // keep the page scrolling over the map (desktop)
        // On touch devices a one-finger drag must scroll the PAGE, not pan the
        // map — otherwise swipes across the full-width map get captured and the
        // screen "fights"/jumps. Pinch-zoom (two fingers) still works.
        dragging: !L.Browser.mobile,
        attributionControl: true,
      }).setView([LAT, LNG], 14);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap &copy; CARTO",
        }
      ).addTo(map);

      // Drop Leaflet's default prefix (the "Leaflet" name + Ukrainian flag),
      // keeping the licence-required OSM/CARTO attribution.
      map.attributionControl?.setPrefix(false);

      // Custom teal pulsing pin via divIcon (avoids the default-marker 404).
      const icon = L.divIcon({
        className: "",
        html: '<div style="position:relative;width:28px;height:28px;"><span style="position:absolute;inset:0;border-radius:50%;background:rgba(77,147,162,.45);animation:gam-ping 2s ease-out infinite;"></span><span style="position:absolute;top:8px;left:8px;width:12px;height:12px;border-radius:50%;background:#4D93A2;border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.5);"></span></div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker([LAT, LNG], { icon }).addTo(map);

      mapRef.current = map;
      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch {
          /* noop */
        }
      }, 300);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        gridColumn: "1 / -1",
        position: "relative",
        marginTop: "clamp(48px,6vw,84px)",
      }}
    >
      <div
        ref={elRef}
        style={{
          height: "clamp(340px,40vw,500px)",
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.12)",
          background: "#e7ecf2",
          isolation: "isolate",
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          left: "clamp(16px,2vw,28px)",
          bottom: "clamp(16px,2vw,28px)",
          background: "#fff",
          borderRadius: 18,
          padding: "24px 26px",
          maxWidth: 300,
          boxShadow: "0 20px 50px rgba(6,12,24,.4)",
        }}
      >
        <p
          style={{
            margin: "0 0 10px",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#35707E",
          }}
        >
          La nostra sede
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: "#1B2A4A",
          }}
        >
          GAM Group Srl
        </p>
        <p
          style={{
            margin: "6px 0 16px",
            fontWeight: 300,
            fontSize: 15,
            lineHeight: 1.5,
            color: "#6B7686",
          }}
        >
          Via Callalta 31/E
          <br />
          31100 Treviso (TV)
        </p>
        <a
          className="map-dir"
          href="https://www.google.com/maps/dir/?api=1&destination=45.66099553158068,12.276944105971117"
          target="_blank"
          rel="noopener"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#1B2A4A",
            textDecoration: "none",
            borderBottom: "1px solid #4D93A2",
            paddingBottom: 2,
            transition: "color .3s ease",
          }}
        >
          Ottieni indicazioni →
        </a>
      </div>
    </div>
  );
}
