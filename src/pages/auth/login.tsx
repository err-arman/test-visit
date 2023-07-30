import SiteLogo from "@/assets/images/site-logo.png";
import validateToken from "@/utils/validateToken";
import {
  Alert,
  Anchor,
  Button,
  Center,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
// import Image from "next/image";

const Login = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    initialValues: {
      email: "gourabxz@gmail.com",
      password: "letsrock",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Too short password"),
    },
  });

  const handleLogin = async () => {
    axios
      .post("/api/login-api", {
        email: form.values.email,
        password: form.values.password,
      })
      .then((res) => {
        setErrorMessage("");
        if (res.data?.access_token) {
          router.push("/");
        } else {
          setErrorMessage("Could not process your request. Unknown error.");
        }
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message || "Something went wrong";
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <form onSubmit={form.onSubmit((values) => handleLogin())}>
          {/* site logo */}
          <Center py={40}>
            <Link href="/">
              <Image src={SiteLogo.src} alt="Site Logo" width={200} />
            </Link>
          </Center>

          <Title
            order={4}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            Provider Login
          </Title>

          <Alert
            title="Login failed"
            color="red"
            onClose={() => setErrorMessage("")}
            mt="md"
            mb="xl"
            hidden={!errorMessage}
          >
            {errorMessage}
          </Alert>

          {/* email input */}
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            required
            {...form.getInputProps("email")}
          />
          {/* password */}
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            required
            {...form.getInputProps("password")}
          />

          {/* login button */}
          <Button fullWidth mt="xl" size="md" type="submit" variant="secondary">
            Login
          </Button>

          {/* register page link */}
          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor<"a"> href="/auth/register" weight={700}>
              Register
            </Anchor>
          </Text>
        </form>
      </Paper>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colors.gray[3]}`,
    minHeight: rem(900),
    maxWidth: rem(550),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

// get server side props
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookieName = process.env.COOKIE_NAME;
  // get token from cookie
  const token = ctx.req.cookies?.[cookieName || ""];
  if (validateToken(token)) {
    return {
      // redirect to where user came from
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // if there is a token, return the token
  return {
    props: {},
  };
};

export default Login;
