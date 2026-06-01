import React from "react";
import "./css/ourservice.css";
import { SERVICES } from "../data";

const OurServices = () => {
  return (
    <section className="services-container">
      <h2 className="services-title">Our Services</h2>

      <div className="services-grid">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="service-card"
            >
              <div className="service-icon">
                {Icon && <Icon size={50} />}
              </div>

              <div className="service-content">
                <h3>{service.name}</h3>
                <div className="service-text">
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurServices;