import { FC, FormEvent } from "react";
import { Button, Form, Loading, Search } from '@carbon/react';
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

    if (isLoading) return <Loading
        description="Active loading indicator" withOverlay={false} />

    return (
        <>
            <Form onSubmit={onSubmitHandler}>
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--offset-lg-5 cds--col-lg-6 center">
                            <Search
                                size="lg"
                                id="search"
                                name="search"
                                value={searchText}
                                placeholder="Enter food you prepared"
                                closeButtonLabelText="Clear search input"
                                onChange={searchTextChangeHandler}
                                labelText="Label "
                            />
                        </div>
                        <div className="cds--col-lg-5"></div>
                    </div>
                    <div className="cds--row landing-page-search-btn">
                        <div className="cds--offset-lg-7 cds--col-lg-7 center">
                            <Button type='submit'>Search</Button>
                        </div>
                        <div className="cds--col-lg-5"></div>
                    </div>
                </div>
            </Form>
        </>
    );
}

export default SearchFoodFormComponent;