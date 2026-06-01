import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
// Ensure these icons are installed: npm install react-icons
import { BiEditAlt, BiTrash, BiMap, BiCalendar, BiUser, BiUserPlus , BiPhone, BiInfoCircle } from "react-icons/bi";
import { 
  CONSERVATION_AREAS, 
  onlinePaymentChargePercent,
  getFeeDetails
} from "../../data";
import EditApplicant from "./editinfo";
import "./formcss/review.css";

const Review = ({ data, update, onPrev, goToStep }) => {
  const navigate = useNavigate();

  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, index: null, name: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const areaName = CONSERVATION_AREAS.find((a) => a.id === Number(data.areaId))?.name || "Unknown Area";

  const subTotal = data.applicants?.reduce((sum, app) => sum + (getFeeDetails(app.nationality)?.amount || 0), 0) || 0;
  const onlineCharge = (subTotal * onlinePaymentChargePercent) / 100;
  const grandTotal = subTotal + onlineCharge;

  const showToastMessage = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const confirmDelete = () => {
    const updated = data.applicants.filter((_, i) => i !== deleteModal.index);
    update({ applicants: updated });
    setDeleteModal({ show: false, index: null, name: "" });
    showToastMessage("Applicant removed.", "success");
  };

  const handleSaveEdit = (updatedPerson) => {
    const updated = [...data.applicants];
    updated[editingIndex] = updatedPerson;
    update({ applicants: updated });
    setEditingIndex(null);
    showToastMessage("Applicant updated.");
  };

  const handleSubmitApplication = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("active_user"));
      if (!currentUser) {
        showToastMessage("Session expired. Please login.", "error");
        return;
      }

      const permitId = `PERMIT-${Date.now().toString().slice(-6)}`;

      const newPermit = {
        id: permitId,
        userId: currentUser.id,
        area: areaName,
        age: data.applicants[0]?.Age || "N/A",
        areaId: data.areaId,
        date: new Date().toLocaleDateString(),
        applicants: data.applicants,
        trek: data.trek,
        dates: { start: data.startDate, end: data.endDate },
        amount: grandTotal,
        timestamp: Date.now()
      };

      const existingHistory = JSON.parse(localStorage.getItem("permitHistory") || "[]");
      let historyToSave = [newPermit, ...existingHistory];
      let isSaved = false;

      // DYNAMIC STORAGE LOGIC
      while (!isSaved && historyToSave.length > 0) {
        try {
          localStorage.setItem("permitHistory", JSON.stringify(historyToSave));
          isSaved = true; 
        } catch (storageError) {
          if (storageError.name === "QuotaExceededError" || storageError.name === "NS_ERROR_DOM_QUOTA_REACHED") {
            if (historyToSave.length > 1) {
              historyToSave.pop();
            } else {
              // Edge-case: If even 1 permit exceeds the quota, it's likely due to huge Base64 uploaded images.
              // Strip heavy fields dynamically to force it to fit.
              const sanitizedPermit = JSON.parse(JSON.stringify(historyToSave[0]));
              if (sanitizedPermit.applicants) {
                sanitizedPermit.applicants = sanitizedPermit.applicants.map(app => {
                  let cleanApp = { ...app };
                  Object.keys(cleanApp).forEach(key => {
                    if (typeof cleanApp[key] === "string" && cleanApp[key].length > 100000) {
                      cleanApp[key] = "[Base64 Image Removed]";
                    }
                  });
                  return cleanApp;
                });
              }
              historyToSave[0] = sanitizedPermit;
              try {
                localStorage.setItem("permitHistory", JSON.stringify(historyToSave));
                isSaved = true;
              } catch (e) {
                break; 
              }
            }
          } else {
            break; 
          }
        }
      }

      showToastMessage("Application Submitted!", "success");
      setTimeout(() => navigate("/printPermit"), 1500);

    } catch (err) {
      console.error(err);
      showToastMessage("Critical Error. Please clear browser cache.", "error");
    }
  };

  const tripDays = data.startDate && data.endDate
    ? Math.ceil((new Date(data.endDate) - new Date(data.startDate)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  // CSS Class Helper
  const getBadgeClass = (type) => {
    if (!type) return "badge-default";
    const t = type.toLowerCase();
    if (t.includes("nepal")) return "badge-nepal";
    if (t.includes("saarc")) return "badge-saarc";
    return "badge-foreign";
  };

  return (
    <div className="review-container">
      <div className="review-wrapper">
        <header className="review-header">
          <div className="header-text">
            <h2 className="title">Review Application</h2>
            <p className="subtitle">Verify all details before final submission.</p>
          </div>
          <div className="step-badge">Step 4/4</div>
        </header>

        <div className="review-body">
          <div className="info-grid-container">
            <div className="info-card">
              <h3 className="card-heading"><BiMap /> Trip Details</h3>
              <div className="info-row"><span>Destination:</span><strong>{areaName}</strong></div>
              <div className="info-row"><span>Dates:</span><strong>{data.startDate} to {data.endDate}</strong></div>
              <div className="info-row"><span>Duration:</span><span className="badge-days">{tripDays} Days</span></div>
            </div>
            <div className="info-card">
              <h3 className="card-heading"><BiPhone /> Contact</h3>
              <div className="info-row"><span>Emergency:</span><strong>{data.emergencyNumber}</strong></div>
              <div className="info-row"><span>Guide:</span><strong>{data.emergencyAndGuide?.usingGuide ? "Yes" : "No"}</strong></div>
            </div>
          </div>

          <section className="applicants-section">
            <h3 className="section-title"><BiUser /> Applicants</h3>
            <div className="applicants-grid">
              {data.applicants?.map((app, index) => (
                <div key={index} className="applicant-card">
                  <div className="app-avatar">{app.FirstName?.charAt(0)}</div>
                  <div className="app-info">
                    <h4>{app.FirstName} {app.LastName}</h4>
                    <p>{getFeeDetails(app.nationality)?.countryName}</p>
                  </div>
                  <div className="app-actions">
                    <button onClick={() => setEditingIndex(index)} className="icon-btn edit"><BiEditAlt /></button>
                    <button onClick={() => setDeleteModal({show:true, index, name: app.FirstName})} className="icon-btn delete"><BiTrash /></button>
                  </div>
                </div>
              ))}
              <div className="applicant-card add-new-card" onClick={() => { update({ isAddingNew: true }); goToStep(1); }}>
                <div className="add-icon"> <BiUserPlus size={23} /></div>
                <h4>Add Person</h4>
              </div>
            </div>
          </section>

          <section className="billing-section">
            <h3 className="section-title"><BiInfoCircle /> Fee Details</h3>
            <div className="bill-box">
              <table className="bill-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Country / Category</th>
                    <th className="text-right">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {data.applicants?.map((app, index) => {
                    const fee = getFeeDetails(app.nationality);
                    return (
                      <tr key={index}>
                        <td className="name-cell">
                          {app.FirstName} {app.LastName}
                        </td>
                         <td>
                          {app.Age}
                        </td>
                        <td>
                          <div className="category-cell">
                            {/*  Country Name Text */}
                            <span className="country-text">{fee?.countryName}</span>
                            
                            {/*  Category Badge (SAARC, Foreigner, etc.) */}
                            <span className={`category-badge ${getBadgeClass(fee?.type)}`}>
                              {fee?.type}
                            </span>
                          </div>
                        </td>
                        <td className="text-right fee-amount">
                          NPR {fee?.amount.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="bill-footer">
                <div className="bill-row"><span>Subtotal</span><span>NPR {subTotal.toLocaleString()}</span></div>
                <div className="bill-row"><span>Service Charge (2.9%)</span><span>NPR {onlineCharge.toFixed(2)}</span></div>
                <div className="bill-row total-row"><span>Total Payable</span><span>NPR {grandTotal.toLocaleString()}</span></div>
              </div>
            </div>
          </section>
        </div>

        <div className="review-footer">
          <button type="button" className="btn-back" onClick={onPrev}>Back</button>
          <button type="button" className="btn-submit" onClick={handleSubmitApplication}>Submit Application</button>
        </div>
      </div>

      {editingIndex !== null && (
        <EditApplicant
          applicant={data.applicants[editingIndex]}
          onSave={handleSaveEdit}
          onCancel={() => setEditingIndex(null)}
        />
      )}

      {deleteModal.show && (
        <div className="modal-backdrop">
          <div className="modal-container warning-modal">
            <h3>Remove Applicant?</h3>
            <p>Delete <strong>{deleteModal.name}</strong>?</p>
            <div className="modal-actions">
              <button className="btn-modal-cancel" onClick={() => setDeleteModal({ show: false })}>Cancel</button>
              <button className="btn-modal-delete" onClick={confirmDelete}>Remove</button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Review;
