import React from 'react';
import { Grid, Typography, AccordionDetails, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ApolloError } from '@apollo/client';
import styled from 'styled-components';
import { User, GetRepositoriesForUserQuery } from '../../generated/graphql';
import { FetchMoreOptions } from "../types";
import Loading from './Loading';
import ErrorAlert from './ErrorAlert';
import { ColorPalette } from '../ColorPalette.enum';

const StyledAccordionDetails = styled(AccordionDetails)`
  && {
    padding: 0px;
  } 
`;

const StyledRepositoryName = styled(Typography)`
  && {
    font-weight: bold;
  } 
`;

const StyledWrapperGrid = styled(Grid)`
  && {
    background-color: ${ColorPalette.DARKGRAY};
    padding-bottom: 10px;
    margin: 20px;
    width: 100%;
  } 
`;

const StyledTotalStarsCount = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  } 
`;

const StyledStarIcon = styled(StarIcon)`
  && {
    margin-right: 4px;
  } 
`;

type RepositoryListProps = {
    user?: User,
    selectedUser?: User['login'] | null,
    repoData?: GetRepositoriesForUserQuery,
    repoLoading: boolean,
    repoError?: ApolloError,
    fetchMore: FetchMoreOptions
};

const RepositoryList: React.FC<RepositoryListProps>  = ({ user, selectedUser, repoData, repoLoading, repoError, fetchMore }) => {
    const loadMoreRepos = () => {
        fetchMore({
          variables: {
            cursor: repoData?.user?.repositories?.pageInfo?.endCursor,
          },
          updateQuery: (previousQueryResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousQueryResult;
            return {
              user: {
                ...fetchMoreResult.user,
                repositories: {
                  ...fetchMoreResult?.user?.repositories,
                  nodes: [
                    ...previousQueryResult?.user?.repositories?.nodes as [],
                    ...fetchMoreResult?.user?.repositories.nodes as [],
                  ],
                },
              },
            } as GetRepositoriesForUserQuery;
          },
        });
      };
    return (
        <StyledAccordionDetails>
            {repoLoading && <Loading />}
            {repoError && <ErrorAlert message={repoError.message} />}
            {selectedUser === user?.login && repoData?.user?.repositories?.nodes?.map((repo, index) => (
                <StyledWrapperGrid container spacing={2} key={repo?.name}>
                    <Grid item xs={8}>
                        <StyledRepositoryName variant="h6" data-testid={`repo-name-${index}`}>
                            {repo?.name}
                        </StyledRepositoryName>
                        <Typography variant="body2" data-testid={`repo-description-${index}`}>
                            {repo?.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <StyledTotalStarsCount variant="body2" align="right">
                            {repo?.stargazers.totalCount}
                            <StyledStarIcon fontSize="small" />
                        </StyledTotalStarsCount>
                    </Grid>
                </StyledWrapperGrid>
            ))}
            {repoData?.user?.repositories.pageInfo.hasNextPage && (
                <Button onClick={loadMoreRepos}>Load More</Button>
            )}
        </StyledAccordionDetails>
    );
};

export default RepositoryList;
