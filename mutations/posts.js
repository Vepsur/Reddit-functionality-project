import { gql } from "@apollo/client";

export const CREATE_POST = gql`
mutation createPost($url: String!, $description: String!){
  post(url: $url, description: $description) {
    id
  }
}
`;


