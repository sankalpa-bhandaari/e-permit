// src/components/form/Documents.jsx
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from "lucide-react";

const Documents = ({ data, update, onPrev, onNext }) => {
  const [error, setError] = useState('');

  const applicants = Array.isArray(data.applicants) ? data.applicants : [];

  const handleFileChange = (index, type, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = type === 'passport'
      ? ['image/jpeg', 'image/png', 'application/pdf']
      : ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type for ${type}. Allowed: ${allowedTypes.join(', ')}`);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('File too large (max 2MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newApplicants = [...applicants];
      if (!newApplicants[index]) return;

      newApplicants[index] = {
        ...newApplicants[index],
        [`${type}Preview`]: reader.result,
        [`${type}FileName`]: file.name,
        [`${type}FileType`]: file.type,
      };

      update({ applicants: newApplicants });
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (index, type) => {
    const newApplicants = [...applicants];
    if (newApplicants[index]) {
      newApplicants[index] = {
        ...newApplicants[index],
        [`${type}Preview`]: null,
        [`${type}FileName`]: null,
        [`${type}FileType`]: null,
      };
      update({ applicants: newApplicants });
    }
  };

  const canContinue = applicants.length > 0 && applicants.every(
    app => app.passportPreview && app.photoPreview
  );

  return (
    <div className="documents-page">
      <header>
        <h2>Upload Required Documents</h2>
        <div className="step-badge">Step 3 of 4</div>
      </header>

      {applicants.length === 0 && (
        <div className="empty-warning">
          No applicants added. Please go back to Step 2.
        </div>
      )}

      {applicants.map((app, index) => (
        <div key={index} className="applicant-upload-card">
          <h3>
            {app.FirstName || 'Applicant'} {app.LastName || ''} #{index + 1}
          </h3>

          <div className="upload-grid">
            {/* Passport / ID */}
            <div className="upload-zone">
              <label htmlFor={`passport-upload-${index}`} className="upload-label">
                <input
                  id={`passport-upload-${index}`}
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  hidden
                  onChange={e => handleFileChange(index, 'passport', e)}
                />
                {app.passportPreview ? (
                  <div className="file-preview">
                    {app.passportFileType?.startsWith('image') ? (
                      <img src={app.passportPreview} alt="Passport preview" />
                    ) : (
                      <div className="pdf-icon">PDF</div>
                    )}
                    <span className="file-name">{app.passportFileName}</span>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => removeFile(index, 'passport')}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📄</div>
                    <span>Passport / Citizenship / ID</span>
                    <small>JPG, PNG, PDF • Max 2MB</small>
                  </div>
                )}
              </label>
            </div>

            {/* Photo */}
            <div className="upload-zone">
              <label htmlFor={`photo-upload-${index}`} className="upload-label">
                <input
                  id={`photo-upload-${index}`}
                  type="file"
                  accept="image/jpeg,image/png"
                  hidden
                  onChange={e => handleFileChange(index, 'photo', e)}
                />
                {app.photoPreview ? (
                  <div className="file-preview">
                    <img src={app.photoPreview} alt="Photo preview" className="photo-img" />
                    <span className="file-name">{app.photoFileName}</span>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => removeFile(index, 'photo')}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">🖼️</div>
                    <span>Passport Size Photo</span>
                    <small>JPG, PNG • Max 2MB</small>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      ))}

      {error && <div className="error-alert">{error}</div>}

      <div className="form-actions">
        <button type="button" className="btn-back" onClick={onPrev}>
           <ArrowLeft size={18} /> Previous
        </button>
        <button
          type="button"
          className="btn-continue"
          onClick={() => (canContinue ? onNext() : setError('Both documents required for each applicant'))}
          disabled={!canContinue}
        >
          Continue to Review <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Documents;