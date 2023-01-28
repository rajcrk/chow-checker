import { FC } from "react";
import { ClickableTile, Grid, Column } from '@carbon/react';

const FeaturedFoodComponent: FC = () => {

    const featuredFood = [
        { name: "Chicken Curry", days: 3 },
        { name: "Chicken Sandwitch", days: 3 },
        { name: "Briyani", days: 4 },
        { name: "Pork Sandwitch", days: 3 },
        { name: "Food 3", days: 2 },
        { name: "Food 6", days: 3 },
    ];

    return (
        <>
            <Grid style={{ marginBottom: "1em", marginTop: "3em" }}>
                <Column lg={16} md={8} sm={4}>
                    <h3> <span style={{ fontWeight: 600 }}>Featured food</span> (Click to add to your fridge)</h3>
                </Column>
            </Grid>
            <Grid>
                {featuredFood.map(function (food, i) {
                    return (
                        <Column lg={4} md={4} sm={4} key={i}
                            style={{ marginBottom: "2em" }}>
                            <ClickableTile
                                href="#">
                                <h4 style={{ paddingBottom: "3em" }}>{food.name}</h4>
                                <p>You can use this for {food.days} days</p>
                            </ClickableTile>
                        </Column>
                    );
                })}

            </Grid>
        </>
    );
};

export default FeaturedFoodComponent;