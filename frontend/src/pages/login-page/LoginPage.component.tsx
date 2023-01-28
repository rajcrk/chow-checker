import SigninFormComponent from '../../features/auth/components/SigninForm.component';
import './LoginPage.style.scss';

const LoginPage: React.FC = () => {

    return (
        <div className="registration-page-container">
            <div className="cds--grid">
                <div className="cds--row">
                    <div className="cds--offset-lg-5 cds--col-lg-6 center">
                        <div className='login-page-form-text'>
                            <h3>Welcome back</h3>
                            <hr></hr>
                        </div>
                        <div className='login-page-form-container'>
                            <SigninFormComponent />
                        </div>
                    </div>
                    <div className="cds--col-lg-5"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;