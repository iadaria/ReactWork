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
            title: "Бот2",
            company: "Freelance",
            companyWebsite: "www.fl.ru",
            location: "Ukrain",
            jobTitle: "Engineer",
            description: "Разработка ботов для букмекерских сайтов под существующий интерфейс заказчика. Тесты для проверки корректности всех комбинаций ставок. ",
            startDate: "2012-12-12T23:59Z",
            endDate: "2012-12-12T23:59Z",
            user: user1Id,

            category: "work",


            repository: "https://github.com/iadaria",
            deploy: null,
            taskDocument: "https://drive.google.com/file/d/0B6RuRX0jvwvCU2oyQ3pCa21KejA/view?usp=sharing",

            imgName: "default2.png",
            technologies: "C#; UnitTest; WebApi; WebSocket; C#; UnitTest; C#; UnitTest; WebApi; WebSocket; C#; UnitTest",
            languages: "C#",
            technologyImgs: "csharp",
            languageCode: "ru"
        },
        {
            title: "Бот3",
            company: "Freelance",
            companyWebsite: "www.fl.ru",
            location: "Ukrain",
            jobTitle: "Engineer",
            description: "Разработка ботов для букмекерских сайтов под существующий интерфейс заказчика. Тесты для проверки корректности всех комбинаций ставок. ",
            startDate: "2012-12-12T23:59Z",
            endDate: "2012-12-12T23:59Z",
            user: user1Id,

            category: "work",


            repository: "https://github.com/iadaria",
            deploy: null,
            taskDocument: "https://drive.google.com/file/d/0B6RuRX0jvwvCU2oyQ3pCa21KejA/view?usp=sharing",

            imgName: "default2.png",
            technologies: "WebApi; WebSocket; C#; UnitTest",
            languages: "C#",
            technologyImgs: "csharp",
            languageCode: "ru"
        },
        {
            title: "Бот4",
            company: "Freelance",
            companyWebsite: "www.fl.ru",
            location: "Ukrain",
            jobTitle: "Engineer",
            description: `
                Разработка ботов для букмекерских сайтов под существующий интерфейс заказчика.
                Тесты для проверки корректности всех комбинаций ставок. 
            `,
            startDate: "2012-12-12T23:59Z",
            endDate: "2012-12-12T23:59Z",
            user: user1Id,

            category: "work",


            repository: "https://github.com/iadaria",
            deploy: null,
            taskDocument: "https://drive.google.com/file/d/0B6RuRX0jvwvCU2oyQ3pCa21KejA/view?usp=sharing",

            imgName: "default2.png",
            technologies: "C#; UnitTest; C#; UnitTest; WebApi; WebSocket; C#; UnitTest",
            languages: "C#",
            technologyImgs: "csharp",
            languageCode: "ru"
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
        { part: "mainMenu", key: "signIn", languageCode: "ru", value: "Войти" },
        { part: "mainMenu", key: "signIn", languageCode: "en", value: "Sign In" },

        { part: "mainMenu", key: "signOut", languageCode: "ru", value: "Выйти" },
        { part: "mainMenu", key: "signOut", languageCode: "en", value: "Sign Out" },

        { part: "mainMenu", key: "createPortfolio", languageCode: "ru", value: "Создать портфолио" },
        { part: "mainMenu", key: "createPortfolio", languageCode: "en", value: "Create portfolio" },

        { part: "mainMenu", key: "dashboard", languageCode: "ru", value: "Панель" },
        { part: "mainMenu", key: "dashboard", languageCode: "en", value: "Dashboard" },

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

        { part: "mainPage", key: "welcom", languageCode: "ru", value: `
            <p>
                Здравствуйте, Вы зашли на сайт Якимовой Дарьи.
            </p>
            <p>
                У меня Вы можете заказать мобильное приложение
                под Android/Ios, веб-сайт и др. приложение с использованием различных технологий.
            </p>
            <p>
                Я отвественно подхожу к выполнению задач, имею несколько лет опыта коммерческой разработки.
            </p>
        `.replace(/[ ]{2}|[\r\n\t]/g, "")},
        
        { part: "mainPage", key: "welcom", languageCode: "en", value: `
            <p>
                <b>Welcome</b> to the portfolio website of Iakimova Daria.
            </p>
            <p>
                Get informed, collaborate and discover projects I was working on through the years!
            </p>
            <p>
                I create Cross-Platform(Android/IOS) Hybrid Mobile App, web-app and others applications.
            </p>
        `.replace(/[ ]{2}|[\r\n\t]/g, "")},

        { part: "mainPage", key: "look", languageCode: "ru", value: "Здесь можно посомтреть на мои работы"},
        { part: "mainPage", key: "look", languageCode: "en", value: "Let's take a look on my work."},

        { part: "mainPage", key: "roles", languageCode: "en", value: "Creating Cross-Platform(Android/IOS) Hybrid Mobile Apps;Web-apps, back-end with ASP.NET;React.js;React Native;ASP.NET"},
        { part: "mainPage", key: "roles", languageCode: "ru", value: "Creating Cross-Platform(Android/IOS) Hybrid Mobile Apps;Web-apps, back-end with ASP.NET;React.js;React Native;ASP.NET"},
        
        { part: "mainPage", key: "services_title", languageCode: "ru", value: "Услуги"},
        { part: "mainPage", key: "services_title", languageCode: "en", value: "Services"},

        { part: "mainPage", key: "service_mobile_title", languageCode: "ru", value: "Создание мобильных приложений на React Native"},
        { part: "mainPage", key: "service_mobile_title", languageCode: "en", value: "Create Cross-Platform Hybrid Mobile Apps"},   
        { part: "mainPage", key: "service_mobile_description", languageCode: "ru", value: `
            Разработка гибридных мобильных приложений под IOS/Android на React Native.
            Составление ТЗ, прототипа, бэкэнда и развертывание, а также дальнейшая техническая
            поддержка.
        `.replace(/[ ]{2}|[\r\n\t]/g, "")},
        { part: "mainPage", key: "service_mobile_description", languageCode: "en", value: `
            Creating Cross-Platform Hybrid Mobile Apps(Android/IOS) with React Native.
            Writing  technical specifications, prototypes, back-ends and deploy, and will tecnical support.
        `.replace(/[ ]{2}|[\r\n\t]/g, "")},
        
        { part: "mainPage", key: "service_site_title", languageCode: "ru", value: "Создание web-приложений (сайты, backend, frontend)"},
        { part: "mainPage", key: "service_site_title", languageCode: "en", value: "Creating web-apps(sites, back, front)"},
        { part: "mainPage", key: "service_site_description", languageCode: "ru", value: `
            Применяемые технологии ASP.NET, React, Node.
            Регистрация доменов и хостингов, администрирование VPN, также развертывание.
        `.replace(/[ ]{2}|[\r\n\t]/g, "")},
        { part: "mainPage", key: "service_site_description", languageCode: "en", value: `
            With ASP.NET, React, Node.
            Registering domens and hostings, administrating VPN and deploying.
        `.replace(/[ ]{2}|[\r\n\t]/g, "")},

        { part: "mainPage", key: "service_bug_title", languageCode: "ru", value: "Доработка или исправление ошибок готового ПО"},
        { part: "mainPage", key: "service_bug_title", languageCode: "en", value: "Completion(finalize) others and figure out bugs of apps"},
        
        { part: "mainPage", key: "service_bug_description", languageCode: "ru", value: "Приемущественно React Native, ASP.NET, React, C#"},
        { part: "mainPage", key: "service_bug_description", languageCode: "en", value: "With React Native, ASP.NET, React, C#"},

        //Portfolios
        { part: "portfolios", key: "portfolios_header", languageCode: "en", value: "Portfolios"},
        { part: "portfolios", key: "portfolios_header", languageCode: "ru", value: "Работы"},

        { part: "portfolios", key: "technologies", languageCode: "en", value: "Technologies"},
        { part: "portfolios", key: "technologies", languageCode: "ru", value: "Технологии"},

        /* { part: "hero", key: "roles", languageCode: "ru", value: `
        `.replace(/[ ]{2}|[\r\n\t]/g, "")}, */

    ],
};

module.exports = data;
