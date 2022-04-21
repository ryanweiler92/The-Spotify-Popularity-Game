import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me{
      username
      email
      _id
      }
    }
`;

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
    }
}
`