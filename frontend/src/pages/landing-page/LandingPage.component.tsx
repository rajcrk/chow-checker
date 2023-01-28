import './LandingPage.style.scss';
import SearchFoodFormComponent from '../../features/food/components/SearchFoodForm.component';
import SearchFoodResponseComponent from '../../features/food/components/SearchFoodResponse.component';
import FeaturedFoodComponent from '../../features/food/components/FeaturedFood.component';

export interface FoodResponse {
    title: string;

    count: string;
}

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page-container">
            <SearchFoodFormComponent />
            <SearchFoodResponseComponent />
            <div style={{ paddingBottom: "6em" }} ></div>
            <hr style={{width: "90%"}}/>
            <FeaturedFoodComponent />
        </div>
    );
};

export default LandingPage;