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
      comments {
        id
        description
        postedBy {
          id
          name
        }  
      }
    }
  }
}
`;