import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
  Image,
  Center,
  Stack,
  ScrollArea,
} from "@mantine/core";
import SiteLogo from "@/assets/images/site-logo.png";
import { useForm } from "@mantine/form";
import Link from "next/link";
// import Image from "next/image";

const Signup = () => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Too short password"),
      termsOfService: (value) => (value ? null : "You must accept terms"),
    },
  });

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} py={0} px={30}>
        <ScrollArea h="100vh">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              mb={50}>
              Provider Signup
            </Title>

            <Stack spacing="md">
              {/* first name */}
              <TextInput
                label="First name"
                placeholder="John"
                size="md"
                required
                {...form.getInputProps("first_name")}
              />

              {/* last name */}
              <TextInput
                label="Last name"
                placeholder="Doe"
                size="md"
                required
                {...form.getInputProps("last_name")}
              />

              {/* email */}
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

              {/* terms of service */}
              <Checkbox
                label="I agree to terms of service"
                mt="xl"
                size="md"
                {...form.getInputProps("termsOfService", { type: "checkbox" })}
              />
            </Stack>

            {/* signup button */}
            <Button
              fullWidth
              mt="xl"
              size="md"
              type="submit"
              variant="secondary">
              Signup
            </Button>

            <Text ta="center" mt="md">
              Don&apos;t have an account?{" "}
              <Anchor<"a">
                href="#"
                weight={700}
                onClick={(event) => event.preventDefault()}>
                Register
              </Anchor>
            </Text>
          </form>

          {/* empty space. do not remove */}
          <div style={{ height: "100px" }}></div>
        </ScrollArea>
      </Paper>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colors.gray[3]}`,
    height: "100vh",
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

export default Signup;
