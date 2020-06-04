import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import moment from 'moment';

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include'
          },
          headers
        })
      },
      uri: 'http://localhost:3000/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Portfolio: {
          daysOfExperience(data, args, {cache}) {
            const { startDate, endDate } = data;
            let now =  endDate ? (endDate / 1000) : moment().unix();
            
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