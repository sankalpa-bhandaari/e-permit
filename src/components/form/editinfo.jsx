import React, { useState } from 'react';
import { NATIONALITIES, GENDERS } from '../../data';
import { BiX, BiSave, BiUndo } from "react-icons/bi";
import './formcss/editinfo.css';

const EditApplicant = ({ applicant, index, onSave, onCancel }) => {
  const [person, setPerson] = useState({ ...applicant });

  const handleChange = (field, value) => {
    let updatedPerson = { ...person, [field]: value };
    
    // Auto-update country if nationality changes
    if (field === "nationality") {
      const selected = NATIONALITIES.find((n) => n.nationality === value);
      updatedPerson.country = selected?.country || "";
    }
        // Auto-calculate age when date of birth changes
        if (field === "dateOfBirth") {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
          updatedPerson.Age = age;
        }
    
    
    setPerson(updatedPerson);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass index back to parent if needed, or just the person object
    onSave(person); 
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-card">
        <header className="edit-modal-header">
          <div className="header-title-group">
            <h3>Update Applicant</h3>
            <p>Modify details for {person.FirstName || 'Applicant'}</p>
          </div>
          <button className="btn-close-icon" onClick={onCancel} aria-label="Close">
            <BiX />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="edit-modal-form">
          <div className="edit-grid">
            <div className="edit-field">
              <label>First Name</label>
              <input 
                type="text"
                value={person.FirstName || ""} 
                onChange={e => handleChange('FirstName', e.target.value)} 
                required 
                placeholder="e.g. Ram"
              />
            </div>

            <div className="edit-field">
              <label>Last Name</label>
              <input 
                type="text"
                value={person.LastName || ""} 
                onChange={e => handleChange('LastName', e.target.value)} 
                required 
                placeholder="e.g. Sharma"
              />
            </div>

            <div className="edit-field">
              <label>Passport Number</label>
              <input 
                type="text"
                value={person.PassportNumber || ""} 
                onChange={e => handleChange('PassportNumber', e.target.value)} 
                required 
              />
            </div>

            <div className="edit-field">
              <label>Date of Birth</label>
              <input 
                type="date" 
                value={person.dateOfBirth || ""} 
                onChange={e => handleChange('dateOfBirth', e.target.value)} 
                required 
              />
            </div>

             <div className="edit-field">
               <label>Age</label>
               <input 
                 type="number"
                 value={person.Age || ""} 
                 readOnly 
                 placeholder="Auto-calculated"
               />
             </div>
            <div className="edit-field">
              <label>Nationality</label>
              <div className="select-wrapper">
                <select 
                  value={person.nationality || ""} 
                  onChange={e => handleChange('nationality', e.target.value)}
                  required
                >
                  <option value="" disabled>Select Nationality</option>
                  {NATIONALITIES.map((n) =>
                    <option key={n.nationality} value={n.nationality}>{n.nationality}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="edit-field">
              <label>Gender</label>
              <div className="select-wrapper">
                <select 
                  value={person.gender || ""} 
                  onChange={e => handleChange('gender', e.target.value)}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  {GENDERS.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <footer className="edit-modal-footer">
            <button type="button" className="btn-discard" onClick={onCancel}>
              <BiUndo /> Discard
            </button>
            <button type="submit" className="btn-update">
              <BiSave /> Update Details
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditApplicant;