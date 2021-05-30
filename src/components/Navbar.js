import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Tooltip,
  Icon,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { SiGooglemessages } from "react-icons/si";
import { FaRegCompass } from "react-icons/fa";
import Logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Links = [
  {
    label: "Home",
    icon: ImHome,
    path: "/",
  },
  {
    label: "Message",
    icon: SiGooglemessages,
    path: "/message",
  },
  {
    label: "Discover",
    icon: FaRegCompass,
    path: "/discover",
  },
  {
    label: "Notifications",
    icon: BellIcon,
    path: "/notifications",
  },
];

const NavLink = ({ children, path }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={path}
  >
    {children}
  </Link>
);

export default function Simple() {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const isActive = (pn) => {
    if (pn === pathname) return true;

    return false;
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image
                src={Logo}
                alt="Instagram"
                boxSize="50px"
                objectFit="cover"
              />
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              {!auth.token ? (
                <>
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                  >
                    <Link to="/auth/login">Sign In</Link>
                  </Button>
                  <Button
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.400"}
                    _hover={{
                      bg: "pink.300",
                    }}
                  >
                    <Link to="/auth/register">Register</Link>
                  </Button>
                </>
              ) : (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  mx={5}
                >
                  {Links.map((link, index) => (
                    <NavLink key={index} path={link.path}>
                      <Tooltip label={link.label}>
                        <span>
                          <Icon as={link.icon} />
                        </span>
                      </Tooltip>
                    </NavLink>
                  ))}
                  <Tooltip label={colorMode === "light" ? "Dark" : "Light"}>
                    <span
                      px={2}
                      py={1}
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        bg: useColorModeValue("gray.200", "gray.700"),
                      }}
                    >
                      <Icon
                        as={colorMode === "light" ? MoonIcon : SunIcon}
                        cursor="pointer"
                        onClick={toggleColorMode}
                      />
                    </span>
                  </Tooltip>
                </HStack>
              )}
            </Stack>
            {auth.token && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                >
                  <Avatar size={"sm"} src={auth?.user?.avatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to={`/profile/${auth.user._id}`}>Profile</Link>
                  </MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} path={link.path}>
                  <Flex align="baseline">
                    <Tooltip label={link.label}>
                      <span style={{ margin: 0, padding: 0 }}>
                        <Icon as={link.icon} mr={5} />
                      </span>
                    </Tooltip>
                    <Heading size={"xs"}>{link.label}</Heading>
                  </Flex>
                </NavLink>
              ))}
              <Flex align="baseline" onClick={toggleColorMode} cursor="pointer">
                <Tooltip label={colorMode === "light" ? "Dark" : "Light"}>
                  <span
                    px={2}
                    py={1}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                  >
                    <Icon
                      as={colorMode === "light" ? MoonIcon : SunIcon}
                      cursor="pointer"
                      mr={5}
                    />
                  </span>
                </Tooltip>
                <Heading size={"xs"}>
                  {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </Heading>
              </Flex>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
