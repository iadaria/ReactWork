import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import moment from 'moment';

export default withApollo(
    ({ initialState, headers }) => {
        //console.log('process.env', process.env);
        console.log('process.env.BASE_URL', process.env.BASE_URL);
        return new ApolloClient({
            request: operation => {
                operation.setContext({
                    fetchOptions: {
                        credentials: 'include'
                    },
                    headers
                })
            },
            //uri: 'http://localhost:3000/graphql',
            uri: process.env.BASE_URL,
            cache: new InMemoryCache().restore(initialState || {}),
            resolvers: {
                Portfolio: {
                    daysOfExperience(data, args, { cache }) {
                        const { startDate, endDate } = data;
                        let now = endDate ? (endDate / 1000) : moment().unix();

                        return moment.unix(now).diff(moment.unix(startDate / 1000), 'days');
                    }
                }
            }
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);