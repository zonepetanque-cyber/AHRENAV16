import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Video } from '../services/youtubeService';
import { extractLocation, Location } from '../utils/geocoding';

// Fix Leaflet icon issue
let DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapVideo extends Video {
  location: Location;
}

const MapComponent = ({ videos, onVideoSelect }: { videos: Video[], onVideoSelect: (v: Video) => void }) => {
  const [mapVideos, setMapVideos] = useState<MapVideo[]>([]);

  useEffect(() => {
    const located = videos
      .map(v => {
        const loc = extractLocation(v.title, ""); // We could also pass description if we had it
        if (loc) return { ...v, location: loc };
        return null;
      })
      .filter((v): v is MapVideo => v !== null);
    
    setMapVideos(located);
  }, [videos]);

  return (
    <div className="h-[calc(100vh-160px)] w-full relative z-0">
      <MapContainer 
        center={[46.2276, 2.2137]} 
        zoom={6} 
        style={{ height: '100%', width: '100%', background: '#000' }}
        className="ahrena-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {mapVideos.map((video) => (
          <Marker 
            key={video.id} 
            position={[video.location.lat, video.location.lng]}
          >
            <Popup className="ahrena-popup">
              <div className="w-48 bg-zinc-900 text-white rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-video object-cover"
                />
                <div className="p-3">
                  <h3 className="text-xs font-bold line-clamp-2 mb-1">{video.title}</h3>
                  <p className="text-[10px] text-white/60 mb-2">{video.location.city}</p>
                  <button 
                    onClick={() => onVideoSelect(video)}
                    className="w-full bg-red-600 text-white text-[10px] font-bold py-1.5 rounded uppercase"
                  >
                    Voir le direct
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .ahrena-map .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .ahrena-map .leaflet-popup-tip {
          background: #18181b !important;
        }
        .ahrena-map .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
      `}} />
    </div>
  );
};

export default MapComponent;
