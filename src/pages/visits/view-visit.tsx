import { GuestHeader } from "@/components/common/GuestHeader";
import { UserHeader } from "@/components/common/UserHeader";
import { Visit } from "@/types/Visit";
import axiosInstance, { setAuthToken } from "@/utils/api";
import { getFormattedLocalDate } from "@/utils/getFormatedLocalDate";
import validateToken from "@/utils/validateToken";
import {
  Container,
  Group,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
  createStyles,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  token: string;
};

const ViewVisit = ({ token }: Props) => {
  setAuthToken(token);
  const [visitInfo, setVisitInfo] = useState<Visit>();
  const { classes } = useStyles();
  const { visit_id } = useRouter().query;

  const form = useForm({
    initialValues: {
      patient_name: visitInfo?.patient_name,
      patient_email: visitInfo?.patient_email,
      patient_phone: visitInfo?.patient_phone,
      patient_sex: visitInfo?.patient_sex,
      location_name: visitInfo?.location.name,
      location_address: visitInfo?.location.address,
      visit_date: getFormattedLocalDate(new Date(visitInfo?.visit_date || "")),
      visit_time: visitInfo?.visit_time,
      reason_for_visit: visitInfo?.reason_for_visit,
    },
  });

  useEffect(() => {
    axiosInstance
      .get(`/visits/find-by-id?id=${visit_id}`)
      .then((res) => {
        setVisitInfo(res.data.data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  useEffect(() => {
    form.setFieldValue("patient_name", visitInfo?.patient_name);
    form.setFieldValue("patient_email", visitInfo?.patient_name);
    form.setFieldValue("patient_sex", visitInfo?.patient_sex);
    form.setFieldValue("location_name", visitInfo?.location.name);
    form.setFieldValue("reason_for_visit", visitInfo?.reason_for_visit);
    form.setFieldValue(
      "visit_date",
      getFormattedLocalDate(new Date(visitInfo?.visit_date || ""))
    ),
      form.setFieldValue("visit_time", visitInfo?.visit_time);
  }, [visitInfo]);

  // Cancel Visit function

  const handleClick = (e: any) => {
    e.preventDefault();
    axiosInstance
      .delete(`/visits/${visit_id}`)
      .then((res) => {
        console.log("delete", res.data);
      })
      .catch((err) => console.log("visit delete error", err));
  };

  return (
    <div>
      {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
      <Container size={"xs"} p={10} mt={20} mb={50}>
        <Group position="apart">
          <Title order={2} mb={10} align="center">
            Visit Information
          </Title>
          {/* cancel button */}

          {/* <Button variant="outline" onClick={handleClick}>
            Cancel Visit
          </Button> */}
        </Group>
        {/* visit info Input Field */}
        <form>
          <Stack spacing={"md"}>
            <TextInput
              label="what's your  name"
              placeholder="enter your  name"
              {...form.getInputProps("patient_name")}
              readOnly={form.values.patient_name ? true : false}
            />

            <TextInput
              label="what's your  email"
              placeholder="enter your  email"
              {...form.getInputProps("patient_email")}
              readOnly={form.values.patient_email ? true : false}
            />

            <TextInput
              label="what's your  phone"
              placeholder="enter your  phone"
              {...form.getInputProps("patient_phone")}
              readOnly={true}
            />

            <TextInput
              label="Visit Date"
              placeholder="Pick date"
              {...form.getInputProps("visit_date")}
              readOnly={form.values.visit_date ? true : false}
            />

            <Select
              label="Gender"
              data={["male", "female", "other"]}
              {...form.getInputProps("patient_sex")}
              readOnly={form.values.patient_sex ? true : false}
            />

            <Textarea
              label="Reason for visit"
              placeholder="reason"
              {...form.getInputProps("reason_for_visit")}
              readOnly={form.values.reason_for_visit ? true : false}
            />

            <TimeInput
              label="Visit Time"
              placeholder="Pick time"
              {...form.getInputProps("visit_time")}
              readOnly={form.values.visit_time ? true : false}
            />
          </Stack>
        </form>
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

export default ViewVisit;
