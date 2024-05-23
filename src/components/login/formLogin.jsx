import { useState } from "react";
import { Box, Text, Button, Input, Link } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import data from "../../data/mockData.json";

const FormLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk menunjukkan password

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    // Find admin user by email
    const user = data.Admins.find(
      (admin) => admin.email === email.toLowerCase()
    );

    if (!user || user.password !== password) {
      setError("Invalid email or password.");
      return;
    }

    // Successful login, redirect to dashboard (not implemented here)
    alert(`Login successful ${user.email}`);
    onLogin(user);
    navigate("/dashboard/overview");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box w={"full"} maxW={"400px"} p={4}>
      <Card w={"full"}>
        <CardBody>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Box display={"flex"} flexDirection={"column"} gap={"2"}>
              <Text fontSize={"2xl"} textAlign="center" as={"b"}>
                Log In to Dashboard Kit
              </Text>
              <Text fontSize={"sm"} textAlign="center" color="gray.500">
                Enter your email and password below
              </Text>
            </Box>

            <form onSubmit={handleLogin}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  size="sm"
                  onClick={togglePasswordVisibility}
                  mt={2}
                  variant="link"
                  colorScheme="blue"
                >
                  {showPassword ? "Hide" : "Show"} Password
                </Button>
                <Link
                  color="blue.500"
                  fontSize="sm"
                  display="block"
                  textAlign="right"
                  mt={1}
                  onClick={() => alert("Password recovery not implemented")}
                >
                  Forgot password?
                </Link>
              </FormControl>
              {error && (
                <Text color="red.500" mt={2}>
                  {error}
                </Text>
              )}
              <Button type="submit" colorScheme="blue" w={"full"} mt={"20px"}>
                Log In
              </Button>
            </form>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
              mt={4}
            >
              <Text>Dont have an account?</Text>
              <Link
                color={"blue.500"}
                onClick={() => alert("Sign Up functionality not implemented")}
              >
                Sign Up
              </Link>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              mt={2}
              fontSize={"sm"}
            >
              <Link color={"blue.700"}>log in as Guest</Link>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

FormLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default FormLogin;
