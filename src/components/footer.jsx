import React, { useState } from "react";
import { MapPinned, ArrowUpRight, Mail, Phone, FileText } from "lucide-react"; // Import Icons
import "./css/footer.css";

// --- Internal Modal Component ---
const PermitTypeModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Permit Types</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <ol className="type-list">
            <li>Annapurna Conservation Area Permit (ACAP)</li>
            <li>Manaslu Conservation Area Permit (MCAP)</li>
            <li>Gaurishankar Conservation Area Permit (GCAP)</li>
            <li>Tourism Permit</li>
            <li>Research Permit</li>
            <li>Educational / Conservation Work Permit</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
const ConservationAreasModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Conservation Areas</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <ol className="type-list">
            <li>Annapurna Conservation Area (ACA)</li>
            <li>Manaslu Conservation Area  (MCA)</li>
            <li>Gaurishankar Conservation Area (GCA)</li>
            
          </ol>
        </div>
      </div>
    </div>
  );
};

// --- Main Footer Component ---
const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* About */}
            <div className="footer-column">
              <h3 className="footer-title">About E-Permit</h3>
              <p className="footer-desc">
                Official digital permit system for Nepal's conservation areas. 
                Streamlining access for trekkers and researchers while preserving nature.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li onClick={() => setActiveModal("PermitType")} className="clickable">View Permit Types
                </li>
                <li><a href="/rules">Rules & Regulations</a></li>
                <li onClick={() => setActiveModal("conservationAreas")} className="clickable">Conservation Areas</li>
              </ul>
            </div>

            {/*  Contact */}
            <div className="footer-column">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="contact-info">
                {/* Email */}
                <li>
                  <div className="icon-wrappers"><Mail size={18} /></div>
                 <a href="mailto:info@ntnc.org.np">info@ntnc.org.np</a>
                </li>

                {/* Phone */}
                <li>
                  <div className="icon-wrappers"><Phone size={18} /></div>
                  <a href="tel:+015526571">01-5526571</a>
                </li>

                {/* Location with MapPinned & ArrowUpRight */}
                <li>
                  <div className="icon-wrappers"><MapPinned size={18} /></div>
                 
                  <a 
                    href="https://maps.app.goo.gl/UecUrrtwbXdpJeJy9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    Godawari Sadak, Lalitpur
                    {/* The requested ArrowUpRight icon */}
                    <ArrowUpRight size={14} className="external-icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} National Trust for Nature Conservation. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal Render */}
      {activeModal === "PermitType" && (
        <PermitTypeModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "conservationAreas" && (
        <ConservationAreasModal onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};

export default Footer;