import { FC, FormEvent, useEffect } from "react";
import {
    Form,
    Stack,
    TextInput,
    Button,
    PasswordInput,
    Loading,
    Link,
} from '@carbon/react';
import useInput from "../../../hooks/useInput";
import {
    validateNameLength,
    validatePasswordLength
} from "../../../shared/utils/validation/length";
import { validateEmail } from "../../../shared/utils/validation/email";
import { NewUser } from "../models/NewUser";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../authSlice";
import { toast } from "react-toastify";

const RegistrationFormComponent: FC = () => {

    const {
        text: name,
        shouldDisplayError: nameHasError,
        textChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        clearHandler: nameClearHandler } = useInput(validateNameLength);

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

    const {
        text: confirmPassword,
        shouldDisplayError: confirmPasswordHasError,
        textChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        clearHandler: confirmPasswordClearHandler } = useInput(validatePasswordLength);


    const clearForm = () => {
        nameClearHandler();
        emailClearHandler();
        passwordClearHandler();
        confirmPasswordClearHandler();
    }

    const dispatch = useAppDispatch();

    const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            clearForm();
            navigate('/login');
        }
    }, [isSuccess, dispatch]);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast("There is a password mismatch!");
            return;
        }

        if (nameHasError || emailHasError
            || passwordHasError || confirmPasswordHasError) return;

        if (name.length === 0
            || email.length === 0
            || password.length === 0
            || confirmPassword.length === 0) return;

        const newUser: NewUser = {
            name, email, password
        };

        dispatch(register(newUser));
    };

    if (isLoading) return <Loading
        description="Active loading indicator" withOverlay={false} />

    return (
        <>
            <Form onSubmit={onSubmitHandler}>
                <Stack gap={7}>
                    <TextInput
                        helperText=""
                        id="name"
                        invalidText="Invalid name."
                        labelText="Name"
                        placeholder="Enter name"
                        name="name"
                        value={name}
                        onBlur={nameBlurHandler}
                        onChange={nameChangeHandler}
                        invalid={nameHasError}
                    />
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
                    <PasswordInput
                        value={confirmPassword}
                        helperText=""
                        id="confirmPassword"
                        invalidText="Invalid password."
                        labelText="Confirm Password"
                        placeholder="Enter password again"
                        name="confirmPassword"
                        onBlur={confirmPasswordBlurHandler}
                        invalid={confirmPasswordHasError}
                        onChange={confirmPasswordChangeHandler}
                    />
                    <Button
                        kind="primary"
                        tabIndex={0}
                        type="submit"
                    >
                        Register
                    </Button>
                </Stack>
            </Form>
            <div className="register-link-container">
                <Link onClick={() => navigate("/login")} className="register-link" inline={false}>Login with an existing account</Link>
            </div>
        </>
    );
};

export default RegistrationFormComponent;