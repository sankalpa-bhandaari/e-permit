import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Maximize2, Minimize2, Undo2, ZoomIn, ZoomOut, X } from "lucide-react"; // Imported X for close buttons
import { CONSERVATION_AREAS } from "../data";
import "./css/area.css";

const Area = () => {
  const [detail, setDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  
  // State for zoom and position
  const [zoom, setZoom] = useState({});
  const [pos, setPos] = useState({});

    // Track which ID is currently fullscreen
    const [fullscreenId, setFullscreenId] = useState(null);

  // Refs to access latest state inside non-React event listeners (Wheel)
  const zoomRef = useRef({});
  const posRef = useRef({});

  // Interaction refs (drag/pinch)
  const interaction = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
    pinchDist: 0,
    isPinching: false,
  });

  const mapRefs = useRef({});
  const navigate = useNavigate();

  // Sync Refs with State
  useEffect(() => {
    zoomRef.current = zoom;
    posRef.current = pos;
  }, [zoom, pos]);

  
    // Listen for Fullscreen changes to update the icon state
    useEffect(() => {
      const handleFsChange = () => {
        const fsEl = document.fullscreenElement;
        if (!fsEl) {
          setFullscreenId(null);
        } else {
          // Find which map ID corresponds to the fullscreen element
          const foundId = Object.keys(mapRefs.current).find(
            (key) => mapRefs.current[key] === fsEl
          );
          if (foundId) setFullscreenId(Number(foundId)); // Ensure ID type matches data
        }
      };
  
      document.addEventListener("fullscreenchange", handleFsChange);
      return () => document.removeEventListener("fullscreenchange", handleFsChange);
    }, []);
    
  /* ================= HELPERS ================= */
  const getVal = (obj, id, def) => (obj && obj[id] !== undefined ? obj[id] : def);

  const getDistance = (touches) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const getMidpoint = (touches, rect) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2 - rect.left,
      y: (touches[0].clientY + touches[1].clientY) / 2 - rect.top,
    };
  };

  /* ================= ZOOM LOGIC ================= */
  const updateZoom = (id, newScale, centerOffset) => {
    const currentScale = getVal(zoom, id, 1);
    const currentPos = getVal(pos, id, { x: 0, y: 0 });

    // Clamp zoom between 1 and 5
    const nextScale = Math.min(Math.max(newScale, 1), 5);

    // Calculate new position to keep the target point centered under cursor/finger
    const newX = centerOffset.x - ((centerOffset.x - currentPos.x) * nextScale) / currentScale;
    const newY = centerOffset.y - ((centerOffset.y - currentPos.y) * nextScale) / currentScale;

    setZoom((prev) => ({ ...prev, [id]: nextScale }));
    setPos((prev) => ({ ...prev, [id]: { x: newX, y: newY } }));
  };

  const handleZoomBtn = (id, delta) => {
    const el = mapRefs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = { x: rect.width / 2, y: rect.height / 2 };
    const currentZoom = getVal(zoom, id, 1);
    updateZoom(id, currentZoom + delta, center);
  };

  const resetView = (id) => {
    setZoom((z) => ({ ...z, [id]: 1 }));
    setPos((p) => ({ ...p, [id]: { x: 0, y: 0 } }));
  };

  /* ================= MOUSE EVENTS ================= */
  const handleMouseDown = (e, id) => {
    e.preventDefault();
    interaction.current.dragging = true;
    interaction.current.lastX = e.clientX;
    interaction.current.lastY = e.clientY;
    // Change cursor to grabbing
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseMove = (e, id) => {
    if (!interaction.current.dragging) return;
    e.preventDefault();
    
    const dx = e.clientX - interaction.current.lastX;
    const dy = e.clientY - interaction.current.lastY;

    interaction.current.lastX = e.clientX;
    interaction.current.lastY = e.clientY;

    setPos((prev) => {
      const p = prev[id] || { x: 0, y: 0 };
      return { ...prev, [id]: { x: p.x + dx, y: p.y + dy } };
    });
  };

  const handleMouseUp = (e) => {
    interaction.current.dragging = false;
    if(e && e.currentTarget) e.currentTarget.style.cursor = "grab";
  };

  /* ================= TOUCH EVENTS ================= */
  const handleTouchStart = (e, id) => {
    if (e.touches.length === 1) {
      interaction.current.dragging = true;
      interaction.current.lastX = e.touches[0].clientX;
      interaction.current.lastY = e.touches[0].clientY;
      interaction.current.isPinching = false;
    } else if (e.touches.length === 2) {
      interaction.current.isPinching = true;
      interaction.current.dragging = false;
      interaction.current.pinchDist = getDistance(e.touches);
    }
  };

  const handleTouchMove = (e, id) => {
    // Prevent default browser scrolling only when interacting with map
    if (interaction.current.dragging || interaction.current.isPinching) {
    }

    if (interaction.current.dragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - interaction.current.lastX;
      const dy = e.touches[0].clientY - interaction.current.lastY;

      interaction.current.lastX = e.touches[0].clientX;
      interaction.current.lastY = e.touches[0].clientY;

      setPos((prev) => {
        const p = prev[id] || { x: 0, y: 0 };
        return { ...prev, [id]: { x: p.x + dx, y: p.y + dy } };
      });
    } else if (interaction.current.isPinching && e.touches.length === 2) {
      const newDist = getDistance(e.touches);
      const el = mapRefs.current[id];
      if (!el) return;
      
      const rect = el.getBoundingClientRect();
      const midpoint = getMidpoint(e.touches, rect);

      const currentZoom = getVal(zoom, id, 1);
      const scaleFactor = newDist / interaction.current.pinchDist; 
      
      // Slow down pinch speed slightly for better control
      const dampenedScale = 1 + (scaleFactor - 1) * 0.8; 

      updateZoom(id, currentZoom * dampenedScale, midpoint);
      
      interaction.current.pinchDist = newDist;
    }
  };

  const handleTouchEnd = () => {
    interaction.current.dragging = false;
    interaction.current.isPinching = false;
  };

  /* ================= WHEEL EVENT (Optimized) ================= */
  useEffect(() => {
    const handleWheel = (e, id) => {
      e.preventDefault();
      
      const el = mapRefs.current[id];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      // Access state from Ref to avoid stale closures
      const currentZoom = getVal(zoomRef.current, id, 1);
      
      let delta = -e.deltaY * 0.002; 
      if (Math.abs(e.deltaY) > 50) {
        delta = e.deltaY < 0 ? 0.15 : -0.15;
      }

      updateZoom(id, currentZoom + delta, { x: offsetX, y: offsetY });
    };

    const cleanupFns = [];
    
    CONSERVATION_AREAS.forEach((a) => {
      const el = mapRefs.current[a.id];
      if (el) {
        const handler = (e) => handleWheel(e, a.id);
        el.addEventListener("wheel", handler, { passive: false });
        cleanupFns.push(() => el.removeEventListener("wheel", handler));
      }
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []); 

  /* ================= UI HELPERS ================= */
  const toggleFullscreen = (id) => {
    const el = mapRefs.current[id];
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  const openDetail = (area) => { setDetail(area); setShowDetail(true); };
  const closeDetail = () => { setShowDetail(false); setTimeout(() => setDetail(null), 300); };

  return (
    <section id="area">
      <div className="area-header">
        <h2>Explore Conservation Areas</h2>
      </div>

      <div className="area-container">
        {CONSERVATION_AREAS.map((a) => (
          <div className="area-card" key={a.id}>
            <div
              className="map-view"
              ref={(el) => (mapRefs.current[a.id] = el)}
              onMouseDown={(e) => handleMouseDown(e, a.id)}
              onMouseMove={(e) => handleMouseMove(e, a.id)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart(e, a.id)}
              onTouchMove={(e) => handleTouchMove(e, a.id)}
              onTouchEnd={handleTouchEnd}
            >
              <div className="map-content-wrapper"
                   style={{
                     transform: `translate(${getVal(pos, a.id, {x:0,y:0}).x}px, ${getVal(pos, a.id, {x:0,y:0}).y}px) scale(${getVal(zoom, a.id, 1)})`,
                     transformOrigin: "0 0",
                   }}
              >
                <img
                  src={a.image}
                  alt={a.name}
                  draggable={false}
                />
              </div>

              <div className="map-controls">
                <button onClick={() => handleZoomBtn(a.id, 0.5)} title="Zoom In">
                  <ZoomIn size={20} strokeWidth={2.5} />
                </button>
                <button onClick={() => handleZoomBtn(a.id, -0.5)} title="Zoom Out">
                  <ZoomOut size={20} strokeWidth={2.5} />
                </button>
                <button onClick={() => resetView(a.id)} title="Reset View">
                  <Undo2 size={20} strokeWidth={2.5} />
                </button>
                <button onClick={() => toggleFullscreen(a.id)} title={fullscreenId === a.id ? "Exit Fullscreen" : "Fullscreen"}>
                  {/* Toggle Icon based on state */}
                  {fullscreenId === a.id ? (
                    <Minimize2 size={20} strokeWidth={2.5} />
                  ) : (
                    <Maximize2 size={20} strokeWidth={2.5} />
                  )}
                </button>
              </div>
            </div>

            <div className="area-info">
              <h3>{a.name}</h3>
              <p>{a.shortDesc}</p>
              <div className="area-actions">
                <button className="btn-detail" onClick={() => openDetail(a)}>
                  Explore Details
                </button>
                <button
                  className="btn-apply"
                  onClick={() => navigate("/apply", { state: { areaId: a.id } })}
                >
                  Apply Permit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      <div className={`detail-overlay ${showDetail ? "active" : ""}`} onClick={closeDetail}>
        <div className={`detail-popup ${showDetail ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
          {detail && (
            <>
              <div className="detail-header">
                <h3>{detail.name}</h3>
                <button className="btn-close-icon" onClick={closeDetail}>
                  <X size={24} />
                </button>
              </div>
              <div className="detail-body">
                <div className="detail-img-container">
                  <img src={detail.image} alt={detail.name} />
                </div>
                <div className="detail-content">
                  <p className="detail-desc">{detail.desc}</p>
                  {detail.treks?.length > 0 && (
                    <div className="detail-treks">
                      <h4>Popular Treks</h4>
                      <ul>
                        {detail.treks.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="detail-footer">
                <button className="btn-close" onClick={closeDetail}>Close</button>
                <button 
                  className="btn-apply-lg" 
                  onClick={() => navigate("/apply", { state: { areaId: detail.id } })}
                >
                  Apply for Permit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Area;