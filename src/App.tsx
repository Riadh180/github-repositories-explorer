import React, { useState } from 'react';
import { TextField, Container, Typography, Button } from '@mui/material';
import { useGetUsersLazyQuery, useGetRepositoriesForUserLazyQuery, User } from './generated/graphql';
import UserAccordion from './shared/components/UserAccordion';
import Loading from './shared/components/Loading';
import ErrorAlert from './shared/components/ErrorAlert';
import { ColorPalette } from './shared/ColorPalette.enum';
import { FetchMoreOptions } from "./shared/types";
import styled from 'styled-components';



const StyledSearchButton = styled(Button)`
&& {
    background-color: ${ColorPalette.PRIMARY};
    padding: 15px;
    margin-top: 10px;
    width: 100%;
}
`;

const App: React.FC = () => {
    const [inputTerm, setInputTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const [getUsers, { data: userData, loading: userLoading, error: userError }] = useGetUsersLazyQuery();
    const [getRepos, { data: repoData, loading: repoLoading, error: repoError, fetchMore }] = useGetRepositoriesForUserLazyQuery();


    const handleSearch = () => {
        getUsers({ variables: { query: inputTerm } });
    };

    const handleUserClick = (login) => {
        setSelectedUser(login);
        getRepos({ variables: { login } });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                GitHub Repositories Explorer
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                value={inputTerm}
                onChange={(e) => setInputTerm(e.target.value)}
                placeholder="Enter Username"
                InputProps={{
                    style: { backgroundColor: '#f1f1f1' }
                }}
            />
            <StyledSearchButton variant="contained" onClick={handleSearch}>
                Search
            </StyledSearchButton>
            {userLoading && <Loading />}
            {userError && <ErrorAlert message={userError.message} />}
            {userData?.search.edges && (
                <Typography style={{ margin: '20px 5px' }}>Showing users for "{inputTerm}"</Typography>
            )}
            {userData?.search?.edges?.map((edge) => (
                <UserAccordion
                    key={(edge?.node as User)?.id}
                    user={edge?.node as User}
                    selectedUser={selectedUser}
                    handleUserClick={handleUserClick}
                    repoData={repoData}
                    repoLoading={repoLoading}
                    repoError={repoError}
                    fetchMore={fetchMore as FetchMoreOptions}
                />
            ))}
        </Container>
    );
};

export default App;
