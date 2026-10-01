"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { ADDRESS, GEO } from "@/lib/contact";

const { lat: LAT, lng: LNG } = GEO;

/**
 * Office map — full width at the foot of the Contatti page, with the address
 * floating over the bottom-left corner (the treatment from the previous site).
 * Leaflet is imported inside the effect, so this never touches `window` on the server.
 * The map container uses `isolation: isolate` so Leaflet's internal panes
 * (z-index 400–700) stay inside their own stacking context and never cover
 * the header or the mobile menu, which sit above it in the page's stacking order.
 */
export default function GamMap({ label, directions }: { label: string; directions: string }) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !elRef.current || mapRef.current) return;

      const map = L.map(elRef.current, {
        zoomControl: true,
        scrollWheelZoom: false, // keep the page scrolling over the map
        // on touch devices a one-finger drag must scroll the page, not pan the map
        dragging: !L.Browser.mobile,
        attributionControl: true,
      }).setView([LAT, LNG], 14);

      // OpenStreetMap standard tiles: no API key (CARTO started answering
      // "API KEY REQUIRED" on its tiles in 2026).
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      map.attributionControl?.setPrefix(false);

      const icon = L.divIcon({
        className: "",
        html: '<div style="position:relative;width:28px;height:28px;"><span style="position:absolute;inset:0;border-radius:50%;background:rgba(45,75,240,.35);animation:gam-ping 2s ease-out infinite;"></span><span style="position:absolute;top:8px;left:8px;width:12px;height:12px;border-radius:50%;background:#2D4BF0;border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.5);"></span></div>',
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
    <div className="map-wrap">
      <div ref={elRef} className="map-canvas" />
      <div className="map-card">
        <p className="map-card-lbl">{label}</p>
        <p className="map-card-name">GAM Group Srl</p>
        <p className="map-card-addr">
          {ADDRESS.street}
          <br />
          {ADDRESS.postalCode} {ADDRESS.city} ({ADDRESS.province})
        </p>
        <a
          className="map-dir"
          href={`https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`}
          target="_blank"
          rel="noopener"
        >
          {directions}
        </a>
      </div>
    </div>
  );
}
