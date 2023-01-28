import { Button, Grid, Column } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import homeImage from './home.png';
import './HomePage.style.scss';
import { useAppSelector } from '../../hooks/redux/hooks';
import { Search } from '@carbon/react/icons';

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <>
            <div className="home-page-container">
                <Grid>
                        <Column lg={8} sm={0} md={0}>
                            <img src={homeImage} alt="home" height="400" width="400" />
                        </Column>
                        <Column lg={6} md={12} sm={4}>
                            <h3>Ever wondered how long you can keep your cooked food?</h3><br></br>
                            <h4>No need to worry anymore.</h4>
                            <hr></hr>
                            <div className='home-page-login-btn'>
                                {
                                    isAuthenticated ?
                                        (<Button renderIcon={Search} onClick={() => navigate('/search')}>
                                            Search for the food you just made
                                        </Button>)
                                        : (<Button onClick={() => navigate('/login')}>
                                            Login to use
                                        </Button>)
                                }
                            </div>
                        </Column>
                        <Column lg={2} md={0} sm={0}></Column>
                    
                </Grid>
            </div>
        </>
    );
}

export default HomePage;