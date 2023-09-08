import React from 'react';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ApolloError } from '@apollo/client';
import { FetchMoreOptions } from "../types";
import { User, GetRepositoriesForUserQuery } from '../../generated/graphql';
import RepositoryList from './RepositoryList';
import styled from 'styled-components';
import { ColorPalette } from '../ColorPalette.enum';



const StyledAccordion = styled(Accordion)`
  && {
    box-shadow: none;
    margin-bottom: 10px;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  && {
    background-color: ${ColorPalette.LIGHTGRAY};
    border-bottom: none;
  } 
`;

type UserAccordionProps = {
  handleUserClick: (login?: User['login']) => void,
  user?: User,
  selectedUser?: User['login'] | null,
  repoData?: GetRepositoriesForUserQuery,
  repoLoading: boolean,
  repoError?: ApolloError,
  fetchMore: FetchMoreOptions
};

const UserAccordion: React.FC<UserAccordionProps> = ({ handleUserClick, user, selectedUser, repoData, repoLoading, repoError, fetchMore }) => {

  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleUserClick(user?.login)}>
        <Typography>{user?.login}</Typography>
      </StyledAccordionSummary>
      <RepositoryList selectedUser={selectedUser} repoData={repoData} repoLoading={repoLoading} repoError={repoError} fetchMore={fetchMore} user={user} />
    </StyledAccordion>
  );
};

export default UserAccordion;
