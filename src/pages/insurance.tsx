import { GuestHeader } from "@/components/common/GuestHeader";
import { UserHeader } from "@/components/common/UserHeader";
import validateToken from "@/utils/validateToken";
import { Button, Container, Flex, Group, Text } from "@mantine/core";
import { GetServerSidePropsContext } from "next";

type Props = {
  token: string;
};

const Insurance = ({ token }: Props) => {
  return (
    <div>
      {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
      <Flex justify={"center"} align={"center"} py={28}>
        <Container size={"sm"}>
          <h3
            style={{
              textAlign: "center",
            }}
          >
            Track deductible spending and unlock hidden benefits
          </h3>
          <Text ta={"center"}>
            Snap a photo of your card to view your benefits and track your
            deductible.
          </Text>
          <br />
          <Group position="center">
            <Button w={"50%"} variant="secondary">
              add insurance
            </Button>
          </Group>
        </Container>
      </Flex>
    </div>
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

export default Insurance;
