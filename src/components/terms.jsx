// src/components/Terms.jsx
import React, { useState } from "react";

import "./css/terms.css";

const Terms = ({ onAgree }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="terms-overlay">
      <div className="terms-modal" role="dialog" aria-modal="true">
        <h2>NOTE:</h2>

        <p>
          Trekking permits are non-transferable and non-refundable, so make sure
          to plan your trekking dates and itinerary carefully.
        </p>

        <ul>
          <li>This Entry Permit is valid for single entry only.</li>
          <li>
            A person entering the Conservation Area shall abide by the{" "}
            <a
              href="https://csrcnepal.org/wp-content/uploads/2020/11/National-Parks-and-Wildlife-Conservation-Act-2029-1973.pdf"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Park and Wildlife Conservation Act 2029 B.S. (1973)
            </a>{" "}
            and the Regulations made under this Act.
          </li>
          <li>This Entry Permit must be carried during the entire trip.</li>
        </ul>

        <h3>FOR YOUR INFORMATION</h3>
        <ul>
          <li>Children below 10 years do not require a permit.</li>
          <li>Drones are strictly prohibited without prior approval.</li>
          <li>
            Entry fee: <strong>NRs. 3,000</strong> (Foreigners),{" "}
            <strong>NRs. 1,000</strong> (SAARC) + 2.9% online payment charge.
          </li>
          <li>Double fees are charged for permits issued at check-posts.</li>
          <li>Hunting is strictly prohibited.</li>
          <li>Fishing permits are issued by local committees.</li>
          <li>
            NTNC approval is required for scientific research or specimen
            collection.
          </li>
          <li>
            Please follow the Minimum Impact Code for environmental safety.
          </li>
        </ul>

        <div className="agree-section">
          <label htmlFor="agree-checkbox" className="agree-label">
            <input
              type="checkbox"
              id="agree-checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span> I have read and agree to the terms and conditions</span>
          </label>

          <button
            className="agree-button"
            disabled={!checked}
            onClick={onAgree}
          >
            Agree &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
