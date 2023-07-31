import { GuestHeader } from "@/components/common/GuestHeader";
import { UserHeader } from "@/components/common/UserHeader";
import { getFormattedLocalDate } from "@/utils/getFormatedLocalDate";
import validateToken from "@/utils/validateToken";
import {
  Button,
  Container,
  Flex,
  Group,
  ScrollArea,
  Table,
  Tabs,
  Text,
} from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { Visit } from "../../types/Visit";
import axiosInstance, { setAuthToken } from "../../utils/api";
type Props = {
  token: string;
};

function Visits({ token }: Props) {
  setAuthToken(token);
  const router = useRouter();
  const user = useUser(token);
  const [visitDetails, setVisitDetails] = useState<Visit[]>();

  // call all visits data with user id
  useEffect(() => {
    if (user?.id) {
      axiosInstance
        .get(`/visits/find-by-user-id?user_id=${user?.id}`)
        .then((res) => setVisitDetails(res.data.data))
        .catch((err) => console.log("visit error", err));
    }
  }, [user]);

  return (
    <div>
      {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
      <Tabs defaultValue="upcomming" py={28}>
        {/* tab list */}
        <Tabs.List w={"100%"}>
          <Tabs.Tab w={"50%"} color={"myvisits-green"} value="upcomming">
            <Text>Upcomming</Text>
          </Tabs.Tab>
          <Tabs.Tab w={"50%"} color={"myvisits-green"} value="past">
            <Text>past</Text>
          </Tabs.Tab>
        </Tabs.List>

        {/* tab pannel */}
        <Tabs.Panel value="upcomming" pt="xs">
          {/* incomming tab */}
          <Container size={"xl"}>
            {visitDetails?.length ? (
              <ScrollArea h={`calc(100vh - 179px)`}>
                <div>
                  {/* visits table */}
                  <Table>
                    <thead>
                      <tr>
                        <th>Location</th>
                        <th>visit date</th>
                        <th>visit time</th>
                        <th>reason</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitDetails?.map((visit) => (
                        <tr>
                          <td>{visit.location.name}</td>
                          <td>
                            {getFormattedLocalDate(new Date(visit.visit_date))}
                          </td>
                          <td>
                            {" "}
                            {visit.visit_time.split(":").slice(0, 2).join(":")}
                          </td>
                          <td width={"30%"}>
                            {" "}
                            <ScrollArea h={80}>
                              <Text> {visit.reason_for_visit} </Text>
                            </ScrollArea>{" "}
                          </td>

                          <Button
                            variant="primary"
                            w={"80%"}
                            onClick={() => {
                              router.push(
                                `/visits/view-visit?visit_id=${visit.id}`
                              );
                            }}
                          >
                            Details
                          </Button>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </ScrollArea>
            ) : (
              // if no visits under the user
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
            {/* no past visit */}
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
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
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
