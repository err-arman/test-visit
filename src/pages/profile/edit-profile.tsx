import { GuestHeader } from "@/components/common/GuestHeader";
import { UserHeader } from "@/components/common/UserHeader";
import axiosInstance, { setAuthToken } from "@/utils/api";
import validateToken from "@/utils/validateToken";
import { Button, Container, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";

type Props = {
  token: string;
};

const EditProfile = ({ token }: Props) => {
  setAuthToken(token);
  const user = useUser(token);

  const form = useForm({
    initialValues: {
      name: "" || user?.name,
      email: "" || user?.email,
      phone: "" || user?.phone,
      password: undefined,
      address: "" || user?.address,
    },
  });

  useEffect(() => {
    form.setFieldValue("name", user?.name);
    form.setFieldValue("email", user?.email);
    form.setFieldValue("phone", user?.phone);
    form.setFieldValue("address", user?.address);
  }, [user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axiosInstance
      .patch(`/users/update-one?id=${user?.id}`, form.values)
      .then((res) => console.log("update success", res))
      .catch((err) => console.log("error in update profile"));
  };

  return (
    <>
      {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
      <Container size={"xs"} p={10} mt={20} mb={30}>
        <form onSubmit={handleSubmit}>
          <Stack w={"400px"}>
            <TextInput
              placeholder="Your name"
              label="Full name"
              {...form.getInputProps("name")}
              required
            />
            <TextInput
              placeholder="Your email"
              label="Full email"
              type="email"
              {...form.getInputProps("email")}
              required
            />
            <TextInput
              placeholder="Your Mobile"
              label="Phone number"
              type="number"
              {...form.getInputProps("mobile_number")}
            />
            <TextInput
              label="Password"
              placeholder="password"
              type="password"
              {...form.getInputProps("password")}
            />
            <Textarea
              placeholder="Area"
              label="area"
              {...form.getInputProps("address")}
              required
            />

            <Button variant="secondary" type="submit">
              {" "}
              SAVE{" "}
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

// get server side props
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookieName = process.env.COOKIE_NAME;
  // get token from cookie
  const token = ctx.req.cookies?.[cookieName || ""];
  if (!validateToken(token)) {
    return {
      props: {},
    };
  }

  // if there is a token, return the token
  return {
    props: {
      token,
    },
  };
};

export default EditProfile;
