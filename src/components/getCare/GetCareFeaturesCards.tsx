import {
  Badge,
  Card,
  Container,
  SimpleGrid,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconBrandZoom,
  IconMoodSick,
  IconTestPipe,
  IconUrgent,
} from "@tabler/icons-react";
import Link from "next/link";

// feaures card data
const featuresData = [
  {
    icon: IconUrgent,
    title: "Urgent care",
    link: "/search/search-result?search_query=Urget Care",
    description: "For minor injuries and illness",
  },
  {
    title: "Video Visits",
    description: "Get care from anywhere",
    link: "#",
    icon: IconBrandZoom,
    disabled: true,
  },
  {
    title: "Lab testing",
    description: "Book a lab test without a refe...",
    link: "#",
    icon: IconTestPipe,
    disabled: true,
  },
  {
    title: "Mental Health",
    description: "Find therapists who takes insu...",
    link: "#",
    icon: IconMoodSick,
    disabled: true,
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
    ":hover": {
      cursor: "pointer",
    },
  },

  disabled: {
    backgroundColor: theme.colors.gray[2],
  },
}));

export function GetCareFeaturesCards() {
  const { classes, theme } = useStyles();
  const features = featuresData.map((feature) => (
    <Card
      key={feature.title}
      component={Link}
      href={feature.link}
      shadow={!feature.disabled ? "md" : undefined}
      radius="md"
      className={
        feature.disabled ? `${classes.disabled} ${classes.card}` : classes.card
      }
      padding="md"
    >
      <feature.icon size={rem(50)} stroke={2} color={"#15724F"} />
      <Text fz="lg" fw={500} mt="md">
        {feature.title}
      </Text>

      <Text fz="sm" c="dimmed">
        {feature.description}{" "}
      </Text>

      {feature.disabled ? (
        <Badge mt="lg" variant="outline">
          Comming soon
        </Badge>
      ) : null}
    </Card>
  ));

  return (
    <Container size="lg">
      <SimpleGrid
        cols={4}
        spacing="xl"
        mt={50}
        breakpoints={[
          {
            maxWidth: "md",
            cols: 1,
          },
        ]}
      >
        {features}{" "}
      </SimpleGrid>
    </Container>
  );
}
