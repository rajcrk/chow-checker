import { Loading, Grid, Column } from '@carbon/react';
import RegistrationFormComponent from '../../features/auth/components/RegistrationForm.component';
import './SignupPage.style.scss';
import image from './Asset6.png';

const SignupPage: React.FC = () => {

    return (
        <div >
            <Grid className="sign-up-grid">
                <Column lg={10} sm={0} md={0} style={{
                    backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", objectFit: "cover",
                    height: "100vh", width: "100%", marginLeft: 0
                }}>
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