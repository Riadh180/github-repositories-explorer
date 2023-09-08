import React from 'react';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  margin: 20px 0;
`;

type ErrorAlertProps = {
  message: string;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <StyledAlert severity="error">Error: {message}</StyledAlert>
);

export default ErrorAlert;
