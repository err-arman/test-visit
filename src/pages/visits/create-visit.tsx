import { GuestHeader } from "@/components/common/GuestHeader";
import { UserHeader } from "@/components/common/UserHeader";
import validateToken from "@/utils/validateToken";
import {
  Button,
  Container,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
  createStyles,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import api from "../../utils/api";
import { getFormattedLocalDate } from "../../utils/getFormatedLocalDate";

type Props = {
  token: string;
};

const CreateVisit = ({ token }: Props) => {
  const router = useRouter();
  const { location_id, provider_id } = useRouter().query;
  const ref = useRef<HTMLInputElement>();
  let user = useUser(token);
  const [isLoading, setIsloading] = useState(false);
  const { classes } = useStyles();
  // visit form
  const form = useForm({
    initialValues: {
      location_id: location_id,
      provider_id: provider_id,
      user_id: user?.id || undefined,
      visit_date: "",
      visit_time: "",
      patient_name: user?.name || undefined,
      patient_email: user?.email || "",
      patient_phone: user?.phone || undefined,
      patient_date_of_birth: "",
      patient_sex: "",
      reason_for_visit: "",
    },

    validate: {
      patient_email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  useEffect(() => {
    if (user?.id) {
      form.setFieldValue("user_id", user.id);
      form.setFieldValue("patient_name", user.name);
      form.setFieldValue("patient_email", user.email);
      form.setFieldValue("patient_phone", user.phone);
    }
  }, [user]);

  // comfirm visit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsloading(true);
    const formData = {
      ...form.values,
      visit_date: getFormattedLocalDate(new Date(form.values.visit_date)),
      patient_date_of_birth: getFormattedLocalDate(
        new Date(form.values.patient_date_of_birth)
      ),
      visit_time: form.values.visit_time.split(":").slice(0, 2).join(":"),
    };
    api
      .post("/visits", form.values)
      .then((res) => {
        if (res.data.success) {
          notifications.show({
            title: res.data.message,
            message: res.data.data.message,
          });
          router.push("/visits/all-visits");
          setIsloading(false);
        }
      })
      .catch((err) => console.log("booking - error", err));
  };

  return (
    <div>
      {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
      <Container size={"xs"} p={10} mt={20} mb={50}>
        <Title order={2} mb={10} align="center">
          Booking Information
        </Title>
        {/* visit info Input Field */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={"md"}>
            <TextInput
              label="what's your  name"
              placeholder="enter your  name"
              {...form.getInputProps("patient_name")}
              readOnly={form.values.patient_name ? true : false}
              required
            />

            <TextInput
              label="what's your  email"
              placeholder="enter your  email"
              {...form.getInputProps("patient_email")}
              readOnly={form.values.patient_email ? true : false}
              required
            />

            <TextInput
              label="what's your  phone"
              placeholder="enter your  phone"
              {...form.getInputProps("patient_phone")}
              readOnly={form.values.patient_phone ? true : false}
              required
            />

            <DateInput
              label="Date of birth"
              placeholder="Pick date"
              {...form.getInputProps("patient_date_of_birth")}
              withAsterisk
            />

            <Select
              label="Gender"
              data={["male", "female", "other"]}
              {...form.getInputProps("patient_sex")}
              required
            />

            <Textarea
              label="Reason for visit"
              placeholder="reason"
              {...form.getInputProps("reason_for_visit")}
              required
            />

            <DateInput
              label="Visit Date"
              placeholder="Pick date"
              {...form.getInputProps("visit_date")}
              required
            />

            <TimeInput
              label="Visit Time"
              placeholder="Pick time"
              {...form.getInputProps("visit_time")}
              required
            />
            {/* confirm visit */}
            <Button
              w={"100%"}
              variant="secondary"
              type="submit"
              loading={isLoading}
            >
              Confirm
            </Button>
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

export default CreateVisit;
