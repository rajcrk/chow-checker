import { FC } from "react";
import { Tile, Button } from '@carbon/react';
import { SearchResponse } from "../models/SearchResponse";
import { useAppDispatch } from "../../../hooks/redux/hooks";
import { addFood } from "../foodSlice";
import { Food } from "./../models/Food";

const FoodCardComponent: FC<SearchResponse> = ({ name = '', daysToExpire = 0 }) => {

    const dispatch = useAppDispatch();

    const onFoodAddHandler = () => {
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

    return (
        <>
            <Tile
                id="clickable-tile-1">
                <h4>{name} - {daysToExpire} Days </h4>
                <hr />
                {
                    daysToExpire !== null 
                        && daysToExpire !== undefined 
                        && daysToExpire > 0 &&
                    <Button onClick={onFoodAddHandler}>
                        Add Food to Your Fridge!
                    </Button>
                }
            </Tile>
        </>
    );
}

export default FoodCardComponent;