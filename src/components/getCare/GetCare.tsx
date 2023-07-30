import { Container, Group, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import SearchBox from "../search/SearchBox";
import { GetCareFeaturesCards } from "./GetCareFeaturesCards";

const GetCare = () => {
  const router = useRouter();

  return (
    <div>
      <Group>
        <Container size={"lg"} p={"30"}>
          <Stack spacing={6} py={28}>
            <h2 style={{ margin: 0 }}>Find care near you</h2>
            <SearchBox isLoading={false} />
          </Stack>

          {/* features cards: Urgent care, Video visits, Lab testing, Mental health */}
          <GetCareFeaturesCards />
        </Container>
      </Group>
    </div>
  );
};
export default GetCare;
