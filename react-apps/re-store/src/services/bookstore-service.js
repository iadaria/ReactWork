export default class BookstoreService {
    get Books() {
        return [
            { 
                id: 1, 
                title: 'Production-Ready Microservices',
                author: 'Susan J. Fowler'
            },
            {
                id: 2,
                title: 'Release It!',
                author: "Michael T.Nygard"
            }
        ];
    }
}