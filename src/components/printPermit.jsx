import React, { useState, useEffect } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import {
  BiTrash,
  BiLockAlt,
  BiUser,
  BiLogOut,
  BiX,
} from "react-icons/bi";

import QRCode from "qrcode";
import logo from "../assets/logo.png";

import { getFeeDetails } from "../data";
import PaymentModal from "./PaymentModal";
import Footer from "./footer";

import "./css/printPermit.css";
import "./form/formcss/auth.css";

// ================= PDF STYLES =================
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#374151",
  },
  headerBox: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "2px solid #1e3a8a",
  },

headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

titleContainer: {
  textAlign: "center",
  flex: 1,
},

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 12,
    color: "#4b5563",
    textTransform: "uppercase",
  },

  govText: {
    fontSize: 10,
    color: "#dc2626",
    fontWeight: "bold",
    marginTop: 4,
  },

  badge: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#dcfce7",
  },

  badgeText: {
    fontSize: 10,
    color: "#15803d",
    fontWeight: "bold",
  },

  badgePending: {
    backgroundColor: "#fee2e2",
  },

  badgeTextPending: {
    color: "#b91c1c",
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e3a8a",
    backgroundColor: "#f3f4f6",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    marginBottom: 6,
    paddingHorizontal: 10,
  },

  label: {
    width: "30%",
    fontWeight: "bold",
    color: "#4b5563",
  },

  value: {
    width: "70%",
    color: "#111827",
  },

  table: {
    width: "100%",
    border: "1px solid #d1d5db",
    marginTop: 5,
  },

  thRow: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #d1d5db",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  tdRow: {
    flexDirection: "row",
    borderBottom: "1px solid #d1d5db",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  th: {
    fontWeight: "bold",
    color: "#111827",
  },

  td: {
    color: "#374151",
  },

  col1: {
    width: "40%",
  },

  col2: {
    width: "20%",
  },
  col3: {
    width: "20%",
  },

  col4: {
    width: "20%",
    textAlign: "right",
  },

  colSpan2: {
    width: "80%",
    textAlign: "right",
    paddingRight: 15,
  },

  totalLabel: {
    color: "#4b5563",
    fontWeight: "bold",
  },

  grandTotalRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  grandTotalLabel: {
    fontWeight: "bold",
    color: "#1e3a8a",
    fontSize: 11,
  },

  grandTotalValue: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 11,
    textAlign: "right",
  },

  qrContainer: {
    marginTop: 10,
    alignItems: "center",
  },

  qrTitle: {
    marginTop: 5,
    fontSize: 9,
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  qrImage: {
    width: 50,
    height: 50,
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 10,
  },

  footerText: {
    fontSize: 10,
    color: "#6b7280",
  },
});

