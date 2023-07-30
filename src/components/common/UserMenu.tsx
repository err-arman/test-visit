import { forwardRef } from "react";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";
import { Group, Avatar, Text, Menu, UnstyledButton } from "@mantine/core";
import useUser, { User } from "../../hooks/useUser";
import logout from "@/utils/logout";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string | null;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

function UserMenu({ user }: { user: User }) {
  const { name, email, first_name, last_name } = user;
  return (
    <Group position="center">
      <Menu withArrow>
        <Menu.Target>
          <UserButton
            image={null}
            name={name || first_name || "Guest"}
            email={email || ""}
          />
        </Menu.Target>
        {/* ...Menu.Items */}
        <Menu.Dropdown>
          <Menu.Item
            w={220}
            onClick={() => logout()}
            icon={<IconLogout size="1rem" />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export default UserMenu;
