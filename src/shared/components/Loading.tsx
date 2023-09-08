import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Loading: React.FC = () => (
  <StyledLoadingWrapper>
    <CircularProgress style={{ marginRight: '10px' }} />
    <Typography variant="body2">Loading...</Typography>
  </StyledLoadingWrapper>
);

export default Loading;