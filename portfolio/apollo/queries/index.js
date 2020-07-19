import { gql } from "apollo-boost";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
      daysOfExperience @client
      title
      jobTitle
      description
      startDate
      endDate
      company
      companyWebsite
      location
      category
      repository
      deploy
      taskDocument
      imgName
      technologies
      languages
      technologyImgs
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
      category
      repository
      deploy
      taskDocument
      imgName
      technologies
      languages
      technologyImgs
    }
  }
`;

export const GET_USER_PORTFOLIOS = gql`
  query UserPortfolios {
    userPortfolios {
      _id
      title
      jobTitle
      startDate
      endDate
      category
      repository
      deploy
      taskDocument
      imgName
      technologies
      languages
      technologyImgs
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio(
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
    $category: String
    $repository: String
    $deploy: String
    $taskDocument: String
    $imgName: String
    $technologies: String
    $languages: String
    $technologyImgs: String
  ) {
    createPortfolio(
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
        category: $category
        repository: $repository
        deploy: $deploy
        taskDocument: $taskDocument
        imgName: $imgName
        technologies: $technologies
        languages: $languages
        technologyImgs: $technologyImgs
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
      location
      category
      repository
      deploy
      taskDocument
      imgName
      technologies
      languages
      technologyImgs
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio(
    $id: ID
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
    $category: String
    $repository: String
    $deploy: String
    $taskDocument: String
    $imgName: String
    $technologies: String
    $languages: String
    $technologyImgs: String
  ) {
    updatePortfolio(
      id: $id
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
        category: $category
        repository: $repository
        deploy: $deploy
        taskDocument: $taskDocument
        imgName: $imgName
        technologies: $technologies
        languages: $languages
        technologyImgs: $technologyImgs
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
      location
      category
      repository
      deploy
      taskDocument
      imgName
      technologies
      languages
      technologyImgs
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
    signUp(
      input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      username
      role
      avatar
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

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

// FORUM QUERITES START ----------------------------------------------------

export const GET_FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      slug
      title
      subTitle
    }
  }
`;

export const GET_TOPICS_BY_CATEGORY = gql`
  query TopicsByCategory($category: String) {
    topicsByCategory(category: $category) {
      _id
      slug
      title
      content
      user {
        username
        avatar
      }
      forumCategory {
        _id
        title
        slug
      }
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $title: String
    $content: String
    $forumCategory: String
  ) {
    createTopic(
      input: { title: $title, content: $content, forumCategory: $forumCategory }
    ) {
      _id
      title
      content
      slug
      user {
        username
        avatar
      }
      forumCategory {
        _id
        title
        slug
      }
    }
  }
`;

// FORUM QUERITES END ------------------------------------------------------

// WORD BEGIN --------------------------------------------------------------
const typeWord = `
    _id
    kye
    languageCode
    part
    value
`;

export const GET_WORD = gql`
  query Word($id: ID) {
      word(id: $d) {
          _id
          key
          languageCode
          part
          value
      }
  }
`;

export const GET_WORDS = gql`
  query Words {
      words {
          _id
          key
          languageCode
          part
          value
      }
  }
`;

export const GET_WORD_BY_CODE_AND_KEY = gql`
  query WordByCodeAndKey($languageCode: String, $key: String) {
      wordByCodeAndKey(languageCode: $languageCode, key: $key) {
        _id
        key
        languageCode
        part
        value
      }
  }
`;

export const GET_PART_WORDS = gql`
    query PartWords($languageCode: String, $part: String) {
        partWords(languageCode: $languageCode, part: $part) {
            key
            value
        }
    }
`;

export const GET_WORDS_BY_CODE = gql`
    query WordsByCode($languageCode: String) {
        codeWords(languageCode: $languageCode) {
            _id
            key
            languageCode
            part
            value
        }
    }
`;

export const CREATE_WORD = gql`
    mutation CreateWord(
        $key: String
        $languageCode: String
        $part: String
        $value: String
    ) {
        createWord(
            input: {key: $key, languageCode: $languageCode, part: $part, value: $value}
        ) {
            _id
            key
            languageCode
            part
            value
        }
    }
`;

export const DELETE_WORD = gql`
    mutation DeleteWord($id: ID) {
        deleteWord(id: $id)
    }
`;
// WORD END ----------------------------------------------------------------