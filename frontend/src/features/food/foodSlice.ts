import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Food } from "./models/Food";
import { SearchResponse } from "./models/SearchResponse";
import foodService from "./services/food.service";

interface FoodState {
    foodList?: Food[] | null;
    isLoading: boolean;
    searchResponse: SearchResponse | null;
    dataTableHeader: { header: string, key: string }[];
    showAlert: boolean;
    alertMsg: string | null;
}

const initialState: FoodState = {
    foodList: null,
    isLoading: false,
    searchResponse: null,
    dataTableHeader: [
        { header: 'Name', key: 'name' },
        { header: 'Made Date', key: 'dateAdded' },
        { header: 'Good Until', key: 'expiryDate' }
    ],
    showAlert: false,
    alertMsg: null,
}

export const searchFood = createAsyncThunk(
    'searchFood',
    async (searchText: string, thunkAPI) => {
        try {
            return await foodService.searchFood(searchText);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to search food');
        }
    }
);

export const addFood = createAsyncThunk(
    'addFood',
    async (foodList: Food[], thunkAPI) => {
        try {
            return await foodService.addFood(foodList);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to add food');
        }
    }
);

export const getFoodList = createAsyncThunk(
    'getFoodList',
    async (email: string, thunkAPI) => {
        try {
            return await foodService.getFoodList(email);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to get food list');
        }
    }
);

export const deleteFood = createAsyncThunk(
    'deleteFood',
    async (id: string, thunkAPI) => {
        try {
            return await foodService.deleteFood(id);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to search food');
        }
    }
);

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        reset: (state) => {
            state.foodList = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getFoodList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFoodList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.foodList = action.payload;
            })
            .addCase(getFoodList.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(searchFood.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchFood.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResponse = action.payload;
            })
            .addCase(searchFood.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addFood.pending, (state) => {
                state.isLoading = true;
                state.showAlert = false;
                state.alertMsg = null;
            })
            .addCase(addFood.fulfilled, (state) => {
                state.isLoading = false;
                state.searchResponse = null;
                state.showAlert = true;
                state.alertMsg = 'Food added to fridge';
            })
            .addCase(addFood.rejected, (state) => {
                state.isLoading = false;
                state.showAlert = true;
                state.alertMsg = 'Failed to add food';
            })
            .addCase(deleteFood.pending, (state) => {
                state.isLoading = true;
                state.showAlert = false;
                state.alertMsg = null;
            })
            .addCase(deleteFood.fulfilled, (state, action) => {
                state.isLoading = false;
                state.foodList = action.payload;
                state.showAlert = true;
                state.alertMsg = 'Food removed from fridge';
            })
            .addCase(deleteFood.rejected, (state) => {
                state.isLoading = false;
                state.showAlert = true;
                state.alertMsg = 'Failed to remove food';
            })
    },
});

export const { reset } = foodSlice.actions;

export const selectedFood = (state: RootState) => {
    return state.food;
}

export default foodSlice.reducer;