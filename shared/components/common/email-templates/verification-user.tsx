import React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  return (
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6', padding: '40px 0', marginBottom: '140px' }}
    >
      <tbody>
        <tr>
          <td align="center">
            <table
              width="600"
              cellPadding="0"
              cellSpacing="0"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <tbody>
                {/* Header */}
                <tr>
                  <td style={{ backgroundColor: '#fff', padding: '20px 10px 5px' }}>
                    <h1 style={{ margin: 0, marginBottom: '10px', fontSize: '24px', color: '#ff6900', fontWeight: 'bold' }}>🍕 Firepie</h1>
                  </td>
                </tr>
                {/* Content */}
                <tr>
                  <td style={{ padding: '0 20px' }}>
                    <h2 style={{ margin: '0 0 15px', fontSize: '22px', color: '#333' }}>
                      Verify your account
                    </h2>
                    <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
                      Please use the verification code below to activate your account:
                    </p>
                    <div
                      style={{
                        marginBottom: '20px',
                        padding: '20px',
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#ff6900',
                      }}
                    >
                      {code}
                    </div>
                    <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>
                      Or click the button below to verify your account:
                    </p>
                    <div style={{ textAlign: 'center' }}>
                      <a
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?code=${code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '14px 0',
                          backgroundColor: '#ff6900',
                          color: '#ffffff',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          textAlign: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        Verify My Account
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
