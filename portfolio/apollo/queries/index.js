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
