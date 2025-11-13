import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_ALL_USERS } from 'src/app/graphql/users/users.query';
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) { }

  getUsers(){
    return this.apollo.query<{getAllUsers: User[]}>({
      query: GET_ALL_USERS,
      fetchPolicy: 'network-only'
    })
    .pipe(map((result) => result.data?.getAllUsers ?? []));
  }

  //  getLeagues(ownerId: number) {
  //     return this.apollo
  //       .watchQuery<{ myLeagues: League[] }>({
  //         query: GET_LEAGUES,
  //         variables: { ownerId },
  //         fetchPolicy: 'network-only',
  //       })
  //       .valueChanges.pipe(map((result) => result.data?.myLeagues ?? []));
  //   }
}
