// src/components/form/purpose.jsx
import React from "react";
import { CONSERVATION_AREAS, PURPOSES } from "../../data";
import { ArrowRight } from "lucide-react";


const Purpose = ({ data, update, onNext }) => {
  const area = CONSERVATION_AREAS.find(
    (a) => a.id === Number(data.areaId)
  );

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.startDate < today) {
      alert("Start date cannot be before today.");
      return;
    }

    if (data.endDate < data.startDate) {
      alert("End date cannot be before start date.");
      return;
    }

    onNext();
  };

  return (
    <div className="purpose-container">
      <div className="form-card">
        <form onSubmit={handleSubmit} className="purpose-form">
          
          <header className="form-header">
            <div>
              <h2 className="form-title">Permit Details</h2>
              <p className="form-subtitle">Select your destination and duration.</p>
            </div>
            <div className="step-indicator">Step 1/4</div>
          </header>

          <div className="form-content">
            
              {/* PURPOSE */}
              <div className="form-group">
                <label>Purpose of Visit</label>
                <div className="select-wrapper">
                  <select
                    value={data.purpose}
                    onChange={(e) => update({ purpose: e.target.value })}
                    required
                  >
                    <option value="">Select Purpose</option>

                    {PURPOSES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            

            {/* AREA */}
            <div className="form-group">
              <label>Conservation Area</label>
              <div className="select-wrapper">
                <select
                  value={data.areaId}
                  onChange={(e) =>
                    update({
                      areaId: e.target.value,
                      trek: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                  required
                >
                  <option value="">Select an Area</option>
                  {CONSERVATION_AREAS.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* TREK & DATES (Conditional Render) */}
            {area && (
              <div className="dynamic-section">
                <div className="form-group">
                  <label>Trek Route</label>
                  <div className="select-wrapper">
                    <select
                      value={data.trek}
                      onChange={(e) => update({ trek: e.target.value })}
                      required
                    >
                      <option value="">Select Trek Route</option>
                      {area.treks.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="time-field">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={data.startDate || ""}
                      min={today}
                      onChange={(e) => update({ startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={data.endDate || ""}
                      min={data.startDate || today}
                      onChange={(e) => update({ endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-next">Next Step<ArrowRight size={18} /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Purpose;