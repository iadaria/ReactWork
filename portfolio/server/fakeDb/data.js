const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      avatar:
        "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png",
      email: "filip99@gmail.com",
      name: "Filip Jerga",
      username: "TestTest1",
      info: "Hello I am Filip and I am a developer!",
      password: "testtest",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar:
        "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg",
      email: "test@gmail.com",
      name: "Test User",
      username: "TestTest2",
      info: "Hello I am Test and I am a test!",
      password: "testtest",
    },
  ],
  portfolios: [
    {
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "2012-12-12T23:59Z",
      endDate: "2012-12-12T23:59Z",
      user: user1Id,
    },
    {
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "2012-12-12T23:59Z",
      endDate: "2012-12-12T23:59Z",
      user: user1Id
    },
    {
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "2012-12-12T23:59Z",
      endDate: "2012-12-12T23:59Z",
      user: user1Id
    },
  ],
};

module.exports = data;
