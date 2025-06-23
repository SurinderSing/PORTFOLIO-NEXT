import React from 'react';

const FormErrorMsg: React.FC<{
  children?: React.ReactNode;
  message?: string;
}> = ({ message, children }) => {
  return <p className="text-red-500 para-3">{message || children}</p>;
};

export default FormErrorMsg;
