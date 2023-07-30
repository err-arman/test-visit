import {
  Button,
  createStyles,
  Flex,
  rem,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SelectedPlace } from "../../types/SelectedPlace";
import PlaceAutoComplete from "../common/PlaceAutocomplete";
const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));

type PatientType = "adult" | "child";

const SearchBox = ({ isLoading }: { isLoading: boolean }) => {
  const { classes } = useStyles();
  const router = useRouter();
  const [selectedPlace, setselectedplace] = useState<SelectedPlace | null>(
    null
  );
  const { search_query, location, visit_time, accepted_patient } = router.query;

  const form = useForm({
    initialValues: {
      search_query: "",
      location: "",
      visit_time: "morning",
      accepted_patient: "adult" as PatientType,
    },
    validate: {
      search_query: (value) =>
        !value || value == "" || value.trim().length <= 0
          ? "Search query is required"
          : null,
    },
  });

  const handleFormSubmit = () => {
    // construct url based on form values
    const search_url =
      `/search/search-result` +
      `?search_query=${form.values.search_query}` +
      `&location=${form.values.location}` +
      `&visit_time=${form.values.visit_time}` +
      `&accepted_patient=${form.values.accepted_patient}`;

    // redirect to search page
    router.push(search_url);
  };

  // set form values based on url query params
  useEffect(() => {
    form.setValues({
      search_query: router.query.search_query as string,
      location: (router.query.location as string) ?? "",
      visit_time: (router.query.visit_time as string) ?? "morning",
      accepted_patient:
        (router.query.accepted_patient as PatientType) ?? "adult",
    });
  }, [router.query]);

  useEffect(() => {
    if (selectedPlace) {
      console.log(selectedPlace);
      form.setFieldValue("location", selectedPlace?.description ?? "");
    }
  }, [selectedPlace]);

  return (
    <div
      style={{
        padding: "5px",
      }}
    >
      <form onSubmit={form.onSubmit((values) => handleFormSubmit())}>
        <Flex columnGap={"sm"}>
          {/* search query input */}
          <TextInput
            label="Search"
            placeholder="Search"
            classNames={classes}
            {...form.getInputProps("search_query")}
          />

          {/* location input */}
          <PlaceAutoComplete
            setselectedplace={setselectedplace}
            inputLabel="Location"
            withIcon={false}
            inputClasses={classes}
            initialTextValue={(location as string) || ""}
          />

          {/* time select input */}
          <Select
            withinPortal
            // parse DateText Enum to array of objects with values and labels
            data={[
              // { label: "ASAP", value: "ASAP" },
              { label: "Morning", value: "morning" },
              { label: "Afternoon", value: "afternoon" },
              { label: "Evening", value: "evening" },
              // { label: "Tomorrow morning", value: "tomorrow morning" },
              // { label: "Tomorrow afternoon", value: "tomorrow afternoon" },
              // { label: "Tomorrow evening", value: "tomorrow evening" },
            ]}
            placeholder="Pick one"
            label="Time"
            classNames={classes}
            {...form.getInputProps("visit_time")}
          />

          {/* patient type select input */}
          <Select
            withinPortal
            data={[
              { label: "Adult", value: "adult" },
              { label: "Child", value: "child" },
            ]}
            placeholder="Pick one"
            label="Patient"
            classNames={classes}
            {...form.getInputProps("accepted_patient")}
          />
          <Button
            loading={isLoading}
            variant="secondary"
            h={"3.2rem"}
            w={"8rem"}
            type="submit"
          >
            Search
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default SearchBox;
