import React, { useState } from "react";
import {
  Flex,
  Box,
  Input,
  Checkbox,
  Link as L,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const [checked, setChecked] = useState(false);

  const dipatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = () => {
    dipatch(login(userData));
  };

  return (
    <div>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6} py={12}>
          <Stack align={"center"}>
            <Heading fontSize="4xl">Sign in to your account</Heading>
            <Text fontSize="lg" color={"gray.600"}>
              to enjoy all of our cool <L color={"blue.400"}>features</L>
              ✌️
            </Text>
          </Stack>
          <Box
            boxShadow="lg"
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            p={8}
          >
            <Stack spacing={4}>
              <Input
                placeholder="firstname@lastname.io"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                type="email"
                name="email"
                onChange={handleInputChange}
              />
              <Input
                placeholder="**********"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                type="password"
                name="password"
                onChange={handleInputChange}
              />
              <Stack spacing={10}>
                <Stack
                  align={"start"}
                  justify={"space-between"}
                  direction={{ base: "column", sm: "row" }}
                >
                  <Checkbox
                    value={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                  <L color={"blue.400"}>Forgot Password</L>
                </Stack>
                <Button
                  fontFamily={"heading"}
                  mt={8}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default Login;
