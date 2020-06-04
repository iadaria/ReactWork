import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import RegisterForm from "@/components/forms/RegisterForm";
import { Mutation } from "react-apollo";
import { SIGN_UP } from "@/apollo/queries";
import withApollo from "@/hoc/withApollo";
import Redirect from "@/components/shared/Redirect";

const Register = () => {
  const errorMessage = (error) => 
    (error.graphQLErrors && error.graphQLErrors[0].message) || 
    'Oooops somthing went wrong...';

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <Mutation mutation={SIGN_UP}>
              {(signUpUser, { data, error }) => {
                console.log(data);
                return (
                  <>
                    <RegisterForm
                      onSubmit={(registerData) => {
                        signUpUser({ variables: registerData });
                      }}
                    />
                    {data && data.signUp && <Redirect to="/login" query={{message: 'LOGGED_IN'}}/>}
                    {error && (
                      <div className="alert alert-danger mt-3">
                        {errorMessage(error)}
                      </div>
                    )}
                  </>
                )}
              }
            </Mutation>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Register);
