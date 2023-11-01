import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, Avatar, Box, Button, TextField } from "@mui/material";
import { useLoginQuery } from "../../slice/authApiSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router";

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
  const { data, isLoading, isFetching, isError, error, refetch } =
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
  };

  const findFormErrors = () => {
    const newErrors: LoginError = {};
    if (!email || email === "") newErrors.email = "Please enter your email.";
    if (!password || password === "")
      newErrors.password = "Please enter your password.";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setLoginError(newErrors);
    } else {
      try {
        setSkip((prev) => !prev);
        refetch({ user: email, pass: password });
        // dispatch(setCredentials({ ...userData, email }));
        setFormData({ ...formData, email: "", password: "" });
        navigate("/bills");
      } catch (error) {
        console.log(error);
      }
    }
  };
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
          {isError && (
            <Alert
              severity="error"
              onClose={() => {
                setOpen(!open);
              }}
              sx={{ mb: 2 }}
            >
              {error?.data?.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
