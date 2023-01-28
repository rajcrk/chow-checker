import { FC, FormEvent } from "react";
import { Button, Form, Loading, Search, Grid, Column } from '@carbon/react';
import useInput from "../../../hooks/useInput";
import { validateSearchLength } from "../../../shared/utils/validation/length";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { searchFood } from "../foodSlice";

const SearchFoodFormComponent: FC = () => {

    const dispatch = useAppDispatch();

    const { isLoading } = useAppSelector((state) => state.food);

    const {
        text: searchText,
        shouldDisplayError: searchTextHasError,
        textChangeHandler: searchTextChangeHandler,
        inputBlurHandler: searchTextBlurHandler,
        clearHandler: searchTextClearHandler } = useInput(validateSearchLength);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        if (searchTextHasError) return;
        if (searchText.length === 0) return;

        dispatch(searchFood(searchText));
    }

    if (isLoading) return (
        <Grid>
            <Column lg={{ span: 4, offset: 6 }}>
                <Loading
                    description="Active loading indicator" withOverlay={false} />
            </Column>
        </Grid>
    );

    return (
        <>
            <Grid style={{ marginBottom: "1em" }}>
                <Column lg={4} sm={0} md={0}></Column>
                <Column lg={8} md={8} sm={4}> <h3 style={{ fontWeight: 600 }}>Find the food you cooked!</h3> </Column>
                <Column lg={4} sm={0} md={0}></Column>
            </Grid>
            <Form onSubmit={onSubmitHandler}>
                <Grid>
                    <Column lg={4} sm={0} md={0}></Column>
                    <Column lg={8} md={8} sm={4}>
                        <Search
                            size="lg"
                            id="search"
                            name="search"
                            value={searchText}
                            placeholder="Search food by name"
                            closeButtonLabelText="Clear search input"
                            onChange={searchTextChangeHandler}
                            labelText="Label "
                        />
                    </Column>
                    <Column lg={4} sm={0} md={0}></Column>
                </Grid>
                {/* <Grid className="landing-page-search-btn">
                    <Column lg={5}></Column>
                    <Column lg={{ span: 6, offset: 7 }} md={{ span: 6, offset: 2 }} sm={4}>
                        <Button type='submit'>Search</Button>
                    </Column> */}
                {/* <Column lg={5}></Column> */}
                {/* </Grid> */}

            </Form>
        </>
    );
}

export default SearchFoodFormComponent;