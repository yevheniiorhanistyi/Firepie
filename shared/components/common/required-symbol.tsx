import React from 'react';

type Props = {
  hasError?: boolean;
};

export const RequiredSymbol: React.FC<Props> = ({ hasError }) => {
  const className = hasError ? 'text-red-500' : 'text-gray-700';

  return <span className={className}>*</span>;
};
