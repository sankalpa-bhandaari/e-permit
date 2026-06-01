// src/components/form/ProgressBar.jsx
import "./formcss/progessbar.css";

function ProgressBar({ currentStep, steps }) {
  return (
    <div className="stepper-wrapper">
      <div className="stepper">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;

          return (
            <div className="step-item" key={index}>
              <div
                className={`step-circle ${
                  isDone ? "done" : isActive ? "active" : ""
                }`}
              >
                {isDone ? "✓" : index + 1}
              </div>

              <span className={`step-label ${isActive ? "active" : ""}`}>
                {label}
              </span>

              {index !== steps.length - 1 && (
                <div className={`step-line ${isDone ? "done" : ""}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ProgressBar;