import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, Avatar, Box, Button, Collapse, TextField } from "@mui/material";
import { useLoginQuery } from "../../slice/authApiSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router";
import { apiSlice } from "../../service/apiSlice";
import { setCredentials } from "../../slice/authSlice";

interface LoginError {
  valid?: boolean;
  email?: string;
  password?: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [skip, setSkip] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = React.useState<LoginError>({
    valid: false,
  });
  const { email, password } = formData;
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useLoginQuery(formData, { skip });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (loginError[e.target.name as keyof LoginError]) {
      setLoginError({
        ...loginError,
        [e.target.name]: null,
        valid: true,
      });
    }
    setSkip(true);
  };

  const findFormErrors = () => {
    const newErrors: LoginError = {};
    if (!email || email === "") newErrors.email = "Please enter your email.";
    if (!password || password === "")
      newErrors.password = "Please enter your password.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setLoginError(newErrors);
    } else {
      try {
        setSkip(false);
        refetch();

        if (data?.status === "ok") {
          dispatch(
            setCredentials({
              credentials: btoa(`${formData.email}:${formData.password}`),
              email: formData.email,
            })
          );
          setFormData({ ...formData, email: "", password: "" });
          navigate("/home/bills");
        }
      } catch (error) {
        setOpen(true);

        if (error && error?.data) {
          setLoginError({
            ...loginError,
            valid: false,
          });
        }
      }
    }
  };

  if (isLoading || isFetching) {
    return <div>Loading ...</div>;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            error={!!loginError.email}
            onChange={onChange}
            helperText={loginError?.email}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            error={!!loginError.password}
            onChange={onChange}
            helperText={loginError?.password}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {isError && open && (
            <Collapse in={open}>
              <Alert
                severity="error"
                onClose={() => {
                  setOpen(false);
                }}
                sx={{ mb: 2 }}
              >
                {error?.data?.message}
              </Alert>
            </Collapse>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
