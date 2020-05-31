import { useGetUser } from '@/apollo/actions';
import Redirect from '@/components/shared/Redirect';

export default (WrappedComponent, role) => (props) => {
  //usually data about user was got from cache, but this it get from server every time
  // network-only - mean without cache
  const { 
    data: { user } = {}, 
    loading, 
    error } = useGetUser({fetchPolicy: 'network-only'});
  console.log(user);

  debugger
  const isMatchOfRole = (!!user && user.role === role);
  const isOther = !loading && (!user || error) && typeof window !== 'undefined'; //is a browser

  //TODO: ????
  if (user && (!isMatchOfRole || isOther) ) return <Redirect to="/login" />
  if (user && isMatchOfRole) return <WrappedComponent {...props}/>;

  return <p>Authenticating....</p>;
}