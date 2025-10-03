import React from 'react';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { formatPrice } from '@/shared/lib';

interface Props {
  orderId: number;
  totalAmount: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, totalAmount, items }) => {
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
                      Thanks for your order!
                    </h2>
                    <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
                      Your order <b style={{ color: '#000' }}>#{orderId}</b> has been successfully placed.
                    </p>
                    <div
                      style={{
                        marginBottom: '20px',
                        padding: '20px 20px 0',
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
                      <table
                        width="100%"
                        cellPadding="0"
                        cellSpacing="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              width="33.3%"
                              align="left"
                              style={{ fontSize: '14px', color: '#555', fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #f3f4f6' }}
                            >
                              Product
                            </td>
                            <td
                              width="33.3%"
                              align="center"
                              style={{ fontSize: '14px', color: '#555', fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #f3f4f6' }}
                            >
                              Quantity
                            </td>
                            <td
                              width="33.3%"
                              align="right"
                              style={{ fontSize: '14px', color: '#555', fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #f3f4f6' }}
                            >
                              Price
                            </td>
                          </tr>

                          {items.map((item) => (
                            <tr key={item.id}>
                              <td
                                width="33.3%"
                                align="left"
                                style={{ fontSize: '14px', color: '#333', padding: '8px', borderBottom: '1px solid #f3f4f6' }}
                              >
                                {item.productItem.product.name}
                              </td>
                              <td
                                width="33.3%"
                                align="center"
                                style={{ fontSize: '14px', color: '#333', padding: '8px', borderBottom: '1px solid #f3f4f6' }}
                              >
                                {item.quantity}
                              </td>
                              <td
                                width="33.3%"
                                align="right"
                                style={{ fontSize: '14px', color: '#333', padding: '8px', borderBottom: '1px solid #f3f4f6' }}
                              >
                                ${formatPrice(item.productItem.price * item.quantity)}
                              </td>
                            </tr>
                          ))}

                          {/* Total */}
                          <tr>
                            <td
                              colSpan={2}
                              align="left"
                              style={{ fontSize: '14px', color: '#000', fontWeight: 'bold', padding: '12px 8px' }}
                            >
                              Total
                            </td>
                            <td
                              align="right"
                              style={{ fontSize: '14px', color: '#000', fontWeight: 'bold', padding: '12px 8px' }}
                            >
                              ${formatPrice(totalAmount)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold', marginBottom: '30px' }}>
                      🔥 We’ll notify you once your order is on the way.
                    </p>
                    <div style={{ textAlign: 'center' }}>
                      <a
                        href="https://firepie.site"
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
                        Back to Firepie
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody >
    </table >
  );
};
