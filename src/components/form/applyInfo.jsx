import React, { useState, useEffect } from "react";
import { NATIONALITIES, GENDERS } from "../../data";
import { BiTrash, BiUserPlus, } from "react-icons/bi";
import { ArrowRight, ArrowLeft } from "lucide-react";
import "./formcss/applyInfo.css";

const emptyPerson = {
  FirstName: "",
  MiddleName: "",
  LastName: "",
  Age: "",
  Occupation: "",
  PassportNumber: "",
  dateOfBirth: "",
  nationality: NATIONALITIES[0].nationality,
  country: NATIONALITIES[0].country,
  gender: GENDERS[0],
};

const isOlderThan10 = (dob) => {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
  return age >= 10;
};

const ApplyInfo = ({ data, update, onNext, onPrev }) => {
  const [type, setType] = useState(data.applicationType || "individual");
  const [localApplicants, setLocalApplicants] = useState(
    data.applicants && data.applicants.length > 0 ? data.applicants : [{ ...emptyPerson }]
  );
  const [usingGuide, setUsingGuide] = useState(data.emergencyAndGuide?.usingGuide || false);
  const [guideInfo, setGuideInfo] = useState(data.emergencyAndGuide?.guideInfo || {
    guideName: "", licenseNumber: "", contactNumber: "", agency: "", porterName: "", porterNumber: "",
  });

  useEffect(() => {
    if (data.isAddingNew) {
      setType("group");
      setLocalApplicants((prev) => [...prev, { ...emptyPerson }]);
      update({ isAddingNew: false });
    }
  }, [data.isAddingNew, update]);

  const handleMemberChange = (index, field, value) => {
    const updated = [...localApplicants];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "nationality") {
      const selected = NATIONALITIES.find((n) => n.nationality === value);
      updated[index].country = selected?.country || "";
    }
        if (field === "dateOfBirth") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
      updated[index].Age = age;
    }
    setLocalApplicants(updated);
  };

  const addMember = () => setLocalApplicants([...localApplicants, { ...emptyPerson }]);
  const removeMember = (index) => setLocalApplicants(localApplicants.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < localApplicants.length; i++) {
      if (!isOlderThan10(localApplicants[i].dateOfBirth)) {
        alert(`Applicant ${i + 1} must be older than 10 years.`);
        return;
      }
    }
    update({
      applicationType: type,
      applicants: localApplicants,
      emergencyAndGuide: { usingGuide, guideInfo: usingGuide ? guideInfo : null },
    });
    onNext();
  };

  const renderFormFields = (index) => {
    const member = localApplicants[index];
    return (
      <div className="applicant-grid">
        {["FirstName", "MiddleName", "LastName", "Occupation", "PassportNumber", "dateOfBirth"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type={field === "dateOfBirth" ? "date" : "text"}
              value={member[field] || ""}
              onChange={(e) => handleMemberChange(index, field, field === "PassportNumber" ? e.target.value.replace(/\D/g, "") : e.target.value)}
              required={field !== "MiddleName"}
            />
          </div>
        ))}
        <div className="form-group">
          <label>Nationality</label>

          <select value={member.nationality} onChange={(e) => handleMemberChange(index, "nationality", e.target.value)} required>
             <option value="">Select Nationality</option>
            {NATIONALITIES.map((n) => <option key={n.nationality} value={n.nationality}>{n.nationality}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select value={member.gender} onChange={(e) => handleMemberChange(index, "gender", e.target.value)} required>
             <option value="">Select Gender</option>
            {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="apply-container">
      <div className="apply-card">
        <header className="apply-header">
          <div className="title-area">
            <h1>Applicant Information</h1>
            <p> Personal & Safety Details</p>
          </div>
          <div className="progress-badge">2/4</div>
        </header>

        <form onSubmit={handleSubmit} className="apply-form">
          {/* Segmented Control for Switcher */}
          <div className="segmented-control">
            <button type="button" className={type === "individual" ? "active" : ""} 
              onClick={() => localApplicants.length > 1 ? window.confirm("Remove other members?") && setLocalApplicants([localApplicants[0]]) || setType("individual") : setType("individual")}>
              Individual
            </button>
            <button type="button" className={type === "group" ? "active" : ""} onClick={() => setType("group")}>
              Group / Family
            </button>
          </div>

          <section className="form-section">
            <div className="section-title">
              <h3>{type === "individual" ? "Personal Details" : "Group Members"}</h3>
            </div>
            
            {localApplicants.map((_, index) => (
              <div key={index} className="member-card">
                {type === "group" && (
                  <div className="member-card-header">
                    <span>Member #{index + 1}</span>
                    {localApplicants.length > 1 && (
                      <button type="button" className="remove-btn" onClick={() => removeMember(index)}><BiTrash size={23} /></button>
                    )}
                  </div>
                )}
                {renderFormFields(index)}
              </div>
            ))}

            {type === "group" && (
              <button type="button" className="add-member-btn" onClick={addMember}>
                <BiUserPlus size={23} /> Add Another Member
              </button>
            )}
          </section>

          <section className="form-section highlight">
            <div className="section-title"><h3>Emergency Contact</h3></div>
            <div className="emergency-grid">
              <div className="form-group">
                <label>Contact Number</label>
                <input type="tel" value={data.emergencyNumber || ""} onChange={(e) => update({emergencyNumber: e.target.value.replace(/\D/g, "")})} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={data.email || ""} onChange={(e) => update({email: e.target.value})} required />
              </div>
              <div className="form-group full-width">
                <label>Full Address (Optional)</label>
                <textarea rows="2" value={data.address || ""} onChange={(e) => update({address: e.target.value})} />
              </div>
            </div>
          </section>

          <section className="form-section guide-box">
            <label className="custom-checkbox">
              <input type="checkbox" checked={usingGuide} onChange={(e) => setUsingGuide(e.target.checked)} />
              <span className="checkmark"></span>
              Using a Registered Guide or Porter?
            </label>

            {usingGuide && (
              <div className="guide-section-container">
                {/*  Toggle between Independent Guide or Agency */}
                <div className="guide-type-selector" style={{ marginBottom: "1rem" }}>
                  <label style={{ marginRight: "15px" }}>
                    <input
                      type="radio"
                      name="serviceType"
                      value="independent"
                      checked={guideInfo.serviceType !== "agency"} // Default to Independent
                      onChange={() =>
                        setGuideInfo((prev) => ({ ...prev, serviceType: "independent" }))
                      }
                    />{" "}
                    Independent Guide
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="serviceType"
                      value="agency"
                      checked={guideInfo.serviceType === "agency"}
                      onChange={() =>
                        setGuideInfo((prev) => ({ ...prev, serviceType: "agency" }))
                      }
                    />{" "}
                    Agency
                  </label>
                </div>

                {/*  Grid for Inputs */}
                <div className="guide-inner-grid">
                  {/* Dynamic Fields List based on selection */}
                  {(guideInfo.serviceType === "agency"
                    ? [
                        "agencyName",
                        "agencyContactNumber",
                        "guideName",
                        "guideLicenseNumber",
                        "guideContactNumber",
                        "porterName", // Keep porter if needed for agencies
                        "porterNumber",
                      ]
                    : [
                        "guideName",
                        "guideLicenseNumber",
                        "guideContactNumber",
                        "porterName",
                        "porterNumber",
                      ]
                  ).map((field) => (
                    <div className="form-group" key={field}>
                      <label>
                        {field
                          .replace(/([A-Z])/g, " $1") 
                          .replace(/^./, (str) => str.toUpperCase())} {/* Capitalize first letter */}
                      </label>

                      <input
                        // Set type to 'tel' for number fields
                        type={
                          ["porterNumber", "guideContactNumber", "guideLicenseNumber", "agencyContactNumber"].includes(field)
                            ? "tel"
                            : "text"
                        }
                        value={guideInfo[field] || ""}
                        onChange={(e) =>
                          setGuideInfo((prev) => ({
                            ...prev,
                            [field]:
                              // Logic to allow only numbers for specific fields
                              [
                                "porterNumber",
                                "guideLicenseNumber",
                                "guideContactNumber",
                                "agencyContactNumber",
                              ].includes(field)
                                ? e.target.value.replace(/\D/g, "")
                                : e.target.value,
                          }))
                        }
                        // Logic for required fields
                        required={
                          field === "guideName" ||
                          field === "guideContactNumber" ||
                          field === "guideLicenseNumber" ||
                          field === "agencyName" ||
                          field === "agencyContactNumber"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onPrev}><ArrowLeft size={20} /> Back</button>
            <button type="submit" className="btn-primary">Next Step <ArrowRight size={20} /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyInfo;