import { Box, Text, Button, Input, Link } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";

const FormLogin = () => {
  return (
    <Box w={"full"} maxW={"400px"} p={4}>
      <Card w={"full"}>
        <CardBody>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Box display={'flex'} flexDirection={'column'} gap={'2'}>
              <Text fontSize={"2xl"} textAlign="center" as={"b"}>
                Log In to Dashboard Kit
              </Text>
              <Text fontSize={"sm"} textAlign="center" color="gray.500">
                Enter your email and password below
              </Text>
            </Box>

            <form action="">
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" />
                <Link
                  color="blue.500"
                  fontSize="sm"
                  display="block"
                  textAlign="right"
                  mt={1}
                >
                  Forgot password?
                </Link>
              </FormControl>
              <Button colorScheme="blue" w={"full"} mt={"20px"}>
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
              <Link color={"blue.500"}>Sign Up</Link>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default FormLogin;
