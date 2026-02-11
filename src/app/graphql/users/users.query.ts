import { gql } from 'apollo-angular';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      username
      email
    }
  }
`;

export const GET_FRIENDS = gql`
  query GetFriends($userId: ID!) {
    getFriends(userId: $userId) {
      id
      username
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($senderId: ID!, $receiverId: ID!) {
    sendFriendRequest(senderId: $senderId, receiverId: $receiverId) {
      sender {
        username
      }
      receiver {
        username
      }
    }
  }
`;

export const GET_PENDING_REQUEST = gql`
  query GetReceivedPendingRequests($userId: ID!) {
    getReceivedPendingRequests(userId: $userId) {
      id
      createdAt
      sender {
        username
      }
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($requestId: ID!) {
    acceptFriendRequest(requestId: $requestId) {
      id
      sender {
        username
      }
    }
  }
`;

export const REJECT_FRIEND_REQUEST = gql`
  mutation RejectFriendRequest($requestId: ID!) {
    rejectFriendRequest(requestId: $requestId) {
      id
      sender {
        username
      }
    }
  }
`;
