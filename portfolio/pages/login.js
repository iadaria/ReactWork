import { useEffect, useRef } from "react";
import '../styles/pages/login.scss';
import BaseLayout from "@/components/layouts/BaseLayout";
import LoginForm from "@/components/forms/LoginForm";
import withApollo from "@/hoc/withApollo";
import { useSignIn } from "@/apollo/actions";
import { useRouter } from 'next/router';
import Redirect from "@/components/shared/Redirect";
import messages from "@/variables/messages";

const Login = () => {
  let disposeId = useRef(null); // always the same
  const [signIn, { data, loading, error }] = useSignIn();
  const router = useRouter();
  const { message } = router.query;
  const errorMessage = error => 
    (error.graphQLErrors && error.graphQLErrors[0].message) || 
    'Oooops somthing went wrong...';

  const disposeMessage = () => {
    router.replace('/login', '/login', {shallow: true});
  };

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => {
        disposeMessage();
      }, 3000);
    }

    return () => {
      clearTimeout(disposeId);
    };
  }, [message]);

  return (
    <BaseLayout>
      <div className="login bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>

            { message && <div className={`alert alert-${messages[message].status}`}>{messages[message].value}</div>}

            <LoginForm
              loading={loading} 
              onSubmit={(signInData) => signIn({variables: signInData})} />
            { data && data.signIn && <Redirect to="/" />}
            {error && <div className="alert alert-danger mt-3">{errorMessage(error)}</div>}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Login);
