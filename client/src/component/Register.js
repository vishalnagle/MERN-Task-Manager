import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Grid,
    styled,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogActions,
    DialogContent,
} from "@material-ui/core";
import { VisibilityOff, Visibility, ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { useAuth } from "../context/UserContext";

export const Register = () => {
    const { register, openDialogSignUp,
        dialogMeassage, setOpenDialogSignUp, setdialogMeassage, handleCloseSignUp } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [regData, setRegData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleInputChange = (e) => {
        setRegData({
            ...regData,
            [e.target.name]: e.target.value,
        });
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = () => {
        if (regData.name.length === 0 || regData.email.length === 0 || regData.password.length === 0) {
            setdialogMeassage("Fill all the fields")
            setOpenDialogSignUp(true);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(regData.email)) {
            setdialogMeassage("Enter correct format of email")
            setOpenDialogSignUp(true);
            return;
        }
        if (regData.email.length < 6 || regData.password.length < 6) {
            setdialogMeassage("pwd length should be 6")
            setOpenDialogSignUp(true);
            return;
        }
        register(regData);
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
                    <Typography style={{ marginLeft: "30px" }}>Register</Typography>
                </div>
            </Box>
            <RegisterBox>
                <RegisterHead>Sign Up</RegisterHead>
                <RegisterNameHead>Full Name</RegisterNameHead>
                <InputTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="fullName"
                    placeholder="Full Name"
                    name="name"
                    onChange={handleInputChange}
                />
                <RegisterNameHead>Email Id</RegisterNameHead>
                <InputTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleInputChange}
                />

                <RegisterNameHead>Password</RegisterNameHead>
                <InputTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    placeholder="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleInputChange}
                    InputProps={{
                        endAdornment: (
                            <Button
                                data-test-id="togglePasswordVisibility"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </Button>
                        ),
                    }}
                />
                <Grid container justify="center">
                    <Grid item>
                        <RegisterButton
                            variant="contained"
                            onClick={handleSubmit}
                            data-test-id="toggleVisibilty"
                        >
                            Register
                        </RegisterButton>
                    </Grid>
                </Grid>
            </RegisterBox>
            <div>
                <Dialog open={openDialogSignUp} onClose={handleCloseSignUp}>
                    <DialogTitle>Something went wrong</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialogMeassage}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseSignUp}
                            data-test-id="handleCloseSignUp"
                            color="primary"
                        >
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

const RegisterHead = styled(Typography)({
    fontSize: "46px",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
});

const RegisterBox = styled(Box)({
    maxWidth: "450px",
    margin: "auto",
    backgroundColor: "#0000FF",
    padding: "20px",
});

const RegisterNameHead = styled(Typography)({
    fontSize: "20px",
    fontWeight: 600,
    color: "white",
    marginTop: "10px",
});

const RegisterButton = styled(Button)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 50px 12px 50px",
    borderRadius: "13px",
    fontSize: "14px",
    fontWeight: 700,
    color: "royalblue",
    marginTop: "40px",
    backgroundColor: "white",
    textTransform: "none",
});

const InputTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "5px",
});

export default Register;
