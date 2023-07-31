import { GuestHeader } from "@/components/common/GuestHeader";
import { UserHeader } from "@/components/common/UserHeader";
import GetCare from "@/components/getCare/GetCare";
import validateToken from "@/utils/validateToken";
import { createStyles } from "@mantine/core";
import { GetServerSidePropsContext } from "next/types";

type Props = {
  token?: string;
};

const Home = ({ token }: Props) => {
  const { classes } = useStyles();

  return (
    <div>
      {/* navbar */}
      {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
      {/* <h1>Home page</h1>
      <Link href="/auth/login">Login</Link> <br />
      <Link href="/locations/all-locations">All locations</Link> */}
      <GetCare />
    </div>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  return {};
});

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

export default Home;
