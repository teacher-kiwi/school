import { gql } from "apollo-server";

const typeDefs = gql`
  type Movies {
    rnum: String!
    rank: String!
    rankInten: String!
    rankOldAndNew: String!
    movieCd: String!
    movieNm: String!
    openDt: String!
    salesAmt: String!
    salesShare: String!
    salesInten: String!
    salesChange: String!
    salesAcc: String!
    audiCnt: String!
    audiInten: String!
    audiChange: String!
    audiAcc: String!
    scrnCnt: String!
    showCnt: String!
  }
  type Query {
    movies: [Movies]!
  }
`;

export default typeDefs;
