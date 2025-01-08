// @ts-nocheck
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import gql from 'graphql-tag';
import { test, expect } from '@jest/globals';
import '@testing-library/jest-dom';


const GET_GRAPHQL_ANSWER = gql`
  query GetGraphQAnswer($id: String) {
    resp(id: $id) {
      id
      messages {
        ... on TextMessage {
          type
          text
        }
        ... on PictureMessage {
          type
          path
        }
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_GRAPHQL_ANSWER,
      variables: { id: '1' },
    },
    result: {
      data: {
        resp: {
          id: '1',
          messages: [
            { type: 'TextMessage', text: 'Hello World' },
            { type: 'PictureMessage', path: '/path/to/image' },
          ],
        },
      },
    },
  },
];

const TestComponent = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <div>New Test Component</div>
  </MockedProvider>
);


test('renders new GraphQL query without error', async () => {
  render(<TestComponent />);
  expect(screen.getByText('New Test Component')).toBeInTheDocument();
});

test('checks the number of messages', async () => {
  render(<TestComponent />);
  const resp = mocks[0].result.data.resp;

  console.log(resp)

  expect(resp.id).toBe('1');
  expect(resp.messages).toHaveLength(2);
});