query Portfolio {
  portfolio(id:"da789ad1") {
    title
    }
}

mutation CreatePortfolio {
	createPortfolio(input:{
    title: "Work in USA"
    company: "WhoKnows"
    companyWebsite: "www.google.com"
    location: "USA, Montana"
    jobTitle: "Housekeeping"
    description: "So much responsibility....Overloaaaaaad"
    startDate: "01/01/2010"
    endDate: "01/01/2011"
  }){
    _id
    title
    description
  }  
}

mutation UpdatePortfolio {
	updatePortfolio(id: "sadcxv9", input:{
    title: "Updated Work in USA"
    company: "Updated WhoKnows"
    companyWebsite: "updated www.google.com"
    location: "USA, Montana"
    jobTitle: "Housekeeping"
    description: "So much responsibility....Overloaaaaaad"
    startDate: "01/01/2010"
    endDate: "01/01/2011"
  }){
    _id
    title
    description
  }  
}

mutation SignUp {
  signUp(input:{
    avatar:"https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg"
    username:"TestTestTest"
    email:"testTest@test.com"
    password:"testtest"
    passwordConfirmation:"testtest"
  })
}

mutation SignIn {
  signIn(input:{
    email:"test@gmail.com"
    password:"testtest"
  }) {
    _id
    username
  }
}

mutation SignOut {
  signOut
}