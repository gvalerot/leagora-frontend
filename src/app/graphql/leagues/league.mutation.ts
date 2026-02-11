import { gql } from 'apollo-angular';

export const CREATE_LEAGUE = gql`
  mutation CreateLeague(
    $name: String!
    $logo: String
    $ownerId: ID!
    $participants: [ID]
  ) {
    createLeague(
      name: $name
      logo: $logo
      ownerId: $ownerId
      participants: $participants
    ) {
      id
      name
      logo
      participants {
        id
        username
      }
    }
  }
`;

export const UPDATE_LEAGUE = gql`
  mutation UpdateLeague(
    $id: ID!
    $name: String!
    $logo: String
    $participants: [ID]
  ) {
    updateLeague(
      id: $id
      name: $name
      logo: $logo
      participants: $participants
    ) {
      id
      name
      logo
      participants {
        id
        username
      }
    }
  }
`;
