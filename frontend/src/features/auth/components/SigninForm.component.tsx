import { FC, FormEvent, useEffect } from "react";
import {
    Form,
    Stack,
    TextInput,
    Button,
    PasswordInput,
    Link,
    Loading,
    Grid,
    Column,
} from '@carbon/react';
import useInput from "../../../hooks/useInput";
import { validateEmail } from "../../../shared/utils/validation/email";
import { validatePasswordLength } from "../../../shared/utils/validation/length";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { LoginUser } from "../models/LoginUser.interface";

const SigninFormComponent: FC = () => {

    const {
        text: email,
        shouldDisplayError: emailHasError,
        textChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        clearHandler: emailClearHandler } = useInput(validateEmail);

    const {
        text: password,
        shouldDisplayError: passwordHasError,
        textChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        clearHandler: passwordClearHandler } = useInput(validatePasswordLength);

    const clearForm = () => {
        emailClearHandler();
        passwordClearHandler();
    }

    const dispatch = useAppDispatch();
    const { isLoading, isSuccess, isAuthenticated }
        = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            clearForm();
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        if (!isAuthenticated) return;
        navigate('/search');
    }, [isAuthenticated]);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailHasError || passwordHasError) return;

        if (email.length === 0 || password.length === 0) return;

        const loginUser: LoginUser = { email, password };

        dispatch(login(loginUser));
    };

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
            <Form onSubmit={onSubmitHandler}>
                <Stack gap={7}>
                    <TextInput
                        value={email}
                        helperText=""
                        id="email"
                        invalidText="Invalid email."
                        labelText="Email"
                        placeholder="Enter email address"
                        name="email"
                        onBlur={emailBlurHandler}
                        invalid={emailHasError}
                        onChange={emailChangeHandler}
                    />
                    <PasswordInput
                        value={password}
                        helperText=""
                        id="password"
                        invalidText="Invalid password."
                        labelText="Password"
                        placeholder="Enter password"
                        name="password"
                        onBlur={passwordBlurHandler}
                        invalid={passwordHasError}
                        onChange={passwordChangeHandler}
                    />
                    <Button
                        kind="primary"
                        tabIndex={0}
                        type="submit"
                    >
                        Login
                    </Button>
                </Stack>
            </Form>
            <div className="register-link-container">
                <Link onClick={() => navigate("/signup")} className="register-link" inline={false}>Register new user</Link>
            </div>
        </>
    )
}

export default SigninFormComponent;