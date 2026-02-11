import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import {
  ACCEPT_FRIEND_REQUEST,
  GET_ALL_USERS,
  GET_FRIENDS,
  GET_PENDING_REQUEST,
  REJECT_FRIEND_REQUEST,
  SEND_FRIEND_REQUEST,
} from 'src/app/graphql/users/users.query';
import { FriendRequest } from 'src/app/models/friendRequest';
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers() {
    return this.apollo
      .query<{ getAllUsers: User[] }>({
        query: GET_ALL_USERS,
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.getAllUsers ?? []));
  }

  getFriends(userId: number) {
    return this.apollo
      .query<{ getFriends: User[] }>({
        query: GET_FRIENDS,
        variables: { userId },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.getFriends ?? []));
  }

  sendFriendRequest(senderId: number, receiverId: number) {
    console.log(senderId, receiverId);
    return this.apollo.mutate({
      mutation: SEND_FRIEND_REQUEST,
      variables: { senderId, receiverId },
    });
  }

  getPendingRequest(userId: number) {
    return this.apollo
      .query<{ getReceivedPendingRequests: FriendRequest[] }>({
        query: GET_PENDING_REQUEST,
        variables: { userId },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.getReceivedPendingRequests ?? []));
  }

  acceptFriendRequest(request: FriendRequest) {
    return this.apollo.mutate({
      mutation: ACCEPT_FRIEND_REQUEST,
      variables: { requestId: request.id },
    });
  }

  rejectFriendRequest(request: FriendRequest) {
    return this.apollo.mutate({
      mutation: REJECT_FRIEND_REQUEST,
      variables: { requestId: request.id },
    });
  }
}
