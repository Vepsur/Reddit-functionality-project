import { gql } from "@apollo/client";

export const GET_ALL_FEED = gql`
query getFeed($take: Int, $skip: Int) {
  feed(take: $take, skip: $skip) {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}
`;

export const GET_FILTER_FEED = gql`
query {
  feed(filter: "graphql") {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}
`;