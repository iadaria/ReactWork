import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import LoginForm from "@/components/forms/LoginForm";
import withApollo from "@/hoc/withApollo";
import { useSignIn } from "@/apollo/actions";
import Redirect from "@/components/shared/Redirect";

const Login = () => {
  const [signIn, { data, loading, error }] = useSignIn();
  const errorMessage = error => 
    (error.graphQLErrors && error.graphQLErrors[0].message) || 
    'Oooops somthing went wrong...';

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>

            <div className={`alert alert-}`}></div>

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
