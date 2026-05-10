import React from 'react';
import { Check, Loader, XCircle } from 'lucide-react';

const TransactionModal = ({ status, txhash, onClose }) => {

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: '#1E1E1E',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '384px',
          width: '100%',
          margin: '0 16px',
          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {status === 'loading' && (
            <>
              <div
                style={{
                  position: 'relative',
                  marginBottom: '16px'
                }}
              >
                <Loader
                  size={48}
                  style={{
                    color: '#a855f7',
                    animation: 'spin 1s linear infinite'
                  }}
                />
              </div>

              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  background: 'linear-gradient(to right, #c084fc, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Transaction in Progress
              </h2>

              <p
                style={{
                  color: '#9ca3af',
                  textAlign: 'center'
                }}
              >
                Please wait while your transaction is being processed...
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '24px'
                }}
              >
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(168,85,247,0.3)',
                      border: '1px solid rgba(168,85,247,0.5)',
                      animation: `bounce 1.5s ease-in-out ${index * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div
                style={{
                  position: 'relative',
                  marginBottom: '16px'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(34,197,94,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Check
                    size={32}
                    style={{
                      color: '#22c55e',
                      animation: 'scale 0.3s ease'
                    }}
                  />
                </div>
              </div>

              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#22c55e',
                  marginBottom: '8px'
                }}
              >
                Transaction Complete
              </h2>

              <p
                style={{
                  color: '#9ca3af',
                  textAlign: 'center'
                }}
              >
                tx hash : <a href={`https://sepolia.etherscan.io/tx/${txhash}`} target='blank'>{txhash.slice(0,8)}...{txhash.slice(-10)}</a>
              </p>

              <button
                onClick={onClose}
                style={{
                  marginTop: '24px',
                  padding: '8px 24px',
                  backgroundColor: '#22c55e',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Close
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div
                style={{
                  position: 'relative',
                  marginBottom: '16px'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(239,68,68,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <XCircle
                    size={32}
                    style={{
                      color: '#ef4444',
                      animation: 'scale 0.3s ease'
                    }}
                  />
                </div>
              </div>

              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#ef4444',
                  marginBottom: '8px'
                }}
              >
                Transaction Failed
              </h2>

              <p
                style={{
                  color: '#9ca3af',
                  textAlign: 'center'
                }}
              >
                There was an error processing your transaction. Please try again.
              </p>

              <button
                onClick={onClose}
                style={{
                  marginTop: '24px',
                  padding: '8px 24px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;