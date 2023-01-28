import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux/hooks";
import FoodCardComponent from "./FoodCard.component";

const SearchFoodResponseComponent: FC = () => {

    const { isLoading, searchResponse } = useAppSelector((state) => state.food);

    if (isLoading) return <></>;

    if (searchResponse == null) return <></>;

    return (
        <>
            <div className='landing-page--response-container'>
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--offset-lg-6 cds--col-lg-4 center">
                            <FoodCardComponent
                                name={searchResponse.name}
                                daysToExpire={searchResponse.daysToExpire}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchFoodResponseComponent;