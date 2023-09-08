import React from 'react';
import {
  RenderResult,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetUsersDocument } from './generated/graphql';
import App from './App';
const mocks = [
  {
    request: {
      query: GetUsersDocument,
      variables: { query: 'test-user' },
    },
    result: {
      data: {
        search: {
          userCount: 350,
          edges: [
            {
              node: {
                login: 'test-user',
                __typename: 'User',
              },
              __typename: 'SearchResultItemEdge',
            },
            {
              node: {
                login: 'test-user-bob',
                __typename: 'User',
              },
              __typename: 'SearchResultItemEdge',
            },
            {
              node: {
                login: 'test-user-alice',
                __typename: 'User',
              },
              __typename: 'SearchResultItemEdge',
            },
            {
              node: {
                login: 'test-user-charlie',
                __typename: 'User',
              },
              __typename: 'SearchResultItemEdge',
            },
            {
              node: {
                login: 'test-user-bb',
                __typename: 'User',
              },
              __typename: 'SearchResultItemEdge',
            },
          ],
          __typename: 'SearchResultItemConnection',
        },
      },
    },
  },
];

const renderApp = (): RenderResult => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );
};

describe('Unit Tests', () => {
  test('renders search input and button', () => {
    renderApp();
    const inputElement = screen.getByPlaceholderText(/Enter Username/i);
    const buttonElement = screen.getByText(/Search/i);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('updates search input value', () => {
    renderApp();
    const inputElement = screen.getByPlaceholderText(
      /Enter Username/i,
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test-user' } });

    expect(inputElement.value).toBe('test-user');
  });
});

describe('Integration Tests', () => {
  test('fetches and displays users', async () => {
    renderApp();

    const buttonElement = screen.getByText(/Search/i);
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const userElement = screen.getByText(/test-user/i);
      expect(userElement).toBeInTheDocument();
    });
  });
});
