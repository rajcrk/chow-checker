import { Grid, Column } from '@carbon/react';
import RegistrationFormComponent from '../../features/auth/components/RegistrationForm.component';
import './SignupPage.style.scss';

const SignupPage: React.FC = () => {

    return (
        <div>
            <Grid className="sign-up-grid">
                <Column lg={10} sm={0} md={0} className="sign-up-left-column">
                    <div className='sign-up-left-column-inner'>
                        <h2 className="heading">Digital platform for food validation.</h2>
                        <hr></hr>
                        <h2 className='sub-heading'>Register a new account now!</h2>
                    </div>
                </Column>
                <Column lg={5} md={8} sm={4}>
                    <div className="login-page-container">
                        <div className='login-page-form-text'>
                            <h3>Register a new account</h3>
                            <hr></hr>
                        </div>
                        <div className='login-page-form-container'>
                            <RegistrationFormComponent />
                        </div>
                    </div>
                </Column>
                <Column lg={1} md={0} sm={0}></Column>
            </Grid>
        </div>
    );
};

export default SignupPage;