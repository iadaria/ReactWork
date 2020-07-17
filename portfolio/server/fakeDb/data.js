const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const forum1Id = mongoose.Types.ObjectId();
const forum2Id = mongoose.Types.ObjectId();
const forum3Id = mongoose.Types.ObjectId();

const topicId = mongoose.Types.ObjectId();

const data = {

    users: [
        {
            _id: user1Id,
            avatar:
                "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png",
            email: "jadarya@mail.ru",
            name: "Daria Iakimova",
            username: "iadaria",
            info: "Hello I am Filip and I am a developer!",
            password: "mysunmitia090708",
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
            role: "admin",
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
            user: user1Id,
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
            user: user1Id,
        },
    ],
    forumCategories: [
        {
            _id: forum1Id,
            title: "General Discussion",
            subTitle: "Open any topic you want",
            slug: "general-discussion",
        },
        {
            _id: forum2Id,
            title: "Job Requests",
            subTitle: "Post here job opportunities",
            slug: "job-requests",
        },
        {
            _id: forum3Id,
            title: "Developer Jokes",
            subTitle: "Just funny developing stuff",
            slug: "developer-jokes",
        },
    ],
    topics: [
        {
            _id: topicId,
            title: "How to learn JS",
            slug: "how-to-learn-js",
            content:
                "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forum1Id,
            user: user2Id,
        },
        {
            title: "How to learn JAVA",
            slug: "how-to-learn-java",
            content:
                "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forum1Id,
            user: user2Id,
        },
        {
            title: "How to learn C++",
            slug: "how-to-learn-c++",
            content:
                "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forum2Id,
            user: user2Id,
        },
    ],
    words: [
        // NavBar
        {
            part: "mainMenu",
            key: "brand",
            languageCode: "en",
            value: "Daria Iakimova"
        },
        {
            part: "mainMenu",
            key: "brand",
            languageCode: "ru",
            value: "Дарья Якимова"
        },
        {
            part: "mainMenu",
            key: "byName",
            languageCode: "en",
            value: "by Daria Iakimova"
        },
        {
            part: "mainMenu",
            key: "byName",
            languageCode: "ru",
            value: "Дарья Якимова"
        },
        {
            key: "home",
            languageCode: "en",
            part: "mainMenu",
            value: "Home"
        },
        {
            key: "home",
            languageCode: "ru",
            part: "mainMenu",
            value: "Главная"
        },
        {
            key: "portfolio",
            languageCode: "en",
            part: "mainMenu",
            value: "Portfolio"
        },
        {
            key: "portfolio",
            languageCode: "ru",
            part: "mainMenu",
            value: "Портфолио"
        },
        {
            key: "about",
            languageCode: "en",
            part: "mainMenu",
            value: "About"
        },
        {
            key: "about",
            languageCode: "ru",
            part: "mainMenu",
            value: "Обо мне"
        },
        { part: "mainMenu", key: "singIn", languageCode: "ru", value: "Войти"},
        { part: "mainMenu", key: "singIn", languageCode: "en", value: "Sign In"},

        { part: "mainMenu", key: "singOut", languageCode: "ru", value: "Выйти"},
        { part: "mainMenu", key: "singOut", languageCode: "en", value: "Sign Out"},

        { part: "mainMenu", key: "createPortfolio", languageCode: "ru", value: "Создать портфолио"},
        { part: "mainMenu", key: "createPortfolio", languageCode: "en", value: "Create portfolio"},

        { part: "mainMenu", key: "dashboard", languageCode: "ru", value: "Панель"},
        { part: "mainMenu", key: "dashboard", languageCode: "en", value: "Dashboard"},

        /*
            { part: "mainMenu", key: "", languageCode: "ru", value: ""},
            { part: "mainMenu", key: "", languageCode: "en", value: ""},
         
        { part: "", key: "", languageCode: "", value: ""},
        {
            part: "",
            key: "",
            languageCode: "",
            value: ""
        },
        */
    ],
};

module.exports = data;
