import React from 'react';
import './profile-edit-form.sass';
import { combineValidators, isRequired } from 'revalidate';
import { Form as FinalForm, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import { IProfile } from '../../app/models/profile';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
    displayName: isRequired('displayName')
});

interface IProps {
    updateProfile: (profile: Partial<IProfile>) => void;
    profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
    return (
        <FinalForm
            initialValues={profile}
            onSubmit={updateProfile}
            validate={validate}
            render={({ handleSubmit, invalid, pristine, submitting }) => (
                <form 
                    style={{textAlign: 'right'}}
                    className="profile-edit-form" 
                    onSubmit={handleSubmit} 
                    autoComplete="Off"
                >
                    <Field
                        component={TextInput}
                        value={profile!.displayName}
                        name='displayName'
                        placeholder='Display name'
                        label="Display name"
                    />
                    <Field
                        component={TextAreaInput}
                        value={profile!.bio}
                        name="bio"
                        placeholder="Bio"
                        rows="4"
                    />
                    <Button
                        className="btn-success"
                        color="primary"
                        type="submit"
                        disabled={submitting || invalid || pristine}
                        variant="contained"
                        size="small"
                    >
                        {submitting && <CircularProgress size='1.3rem' />}
                        {!submitting && 'Submit'}
                    </Button>
                </form>
            )}
        />
    );
};

export default observer(ProfileEditForm);
