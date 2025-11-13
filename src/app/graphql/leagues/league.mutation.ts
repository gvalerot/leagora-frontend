import { gql } from 'apollo-angular';

export const CREATE_LEAGUE = gql`
  mutation CreateLeague($name: String!, $logo: String, $ownerId: ID!) {
    createLeague(name: $name, logo: $logo, ownerId: $ownerId) {
      id
      name
      logo
    }
  }
`;
