import React, { useState } from "react";
import { OverlayView } from "@react-google-maps/api";
import './CustomMarker.css'; // Import your custom CSS file

const CustomMarker = ({ position, icon, info }) => {
    const [showInfo, setShowInfo] = useState(false);
  
    const handleMouseOver = () => {
      setShowInfo(true);
    };
  
    const handleMouseOut = () => {
      setShowInfo(false);
    };
  
    return (
      <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
        >
          <img
            src={icon}
            alt="Marker"
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
          />
          {showInfo && info && (
            <div className="info-window">
              {info.type === 'source' && <div><strong>Source:</strong> {info.name}</div>}
              {info.type === 'destination' && <div><strong>Destination:</strong> {info.name}</div>}
              {info.type === 'current' && (
                <>
                  <div><strong>Speed:</strong> {info.speed ? info.speed + ' sec' : 'N/A'}</div>
                  <div><strong>Moving:</strong> {info.isMoving ? 'Yes' : 'No'}</div>
                  <div><strong>Street:</strong> {info.street || 'N/A'}</div>
                  <div><strong>Distance Covered:</strong> {info.distanceCovered ? info.distanceCovered.toFixed(2) : 'N/A'} km</div>
                  <div><strong>Distance Remaining:</strong> {info.distanceRemaining ? info.distanceRemaining.toFixed(2) : 'N/A'} km</div>
                  <div><strong>Time Elapsed:</strong> {info.timeElapsed || 'N/A'}</div>
                </>
              )}
            </div>
          )}
        </div>
      </OverlayView>
    );
  };  

export default CustomMarker;