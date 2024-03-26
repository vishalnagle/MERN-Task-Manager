import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    styled,
    TextField,
    Grid,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
} from "@material-ui/core";
import { Visibility, VisibilityOff, ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { useAuth } from "../context/UserContext";
export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const { login, openDialogSignUp,
        dialogMeassage, setOpenDialogSignUp, setdialogMeassage, handleCloseSignUp } = useAuth();
    const handleInputChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onLogin = async () => {
        if (loginData.email.length === 0 || loginData.password.length === 0) {
            setOpenDialogSignUp(true);
            setdialogMeassage("Fill all the fields")
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginData.email)) {
            setdialogMeassage("Enter correct format of email")
            setOpenDialogSignUp(true);
            return;
        }
        if (loginData.email.length < 6 || loginData.password.length < 6) {
            setdialogMeassage("pwd length should be 6")
            setOpenDialogSignUp(true);
            return;
        }

        login(loginData);

    };

    return (
        <div>
            <Box
                style={{
                    display: "flex",
                    padding: "15px",
                    borderRadius: "7px",
                    backgroundColor: "white",
                    maxWidth: "450px",
                    margin: "auto",
                }}
            >
                <div>
                    <ArrowBackIcon />
                </div>
                <div>
                    <Typography style={{ marginLeft: "30px" }}>Login</Typography>
                </div>
            </Box>
            <MainBox>
                <SignHeading>Sign In</SignHeading>
                <NameHeading>Email Id</NameHeading>
                <InputTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                />
                <NameHeading>Password</NameHeading>
                <InputTextField
                    data-test-id="handelInput"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    InputProps={{
                        endAdornment: (
                            <Button onClick={togglePasswordVisibility}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </Button>
                        ),
                    }}
                    type={showPassword ? "text" : "password"}
                />
                <Grid container justify="center">
                    <Grid item>
                        <LoginButton
                            variant="contained"
                            data-test-id="onLoginbtn"
                            onClick={onLogin}
                        >
                            Login
                        </LoginButton>
                    </Grid>
                </Grid>
            </MainBox>
            <div>
                <Dialog open={openDialogSignUp} onClose={handleCloseSignUp}>
                    <DialogTitle>Something went wrong</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialogMeassage}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSignUp} data-test-id="handleCloseSignUp" color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleCloseSignUp} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

const SignHeading = styled(Typography)({
    fontSize: "46px",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
});

const MainBox = styled(Box)({
    maxWidth: "450px",
    margin: "auto",
    backgroundColor: "#0000FF",
    padding: "20px",
});
const NameHeading = styled(Typography)({
    fontSize: "20px",
    fontWeight: 600,
    color: "white",
    marginTop: "10px",
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
    marginTop: "40px",
    backgroundColor: "white",
    textTransform: "none",
})
const InputTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "5px",
});
