export default class BookstoreService {
    data = [
        { 
            id: 1, 
            title: 'Production-Ready Microservices',
            author: 'Susan J. Fowler',
            price: 32,
            coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51oxXEG6TRL._SX379_BO1,204,203,200_.jpg'
        },
        {
            id: 2,
            title: 'Release It!',
            author: "Michael T.Nygard",
            price: 44,
            coverImage: 'https://images-na.ssl-images-amazon.com/images/I/419zAwJJH4L._SX415_BO1,204,203,200_.jpg'
        },
        { 
            id: 3, 
            title: 'JavaScript Patterns',
            author: 'Susan J. Fowler',
            price: 12,
            coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51%2Bj2Z6F66L._SX379_BO1,204,203,200_.jpg'
        },
        {
            id: 4,
            title: 'Introduction to JavaScript Object Notation',
            author: "Michael T.Nygard",
            price: 14,
            coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51gKiztsn-L._SX379_BO1,204,203,200_.jpg'
        }
    ];

    get Books() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //resolve(this.data)
                reject(new Error('Somethin bad happend'))
            }, 700);
        });
    }
}