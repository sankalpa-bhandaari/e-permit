import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Purpose from "./purpose";
import ApplyInfo from "./applyInfo";
import Document from "./document";
import Review from "./Review";
import ProgressBar from "./ProgessBar";
import Footer from "../footer";
import { BiLockAlt } from "react-icons/bi";

// CSS imports
import "./formcss/applyInfo.css";
import "./formcss/document.css";
import "./formcss/editinfo.css";
import "./formcss/purpose.css";
import "./formcss/progessbar.css";
import "./formcss/review.css";
import "../css/payment.css";
import "./formcss/auth.css"; 

const INITIAL_FORM_DATA = {
  purpose: "",
  areaId: "",
  trek: "",
  startDate: "",
  endDate: "",
  applicants: [{ FirstName: "", LastName: "", nationality: "", PassportNumber: "" }],
  emergencyAndGuide: { usingGuide: false, guideInfo: null },
  emergencyNumber: "",
  email: ""
};

const STEPS = ["Permit Details", "Applicant Info", "Documents", "Review & Pay"];

// ================= LOGIN MODAL COMPONENT =================
const LoginModal = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const storedUsers = JSON.parse(localStorage.getItem("app_users")) || [];

    if (isLogin) {
      const user = storedUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem("active_user", JSON.stringify(user));
        onSuccess(user);
      } else {
        setError("Invalid email or password.");
      }
    } else {
      if (storedUsers.find(u => u.email === formData.email)) {
        setError("User already exists!");
        return;
      }
      // Generate ID consistent with PrintPermit logic
      const newUser = { ...formData, id: "user_" + Date.now() };
      localStorage.setItem("app_users", JSON.stringify([...storedUsers, newUser]));
      localStorage.setItem("active_user", JSON.stringify(newUser));
      onSuccess(newUser);
    }
  };

  return (
    <div className="modal-overlay auth-modal">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Sign in to start your application" : "Register to track applications"}</p>
        </div>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-group">
              <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
            </div>
          )}
          <div className="auth-group">
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          </div>
          <div className="auth-group">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-auth">{isLogin ? "Log In" : "Sign Up"}</button>
        </form>
        <div className="auth-footer">
          {isLogin ? "New here? " : "Already have an account? "}
          <span onClick={() => { setIsLogin(!isLogin); setError(""); }}>
            {isLogin ? "Create Account" : "Login"}
          </span>
        </div>
        <button className="btn-close-abs" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

// ================= MAIN APPLY COMPONENT =================
const ApplyPermit = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("active_user"));
    if (user) setCurrentUser(user);
  }, []);

  const update = (data) => setFormData((prev) => ({ ...prev, ...data }));
  const goToStep = (stepIndex) => setStep(stepIndex);


  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  if (!currentUser) {
    return (
      <>
        <div className="apply-container auth-locked">
          <div className="locked-overlay" style={{minHeight: '70vh'}}>
            <div className="lock-icon-circle"><BiLockAlt size={40} /></div>
            <h3>Application Locked</h3>
            <p>Please log in to start a new permit application.</p>
            <button className="btn-big-login" onClick={() => setShowAuthModal(true)}>
              Login / Register
            </button>
          </div>
        </div>
        {showAuthModal && <LoginModal onClose={() => setShowAuthModal(false)} onSuccess={handleLoginSuccess} />}
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="apply-permit">
        <ProgressBar currentStep={step} steps={STEPS} />
        <div className="form-content">
          {step === 0 && (
            <Purpose data={formData} update={update} onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <ApplyInfo 
              data={formData} 
              update={update} 
              onNext={() => setStep(2)} 
              onPrev={() => setStep(0)} 
            />
          )}
          {step === 2 && (
            <Document 
              data={formData} 
              update={update} 
              onPrev={() => setStep(1)} 
              onNext={() => setStep(3)} 
            />
          )}
          {step === 3 && (
            <div className="review-container">
              <Review 
                data={formData} 
                update={update} 
                onPrev={() => setStep(2)} 
                goToStep={goToStep} 
              />

            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyPermit;