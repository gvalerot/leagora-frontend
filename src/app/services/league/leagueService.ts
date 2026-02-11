import { Injectable } from '@angular/core';
import { League } from '../../models/league';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import {
  CREATE_LEAGUE,
  UPDATE_LEAGUE,
} from '../../graphql/leagues/league.mutation';
import { GET_LEAGUES } from '../../graphql/leagues/league.query';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private apollo: Apollo) {}

  createLeague(league: League) {
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('No user logged in');
    }

    const idUser = JSON.parse(user).id;
    league.ownerId = idUser;

    return this.apollo
      .mutate<{ createLeague: League }>({
        mutation: CREATE_LEAGUE,
        variables: {
          name: league.name,
          logo: league.logo,
          ownerId: league.ownerId,
          participants: league.participants,
        },
      })
      .pipe(map((result) => result.data!.createLeague));
  }

  updateLeague(league: League) {
    return this.apollo
      .mutate<{ updateLeague: League }>({
        mutation: UPDATE_LEAGUE,
        variables: {
          id: league.id,
          name: league.name,
          logo: league.logo,
          participants: league.participants,
        },
      })
      .pipe(map((result) => result.data!.updateLeague));
  }

  getLeagues(ownerId: number) {
    return this.apollo
      .watchQuery<{ myLeagues: League[] }>({
        query: GET_LEAGUES,
        variables: { ownerId },
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(map((result) => result.data?.myLeagues ?? []));
  }
}
