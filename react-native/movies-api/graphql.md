# Write your query or mutation here
query {
  feed{
    id
    title
    category {
      id
      title
    }
    imageUrl
  }
}

mutation SignUp($username:String!, $email:String!, $password:String!) {
  signUp(username:$username, email:$email, password:$password) {
    token
    user {
      id
      username
      email
    }
  }
}
{"username": "alice", "password": "password", "email": "alice@gmail.com"}

mutation AddVote($movieId:ID!) {
  addVote(movieId:$movieId)
}

{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsIn"}
{"movieId": 3}

query {
  currentUser {
    id
    votes {
      id
      movie {
        title
        category {
          title
        }
      }
    }
  }
}