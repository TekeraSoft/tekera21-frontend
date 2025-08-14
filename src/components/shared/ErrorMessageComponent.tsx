import React from "react";

const ErrorMessageComponent = ({ message }: { message: string }) => {
  return <p className="text-red-500 p-4">{message}</p>;
};

export default ErrorMessageComponent;
