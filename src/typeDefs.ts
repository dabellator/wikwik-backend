import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    post: [Post!]
    like: [Like!]
  }
  type Post {
    id: Int!
    user: User
    userId: Int
    like: [Like]
    body: String
  }
  type Like {
    id: Int!
    post: Post
    postId: Int
    user: User
    userId: Int
  }
  type Data {
    name: String
    domain: String
    website: String
    incorporation_date: String
  }
  type Query {
    AllPosts: [Post!]!
    AllUsers: [User!]!
    TableName: [String]
    TableData(name: String): [Data]
  }
  type Mutation {
    AddPost(body: String!): Post!
    LikePost(postId: Int!): Post!
  }
`;
