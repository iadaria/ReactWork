import { gql } from "apollo-boost";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
      title
      jobTitle
      description
      startDate
      endDate
      company
      companyWebsite
      location
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      title
      jobTitle
      description
      startDate
      endDate
      company
      companyWebsite
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio {
    createPortfolio(
      input: {
        title: "Create new Work in USA"
        company: "Create WhoKnows"
        companyWebsite: "www.google.com"
        location: "USA, Montana"
        jobTitle: "Housekeeping"
        description: "So much responsibility....Overloaaaaaad"
        startDate: "2012-12-12T23:59Z"
        endDate: "2013-11-14T23:59Z"
      }
    ) {
      _id
      title
      jobTitle
      description
      startDate
      endDate
      company
      companyWebsite
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;

export const UPDATE_PORTFOLIO = gql`
    mutation UpdatePortfolio($id: ID) {
        updatePortfolio(id: $id, input:{
            title: "Update Work in USA",
            company: "Update WhoKnows",
            companyWebsite: "Update www.google.com",
            location: "Update USA, Montana",
            jobTitle: "Update Housekeeping",
            description: "Update So much responsibility....Overloaaaaaad",
            startDate: "2012-12-12T23:59Z"
            endDate: "2013-11-14T23:59Z"
        }) {
            _id
            title
            jobTitle
            description
            startDate
            endDate
            company
            companyWebsite
        }  
    }
`;

// AUTH QUERITES START -----------------------------------------------------

export const SIGN_UP = gql`
    mutation SignUp(
      $avatar: String
      $username: String!
      $email: String!
      $password: String!
      $passwordConfirmation: String!
    ) {
      signUp(input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      })
    }
`;

export const SIGN_IN = gql`
  mutation SignIn(
    $email: String!
    $password: String!
  ) {
    signIn(input: {
      email: $email
      password: $password
    }) {
      _id
      username
      role
      avatar
    }
  }
`;

export const SIGN_OUT = gql`mutation SignOut { signOut }`;

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`;
// AUTH QUERITES END -------------------------------------------------------
