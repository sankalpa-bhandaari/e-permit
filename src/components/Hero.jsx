import React from "react";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import "./css/hero.css";

const Hero = () => {
  return (
    <header className="hero-section">
      <div className="hero-container">
        
        {/* LEFT COLUMN: Content */}
        <div className="hero-content">
          
          <div className="badge-wrapper">
            <span className="pill-badge">
              <span className="status-indicator"></span> 
              Official NTNC Portal
            </span>
          </div>

          <h1 className="hero-title">
            Explore Nepal’s <br />
            <span className="highlight-text">Pristine Nature.</span>
          </h1>

          <p className="hero-description">
           Annapurna, Manaslu, and Gaurishankar Conservation Areas instantly.
          </p> 
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => window.location.href = "/apply"}>
              Get Permit <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline" onClick={() => window.location.href = "/rules"}>
              Guidelines
            </button>
          </div>

          <div className="trust-indicators">
            <div className="trust-item">
              <ShieldCheck size={18} strokeWidth={2.5} />
              <span>Gov. Verified</span>
            </div>
            <div className="trust-item">
              <Zap size={18} strokeWidth={2.5} />
              <span>Instant Apply</span>
            </div>
            <div className="trust-item">
              <Globe size={18} strokeWidth={2.5} />
              <span>Intl. Payment</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Image */}
        <div className="hero-visual">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671&auto=format&fit=crop" 
            alt="Trekking in Nepal Annapurna Circuit" 
            className="hero-image"
          />
        </div>

      </div>
    </header>
  );
};

export default Hero;