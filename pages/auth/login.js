import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { loginUser } from "../../utils/fetchApi";

export default function Login() {
  const router = useRouter();
  const [_, setCookie] = useCookies();
  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("success login: ", data);
      setCookie("userToken", data.token, { path: "/" });
      localStorage.setItem("userData", JSON.stringify(data.user));
      router.push("/");
    },
    onError: (err) => {
      if (err.response?.data) {
        console.log("error login: ", err.response.data);
        return;
      }

      console.log("error: ", err);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => mutate(data);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={2}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                {...register("email", { required: "Email is required." })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                {...register("password", { required: "Password is required." })}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.500"}>Forgot password?</Link>
              </Stack>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                type="submit"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
    </Stack>
  );
}
