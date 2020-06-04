import { useGetUser } from "@/apollo/actions";
import Redirect from "@/components/shared/Redirect";
import SpinningLoader from '@/components/shared/Loader';

//ssr - server side rendering
export default (WrappedComponent, role, options = { ssr: false }) => {
  function WithAuth(props) {
    //usually data about user was got from cache, but this it get from server every time
    // network-only - mean without cache
    const { data: { user } = {}, loading, error } = useGetUser({
      fetchPolicy: "network-only",
    });

    //const isMatchOfRole = user && role && role.includes(user.role);
    //const isOther =
    //  !loading && (!user || error) && typeof window !== "undefined"; //is a browser

    if (
      !loading &&
      (!user || error) &&
      typeof window !== 'undefined'
    ) {
      return <Redirect to="/login" query={{message: 'NOT_AUTHENTICATED'}} />
    }

    if (user) {
      if (role && !role.includes(user.role)) {
        return <Redirect to="/login" query={{message: 'NOT_AUTHORIZED'}}/>
      }
      return <WrappedComponent {...props} />
    }

    return (
      <div className="spinner-container">
        <SpinningLoader variant="large" />;
      </div>
    );
  }

  if (options.ssr) {
    const serverRedirect = (res, to) => {
      res.redirect(to);
      res.end();
      return {};
    };

    WithAuth.getInitialProps = async (context) => {
      const { req, res } = context;

      if (req) {
        const { user } = req;

        if (!user) return serverRedirect(res, '/login?message=NOT_AUTHENTICATED');
        if (role && !role.includes(user.role)) serverRedirect(res, '/login?message=NOT_AUTHORIZED');
      }

      const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(context);
      return {...pageProps};
    };
  }

  return WithAuth;
};
