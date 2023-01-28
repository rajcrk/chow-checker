import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux/hooks";
import FoodCardComponent from "./FoodCard.component";
import { Grid, Column } from '@carbon/react';
import NoFoodResponseComponent from "./NoFoodResponse.component";

const SearchFoodResponseComponent: FC = () => {

    const { isLoading, searchResponse } = useAppSelector((state) => state.food);

    if (isLoading) return <></>;

    if (searchResponse == null) return <></>;

    if (searchResponse.daysToExpire === -1)
        return <NoFoodResponseComponent />

    return (
        <div className='landing-page--response-container'>
            <Grid>
                <Column lg={4} md={0} sm={0}></Column>
                <Column lg={8} md={8} sm={4}>
                    <FoodCardComponent
                        name={searchResponse.name}
                        daysToExpire={searchResponse.daysToExpire}
                    />
                </Column>
                <Column lg={4} md={0} sm={0}></Column>
            </Grid>
        </div>
    );
}

export default SearchFoodResponseComponent;