// ================= PDF COMPONENT =================
const PermitPDF = ({ permit }) => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrData = JSON.stringify(
          {
            permitId: permit.id,
            destination: permit.area,
            issueDate: permit.date,
            trekRoute: permit.trek,

            tripDates: {
              start: permit.dates?.start || "",
              end: permit.dates?.end || "",
            },

            paymentStatus: permit.isPaid
              ? "PAID"
              : "PENDING",

            totalAmount: `NPR ${permit.amount}`,

            applicants: permit.applicants?.map((a) => {
              const fee = getFeeDetails(a.nationality);

              return {
                fullName: `${a.FirstName} ${a.LastName}`,
                age: a.Age,
                nationality: fee.countryName,
                fee: fee.amount,
              };
            })
          },
          
          1
        );

        const url = await QRCode.toDataURL(qrData, {
          width: 300,
          margin: 2,
        });

        setQrCode(url);
      } catch (error) {
        console.log(error);
      }
    };

    generateQR();
  }, [permit]);

  const subTotal =
    permit.applicants?.reduce(
      (sum, a) => sum + getFeeDetails(a.nationality).amount,
      0
    ) || 0;

  const grandTotal = permit.amount;
  const serviceCharge = grandTotal - subTotal;

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerBox}>
          <View style={styles.headerRow}>
            <Image
              source={logo}
              style={{ width: 90, height: 40, resizeMode: "contain" }}
            />

            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                PROTECTED AREA ENTRY PERMIT
              </Text>

              <Text style={styles.subtitle}>
                National Trust for Nature Conservation
              </Text>

              <Text style={styles.govText}>
                Government of Nepal
              </Text>
            </View> 
                    {/* QR CODE */}
        {qrCode && (
          <View style={styles.qrContainer}>
            <Image
              src={qrCode}
              style={styles.qrImage}
            />
            <Text style={styles.qrTitle}>
              Scan QR
            </Text>
          </View>
        )}

                       
          </View>

          <View
            style={[
              styles.badge,
              !permit.isPaid && styles.badgePending,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                !permit.isPaid && styles.badgeTextPending,
              ]}
            >
              {permit.isPaid
                ? "✔ PAID & VERIFIED"
                : "⚠ PAYMENT PENDING"}
            </Text>
          </View>
        </View>
        {/* Trip Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Trip Details
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>
              Permit ID:
            </Text>

            <Text style={styles.value}>
              {permit.id}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Destination:
            </Text>

            <Text style={styles.value}>
              {permit.area}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Issue Date:
            </Text>

            <Text style={styles.value}>
              {permit.date}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Trek Route:
            </Text>

            <Text style={styles.value}>
              {permit.trek}
            </Text>
          </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            Trip Dates:
          </Text>

          <Text style={styles.value}>
            {permit.dates?.start && permit.dates?.end
              ? (() => {
                  const start = new Date(permit.dates.start);
                  const end = new Date(permit.dates.end);

                  const days =
                    Math.ceil(
                      (end - start) / (1000 * 60 * 60 * 24)
                    ) + 1;

                  return `${days} days (${permit.dates.start} to ${permit.dates.end})`;
                })()
              : "N/A"}
          </Text>
        </View>
        </View>

        {/* Applicants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Applicant Roster & Fees
          </Text>

          <View style={styles.table}>
            <View style={styles.thRow}>
              <Text style={[styles.th, styles.col1]}>
                Full Name
              </Text>

               <Text style={[styles.th, styles.col2]}>
                Age
              </Text>

              <Text style={[styles.th, styles.col3]}>
                Nationality
              </Text>

              <Text style={[styles.th, styles.col4]}>
                Fee
              </Text>
            </View>

            {permit.applicants?.map((a, i) => {
              const fee = getFeeDetails(a.nationality);

              return (
                <View key={i} style={styles.tdRow}>
                  <Text style={[styles.td, styles.col1]}>
                    {a.FirstName} {a.LastName}
                  </Text>  
                  
                  <Text style={[styles.td, styles.col2]}>
                    {a.Age}
                  </Text>

                  <Text style={[styles.td, styles.col3]}>
                    {fee.countryName}
                  </Text>
                  
                  <Text style={[styles.td, styles.col4]}>
                    {formatCurrency(fee.amount)}
                  </Text>
                </View>
              );
            })}

            <View style={styles.tdRow}>
              <Text
                style={[
                  styles.totalLabel,
                  styles.colSpan2,
                ]}
              >
                Subtotal
              </Text>

              <Text
                style={[
                  styles.td,
                  styles.col4,
                  { fontWeight: "bold" },
                ]}
              >
                {formatCurrency(subTotal)}
              </Text>
            </View>

            <View style={styles.tdRow}>
              <Text
                style={[
                  styles.totalLabel,
                  styles.colSpan2,
                ]}
              >
                Service Charge
              </Text>

              <Text
                style={[
                  styles.td,
                  styles.col4,
                  { fontWeight: "bold" },
                ]}
              >
                {formatCurrency(serviceCharge)}
              </Text>
            </View>

            <View style={styles.grandTotalRow}>
              <Text
                style={[
                  styles.grandTotalLabel,
                  styles.colSpan2,
                ]}
              >
                Grand Total
              </Text>

              <Text
                style={[
                  styles.grandTotalValue,
                  styles.col4,
                ]}
              >
                NPR {formatCurrency(grandTotal)}
              </Text>
            </View>
          </View>
        </View>

        {/* QR CODE */}
        {qrCode && (
          <View style={styles.qrContainer}>


            <Image
              src={qrCode}
              style={styles.qrImage}
            />
             <Text style={styles.qrTitle}>
              Scan QR To View Permit Details
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This is a computer-generated
            document and requires no physical
            signature.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// ================= MAIN COMPONENT =================
const PrintPermit = () => {
  const [currentUser, setCurrentUser] =
    useState(null);

  const [history, setHistory] = useState([]);

  const [activeTab, setActiveTab] =
    useState("unpaid");

  const [showPdf, setShowPdf] = useState(false);

  const [selectedPermit, setSelectedPermit] =
    useState(null);

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const [permitToPay, setPermitToPay] =
    useState(null);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("active_user")
    );

    if (user) {
      setCurrentUser(user);

      const stored =
        JSON.parse(
          localStorage.getItem("permitHistory")
        ) || [];

      const userPermits = stored.filter(
        (p) => p.userId === user.id
      );

      setHistory(userPermits);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("active_user");
    window.location.reload();
  };

  const handleDelete = (permit) => {
    if (
      window.confirm(
        "Delete this permit permanently?"
      )
    ) {
      const stored =
        JSON.parse(
          localStorage.getItem("permitHistory")
        ) || [];

      const updated = stored.filter(
        (p) => p.id !== permit.id
      );

      localStorage.setItem(
        "permitHistory",
        JSON.stringify(updated)
      );

      setHistory((prev) =>
        prev.filter((p) => p.id !== permit.id)
      );
    }
  };

  const handlePaymentSuccess = () => {
    const stored =
      JSON.parse(
        localStorage.getItem("permitHistory")
      ) || [];

    const updated = stored.map((p) =>
      p.id === permitToPay.id
        ? { ...p, isPaid: true }
        : p
    );

    localStorage.setItem(
      "permitHistory",
      JSON.stringify(updated)
    );

    setHistory(updated);

    setShowPaymentModal(false);
    setPermitToPay(null);
  };

  const filteredData = history.filter((p) =>
    activeTab === "paid"
      ? p.isPaid
      : !p.isPaid
  );

  if (!currentUser) {
    return (
      <div className="dashboard-container">
        <div className="locked-overlay">
          <BiLockAlt size={50} />

          <h3>Please Login First</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>My Permits</h1>

            <p>
              Manage and download your permits
            </p>
          </div>

          <div className="user-pill">
            <BiUser size={18} />

            <span>{currentUser.name}</span>

            <button
              className="btn-logout-icon"
              onClick={handleLogout}
            >
              <BiLogOut size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={
              activeTab === "unpaid"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("unpaid")
            }
          >
            Pending (
            {
              history.filter((p) => !p.isPaid)
                .length
            }
            )
          </button>

          <button
            className={
              activeTab === "paid"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("paid")}
          >
            Paid (
            {
              history.filter((p) => p.isPaid)
                .length
            }
            )
          </button>
        </div>

        {/* Grid */}
        <div className="dashboard-grid">
          {filteredData.length === 0 ? (
            <div className="empty-state">
              No permits found
            </div>
          ) : (
            filteredData.map((permit) => (
              <div
                key={permit.id}
                className={`permit-card ${
                  permit.isPaid
                    ? "paid"
                    : "pending"
                }`}
              >
                <div className="card-header">
                  <span className="permit-id">
                    {permit.id}
                  </span>

                  <div className="card-actions-top">
                    <span
                      className={`status-pill ${
                        permit.isPaid
                          ? "success"
                          : "warning"
                      }`}
                    >
                      {permit.isPaid
                        ? "Paid"
                        : "Pending"}
                    </span>

                    <button
                      className="btn-icon delete"
                      onClick={() =>
                        handleDelete(permit)
                      }
                    >
                      <BiTrash size={18} />
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <h3>{permit.area}</h3>

                  <div className="card-detail-row">
                    <span>Date:</span>

                    <strong>
                      {permit.date}
                    </strong>
                  </div>

                  <div className="card-stats">
                    <div className="stat">
                      <span className="stat-label">
                        Applicants
                      </span>

                      <span className="stat-val">
                        {
                          permit.applicants
                            ?.length
                        }
                      </span>
                    </div>

                    <div className="stat">
                      <span className="stat-label">
                        Amount
                      </span>

                      <span className="stat-val price">
                        NPR{" "}
                        {permit.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-footer card-actions-dual">
                  {!permit.isPaid ? (
                    <>
                      <button
                        className="btn-secondary-action"
                        onClick={() => {
                          setSelectedPermit(
                            permit
                          );

                          setShowPdf(true);
                        }}
                      >
                        View PDF
                      </button>

                      <button
                        className="btn-main-action pay"
                        onClick={() => {
                          setPermitToPay(
                            permit
                          );

                          setShowPaymentModal(
                            true
                          );
                        }}
                      >
                        Pay Now
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn-main-action download"
                      onClick={() => {
                        setSelectedPermit(
                          permit
                        );

                        setShowPdf(true);
                      }}
                    >
                      View & Download
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* PDF MODAL */}
        {showPdf && selectedPermit && (
          <div className="modal-overlay">
            <div className="pdf-modal-window">
              <div className="pdf-header">
                <h3>Permit Document</h3>

                <button
                  className="close-icon-btn"
                  onClick={() =>
                    setShowPdf(false)
                  }
                >
                  <BiX size={20} />
                </button>
              </div>

              <div className="pdf-body">
                <PDFViewer
                  width="100%"
                  height="100%"
                >
                  <PermitPDF
                    permit={selectedPermit}
                  />
                </PDFViewer>
              </div>

              <div className="pdf-modal-footer">
                <button
                  className="btn-modal-cancel"
                  onClick={() =>
                    setShowPdf(false)
                  }
                >
                  Cancel
                </button>

                <PDFDownloadLink
                  document={
                    <PermitPDF
                      permit={selectedPermit}
                    />
                  }
                  fileName={`Permit-${selectedPermit.id}.pdf`}
                >
                  {({ loading }) => (
                    <button className="btn-download-modal">
                      {loading
                        ? "Preparing..."
                        : "Download PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT MODAL */}
        {showPaymentModal &&
          permitToPay && (
            <PaymentModal
              totalAmount={permitToPay.amount}
              onClose={() => {
                setShowPaymentModal(false);
                setPermitToPay(null);
              }}
              onPaymentComplete={
                handlePaymentSuccess
              }
            />
          )}
      </div>

      <Footer />
    </>
  );
};

export default PrintPermit;