import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Image,
  rem,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SiteLogo from "@/assets/images/site-logo.png";
import { userHeaderLinks } from "@/data/headerData";
import Link from "next/link";
import { type } from "os";
import useUser from "@/hooks/useUser";
import UserMenu from "./UserMenu";

const HEADER_HEIGHT = rem(70);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    minWidth: "90%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colors.gray[8],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

type UserHeaderProps = {
  accessToken: string;
};

export function UserHeader({ accessToken }: UserHeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState();
  const { classes, cx } = useStyles();
  const user = useUser(accessToken);

  const items = userHeaderLinks.map((link) => {
    if (link.type == "link") {
      return (
        <Link href={link.link} key={link.link} className={classes.link}>
          {link.label}
        </Link>
      );
    } else {
      return (
        <Button
          key={link.link}
          component={"a"}
          href={link.link}
          variant={link.varient}>
          {link.label}
        </Button>
      );
    }
  });

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={30}>
          <Link href="/">
            <Image src={SiteLogo.src} alt="Site logo" width={160} />
          </Link>
          <Group spacing={5} className={classes.links}>
          {items}
          </Group>
        </Group>
        
        {/* user menu */}
        <Group spacing={5} className={classes.links}>
          {user ? <UserMenu user={user} /> : null}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
