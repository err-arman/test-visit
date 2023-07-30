import { GuestHeader } from "@/components/common/GuestHeader";
import { UserHeader } from "@/components/common/UserHeader";
import validateToken from "@/utils/validateToken";
import {
  Button,
  Card,
  Container,
  Flex,
  Group,
  Tabs,
  Text,
} from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { Visit } from "../../types/Visit";
import axiosInstance, { setAuthToken } from "../../utils/api";
import { getFormattedLocalDate } from "../../utils/getFormatedLocalDate";

type Props = {
  token: string;
};

function Visits({ token }: Props) {
  setAuthToken(token);
  const user = useUser(token);

  const [visitDetails, setVisitDetails] = useState<Visit[]>();

  useEffect(() => {
    if (user?.id) {
      axiosInstance
        .get(`/visits/find-by-user-id?user_id=${user?.id}`)
        .then((res) => setVisitDetails(res.data.data))
        .catch((err) => console.log("visit error", err));
    }
  }, [user]);

  useEffect(() => {
    // console.log("visit details", visitDetails?.patient_name);
  }, [visitDetails]);

  return (
    <div>
      {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
      <Tabs defaultValue="upcomming" py={28}>
        <Tabs.List w={"100%"}>
          <Tabs.Tab w={"50%"} color={"myvisits-green"} value="upcomming">
            <Text>Upcomming</Text>
          </Tabs.Tab>
          <Tabs.Tab w={"50%"} color={"myvisits-green"} value="past">
            <Text>past</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upcomming" pt="xs">
          {/* incomming tab */}
          <Container size={"xl"}>
            {visitDetails ? (
              <div>
                {visitDetails.map((item) => (
                  <div>
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      mt={10}
                      withBorder
                    >
                      <h3> Location: {item?.location?.name} </h3>
                      <Text>address: {item?.location?.address}</Text>
                      <Text>
                        Visit Date:{" "}
                        {getFormattedLocalDate(new Date(item.visit_date))}
                      </Text>
                      <Text>
                        Visit Time:{" "}
                        {item.visit_time.split(":").slice(0, 2).join(":")}
                      </Text>
                      <Text>Reason: {item.reason_for_visit}</Text>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <Flex justify={"center"} align={"center"}>
                <div>
                  <h4
                    style={{
                      textAlign: "center",
                    }}
                  >
                    No Upcomming visits
                  </h4>
                  <Text
                    style={{
                      padding: "10px",
                    }}
                  >
                    When you’re ready to find and book care, we’ll be here to
                    help.
                  </Text>
                  <Group position="center">
                    <Button w={"70%"} variant="secondary">
                      Find Care Now
                    </Button>
                  </Group>
                </div>
              </Flex>
            )}
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="past" pt="xs">
          {/*  Past Tab */}
          <Container size={"xl"}>
            <Flex justify={"center"}>
              <div>
                <h4
                  style={{
                    textAlign: "center",
                  }}
                >
                  No Past visits
                </h4>
                <Text
                  style={{
                    padding: "10px",
                  }}
                >
                  When you’re ready to find and book care, we’ll be here to
                  help.
                </Text>
                <Group position="center">
                  <Button w={"70%"} variant="secondary">
                    Find Care Now
                  </Button>
                </Group>
              </div>
            </Flex>
          </Container>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

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

export default Visits;
