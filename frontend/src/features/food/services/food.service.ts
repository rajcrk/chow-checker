import axios from "axios";
import moment from "moment";
import { Food } from "../models/Food";
import { SearchResponse } from "../models/SearchResponse";
import { UserFood } from "../models/UserFood";

const searchFood = async (
    searchText: string): Promise<SearchResponse | null> => {
    const jwt = JSON.parse(
        localStorage.getItem('jwt') || '{token: null}').token;

    const response =
        await axios.get(
            `${process.env.REACT_APP_BASE_API}/food/search/${searchText}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

    console.log('The response from searching food -> ', response.data);
    
    let searchResponse: SearchResponse = {
        name: searchText,
        daysToExpire: +response.data.message,
    }

    if (!response.data.isSuccess) {
        searchResponse.daysToExpire = -1;
    }

    return searchResponse;
}

const getFoodList = async (email: string): Promise<Food[] | null> => {
    const jwt = JSON.parse(
        localStorage.getItem('jwt') || '{token: null}').token;

    const response =
        await axios.get(
            `${process.env.REACT_APP_BASE_API}/food/${email}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response: any) =>
            _modifyFoodListResponse(response.data[0].foods));
    return response;
}

const addFood = async (foodList: Food[]): Promise<Food[] | null> => {
    const jwt = JSON.parse(
        localStorage.getItem('jwt') || '{token: null}').token;
    const email = JSON.parse(
        localStorage.getItem('user') || '{email: null}').email;
    const userFood: UserFood = { email, foods: foodList };

    const response =
        await axios.post(
            `${process.env.REACT_APP_BASE_API}/food`, userFood, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

    return response.data;
}

const deleteFood = async (id: string): Promise<Food[] | null> => {
    const jwt = JSON.parse(
        localStorage.getItem('jwt') || '{token: null}').token;
    const email = JSON.parse(
        localStorage.getItem('user') || '{email: null}').email;
    const response =
        await axios.delete(
            `${process.env.REACT_APP_BASE_API}/food/${email}/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response: any) =>
        _modifyFoodListResponse(response.data[0].foods));

    console.log('respose after deleting ');
    console.log(response);

    return response;
}

const _modifyFoodListResponse = async (foodList: any): Promise<Food[]> => {
    return Promise.all(
        foodList.map((food: any) => {
            return {
                name: food.name,
                dateAdded: moment(food.dateAdded).format("MMM Do"),
                expiryDate: moment(food.expiryDate).format("MMM Do"),
                id: food._id,
                action: food._id,
            }
        }));

}

const foodService = {
    getFoodList,
    addFood,
    searchFood,
    deleteFood
}

export default foodService;