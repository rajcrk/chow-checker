import { FC } from "react";
import { ClickableTile, Grid, Column } from '@carbon/react';
import { addFood } from "../foodSlice";
import { Food } from "../models/Food";
import { useAppDispatch } from "../../../hooks/redux/hooks";

const FeaturedFoodComponent: FC = () => {

    const dispatch = useAppDispatch();

    const onFoodAddHandler = (
        { name, daysToExpire }: 
        { name: string, daysToExpire: number }) => {
        if (!name || !daysToExpire) return;

        const dateAdded = new Date();
        const expiryDate = _addDays(dateAdded, daysToExpire);

        const foodList: Food[] = [
            { name, dateAdded, expiryDate }
        ]

        dispatch(addFood(foodList));
    }

    const _addDays = (date: Date, days: number): Date => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const featuredFood = [
        { name: "Chicken Curry", daysToExpire: 3 },
        { name: "Chicken Sandwitch", daysToExpire: 3 },
        { name: "Briyani", daysToExpire: 4 },
        { name: "Pork Sandwitch", daysToExpire: 3 },
        { name: "Food 3", daysToExpire: 2 },
        { name: "Food 6", daysToExpire: 3 },
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
                                onClick={() => onFoodAddHandler(food)}>
                                <h4 style={{ paddingBottom: "3em" }}>{food.name}</h4>
                                <p>You can use this for {food.daysToExpire} days</p>
                            </ClickableTile>
                        </Column>
                    );
                })}

            </Grid>
        </>
    );
};

export default FeaturedFoodComponent;