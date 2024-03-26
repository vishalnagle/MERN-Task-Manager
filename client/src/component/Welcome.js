import React from "react";
import {
    Box,
    Button,
    Typography,
    styled,
    Grid
} from "@material-ui/core";
export const Welcome = () => {
    const onSignIn = () => {
        window.location.replace('/login')
    };
    const onRegister = () => {
        window.location.replace('/register')
    };
    return (
        <div>
            <MainBox>
                <SignHeading>Welcome Back !!!</SignHeading>
                <ContainerGrid container justify="center">
                    <Grid item>
                        <LoginButton variant="contained" onClick={onSignIn} >
                            Sign In
                        </LoginButton>
                        <LoginButton variant="contained" onClick={onRegister} >
                            Sign Up
                        </LoginButton>
                    </Grid>
                </ContainerGrid>
            </MainBox>
        </div>
    );
};

const SignHeading = styled(Typography)({
    fontSize: "46px",
    marginTop: "40%",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
});

const ContainerGrid = styled(Grid)({
    marginTop: "30px",
});

const MainBox = styled(Box)({
    maxWidth: "450px",
    margin: "auto",
    backgroundColor: "#0000FF",
    padding: "20px",
});

const LoginButton = styled(Button)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 65px 12px 65px",
    borderRadius: "13px",
    fontSize: "14px",
    fontWeight: 700,
    color: "royalblue",
    marginTop: "25px",
    backgroundColor: "white",
    textTransform: "none",
    width: "100%",
});
export default Welcome;
