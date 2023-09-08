import { FetchMoreQueryOptions, OperationVariables } from '@apollo/client';
import {GetRepositoriesForUserQuery, GetRepositoriesForUserQueryVariables} from '../generated/graphql';

export type FetchMoreOptions = <TFetchData = GetRepositoriesForUserQuery, TFetchVars extends OperationVariables = GetRepositoriesForUserQueryVariables>(fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
    updateQuery?: ((previousQueryResult: GetRepositoriesForUserQuery, options: {
        fetchMoreResult: GetRepositoriesForUserQuery;
        variables: GetRepositoriesForUserQueryVariables;
    }) => GetRepositoriesForUserQuery) | undefined
}) => Promise<GetRepositoriesForUserQuery>