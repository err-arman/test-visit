import { GuestHeader } from "@/components/common/GuestHeader";
import { UserHeader } from "@/components/common/UserHeader";
import validateToken from "@/utils/validateToken";
import {
  Button,
  Container,
  Flex,
  Group,
  Text,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Location } from "../types/Location";
import api from "../utils/api";

type Props = {
  token: string;
};

const Hospital = ({ token }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [hospital, setHospital] = useState<Location>();
  const router = useRouter();
  let { location_id } = router.query;
  const { classes } = useStyles();
  // call api with location id
  useEffect(() => {
    const url = `/locations/find-by-id?id=${location_id}`;
    api
      .get(url)
      .then((res) => setHospital(res.data.data))
      .catch((e) => console.log("location err", e));
  }, [location_id]);

  useEffect(() => {
    console.log("hospital", hospital);
  }, [hospital]);

  return (
    <div>
      {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
      <Container size={"sm"}>
        <div>
          <Flex gap={"xl"}>
            <div>
              <div>
                <Group>
                  {/* <Image
                    width={100}
                    height={100}
                    // src={location.image}
                    radius={100}
                  /> */}
                  <h1>{hospital?.name}</h1>
                </Group>

                <p>open until {hospital?.closes_at}</p>
              </div>
              {/* pass hospital id with url */}
              <Link
                href={
                  `/visits/create-visit` +
                  `?location_id=${hospital?.id}` +
                  `&provider_id=${hospital?.provider?.id}`
                }
              >
                <Button w={"80%"} variant="secondary">
                  Book a Visit
                </Button>
              </Link>
              <h3>Highlight</h3>
              <Text>
                {hospital?.speciality} Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Amet, laborum!
              </Text>
              <h3>Location</h3>
              <Text>{hospital?.address}</Text>
              <h3>Service</h3>
              <Text>{hospital?.services}</Text>
            </div>
          </Flex>
        </div>
      </Container>
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

export default Hospital;
