import './LandingPage.style.scss';
import SearchFoodFormComponent from '../../features/food/components/SearchFoodForm.component';
import SearchFoodResponseComponent from '../../features/food/components/SearchFoodResponse.component';

export interface FoodResponse {
    title: string;

    count: string;
}

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page-container">
            <SearchFoodFormComponent />
            <SearchFoodResponseComponent />
        </div>
    );
};

export default LandingPage;