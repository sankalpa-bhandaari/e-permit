 import React from "react";
import "./css/payment.css";
import { VisaIcon, MastercardIcon } from "react-svg-credit-card-payment-icons";
import EsewaIcon from "../assets/esewa.png"; 

const PaymentModal = ({ totalAmount, onClose, onPaymentComplete }) => {
  
  // Simulate processing payment
  const handlePaymentClick = (method) => {
    // In a real app,  integrate API calls here
    console.log(`Processing payment via ${method}`);
    
    // Trigger the parent callback
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal">
        <div className="payment-header">
          <h2>Payment Options</h2>
          <button className="close-icon-btn" onClick={onClose}>&times;</button>
        </div>
        
        <p className="payment-subtitle">
          Total Amount: <strong>NPR {totalAmount.toLocaleString()}</strong>
        </p>

        <div className="payment-options">
          <button 
            className="payment-button visa"
            onClick={() => handlePaymentClick('Visa')}
          >
            <div className="icon-wrapper">
              <VisaIcon width={32} height={32} /> 
            </div>
            <span>Pay with Visa</span>
          </button>

          <button 
            className="payment-button mastercard"
            onClick={() => handlePaymentClick('MasterCard')}
          >
             <div className="icon-wrapper">
              <MastercardIcon width={32} height={32} /> 
            </div>
            <span>Pay with MasterCard</span>
          </button>

          <button 
            className="payment-button esewa"
            onClick={() => handlePaymentClick('eSewa')}
          >
            <div className="icon-wrapper">
              {EsewaIcon ? (
                <img src={EsewaIcon} alt="eSewa" width={34} height={34} />
              ) : (
                <span className="text-icon">eSewa</span>
              )}
            </div>
            <span>Pay with eSewa</span>
          </button>
        </div>

        <button className="button-cancel" onClick={onClose}>
          Cancel 
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
