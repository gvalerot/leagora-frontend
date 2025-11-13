import { gql } from 'apollo-angular';

export const GET_LEAGUES = gql`
    query MyLeagues($ownerId: ID!) {
        myLeagues(ownerId: $ownerId) {
            id
            name
            logo
            urlLogo
        }
    }
`;

export const GET_LEAGUE_BY_ID = gql`
  query LeagueById($id: ID!) {
    leagueById(id: $id) { 
        id
        name
        logo
        urlLogo
    }
  }
`;

