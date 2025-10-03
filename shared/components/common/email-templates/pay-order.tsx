import React from 'react';
import { formatPrice } from '@/shared/lib';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
  const formattedPrice = formatPrice(totalAmount);

  return (
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6', padding: '40px 0' }}
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
                      Complete your payment
                    </h2>
                    <p style={{ fontSize: '16px', color: '#555', marginBottom: '5px' }}>
                      Please confirm the payment for your order <b style={{ color: '#000' }}># {orderId}</b>
                    </p>

                    <div style={{ fontSize: '16px', marginBottom: '20px' }}>
                      <span style={{ color: '#555', marginRight: '10px' }}>Total Amount:</span>
                      <span style={{ fontWeight: 'bold' }}>${formattedPrice}</span>
                    </div>

                    {/* Test card info */}
                    <div
                      style={{
                        marginBottom: '20px',
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderTop: '1px solid #e5e7eb',
                        borderLeft: '5px solid #ff6900',
                        borderRight: '1px solid #e5e7eb',
                        borderBottom: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        textAlign: 'left',
                        color: '#333',
                      }}
                    >
                      <p style={{ margin: '0 0 10px' }}>
                        💳 <b>Test payment details</b>
                      </p>
                      <p style={{ margin: 0 }}>
                        Card: <b>4242 4242 4242 4242</b> <br />
                        Exp: any future date (e.g. 12/34) <br />
                        CVC: any 3 digits (e.g. 123)
                      </p>
                      <p style={{ marginTop: '10px', color: '#777' }}>
                        This is only a demo payment. No real money will be charged!
                      </p>
                    </div>

                    {/* Pay button */}
                    <a
                      href={paymentUrl}
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
                      Pay Now
                    </a>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9fafb' }}>
                    <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                      © 2025 Firepie. If you didn’t make this order, please ignore this email.
                    </p>
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
