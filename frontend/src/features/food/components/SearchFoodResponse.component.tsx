import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux/hooks";
import FoodCardComponent from "./FoodCard.component";
import { Grid, Column, Tile } from '@carbon/react';

const SearchFoodResponseComponent: FC = () => {

    const { isLoading, searchResponse } = useAppSelector((state) => state.food);

    if (isLoading) return <></>;

    if (searchResponse == null) return <></>;

    if (searchResponse.daysToExpire === -1)
        return (
            <Grid style={{ marginTop: "2em" }}>
                <Column lg={4} md={0} sm={0}></Column>
                <Column lg={8} md={8} sm={4}>
                    <Tile>
                        <h3 style={{ fontWeight: 600 }}>Woah you must be a chef! 😅</h3>
                        <hr></hr>
                        <p>You just cooked a food that I'm unable to find.</p>
                        <p>Try searching for another food</p>
                    </Tile>
                </Column>
                <Column lg={4} md={0} sm={0}></Column>
            </Grid>
        );

    return (
        <>
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
        </>
    );
}

export default SearchFoodResponseComponent;