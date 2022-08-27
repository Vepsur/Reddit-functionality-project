import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation SignUp($name: String!, $email: String!, $password: String!){
  signup(name: $name, email: $email, password: $password) {
    token
  }
}
`;

export const LOGIN_USER = gql`
mutation LogIn($email: String!, $password: String!){
  login(email: $email, password: $password) {
    token
  }
}
`;

