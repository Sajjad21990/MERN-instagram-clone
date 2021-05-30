import { useState, useEffect } from "react";
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
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Center,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  SearchIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { SiGooglemessages } from "react-icons/si";
import { FaRegCompass } from "react-icons/fa";
import Logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { getData } from "../utils/fetchData";
import { GLOBAL_TYPES } from "../redux/actions/globalTypes";

const Links = [
  {
    label: "Home",
    icon: ImHome,
    path: "/",
  },
  {
    label: "Message",
    icon: SiGooglemessages,
    path: "/messages",
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
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (searchText && auth.token) {
      getData(`/user/search?username=${searchText}`, auth.token)
        .then((res) => {
          setUsers(res.data.users);
          setSearchMenuOpen(true);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { error: err.response.data.msg },
          });
        });
    } else {
      setUsers([]);
    }
  }, [searchText, auth.token, dispatch]);

  const isActive = (pn) => {
    if (pn === pathname) return true;

    return false;
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchMenuOpen(true);
    console.log(searchText);
  };

  const handleSearchClose = (e) => {
    e.preventDefault();
    setSearchMenuOpen(false);
    setUsers([]);
    setSearchText("");
  };

  const handleSearchListClick = (id) => {
    setSearchMenuOpen(false);
    setSearchText("");
    history.push(`/profile/${id}`);
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
          <Box display={{ base: "none", md: "block" }} w={"40vw"}>
            <form onSubmit={handleSearch}>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={"text"}
                  placeholder="Search..."
                  borderColor="teal"
                  onChange={(e) =>
                    setSearchText(
                      e.target.value.toLowerCase().replace(/ /g, "")
                    )
                  }
                />
                <InputRightElement>
                  <IconButton
                    isLoading={loading}
                    variant="outline"
                    colorScheme="teal"
                    borderLeftRadius="none"
                    aria-label="Search"
                    onClick={(e) =>
                      searchMenuOpen ? handleSearchClose(e) : handleSearch(e)
                    }
                    icon={searchMenuOpen ? <SmallCloseIcon /> : <SearchIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </form>
            <Menu isOpen={searchMenuOpen} isLazy colorScheme="teal">
              <MenuList
                w="40vw"
                borderTopRadius="none"
                borderColor="teal"
                borderTopColor="transparent"
              >
                {users.length > 0 ? (
                  <>
                    {users.map((user) => (
                      <MenuItem
                        minH="48px"
                        key={user._id}
                        onClick={() => handleSearchListClick(user._id)}
                      >
                        <Image
                          boxSize="2rem"
                          borderRadius="full"
                          src={user.avatar}
                          alt={user.fullName}
                          mr="12px"
                        />
                        <Text>
                          {user.fullName} <br />
                          <span style={{ fontSize: "0.7rem" }}>
                            {user.userName}
                          </span>
                        </Text>
                      </MenuItem>
                    ))}
                  </>
                ) : (
                  <Center>No users found</Center>
                )}
              </MenuList>
            </Menu>
          </Box>

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
              <Box display={{ md: "none" }} w={"90vw"}>
                <form onSubmit={handleSearch}>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={"text"}
                      placeholder="Search..."
                      borderColor="teal"
                      onChange={(e) =>
                        setSearchText(
                          e.target.value.toLowerCase().replace(/ /g, "")
                        )
                      }
                    />
                    <InputRightElement>
                      <IconButton
                        isLoading={loading}
                        variant="outline"
                        colorScheme="teal"
                        borderLeftRadius="none"
                        aria-label="Search"
                        onClick={(e) =>
                          searchMenuOpen
                            ? handleSearchClose(e)
                            : handleSearch(e)
                        }
                        icon={
                          searchMenuOpen ? <SmallCloseIcon /> : <SearchIcon />
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </form>
                <Menu isOpen={searchMenuOpen} isLazy colorScheme="teal">
                  <MenuList
                    w="90vw"
                    borderTopRadius="none"
                    borderColor="teal"
                    borderTopColor="transparent"
                  >
                    {users.length > 0 ? (
                      <>
                        {users.map((user) => (
                          <MenuItem
                            minH="48px"
                            key={user._id}
                            onClick={() => handleSearchListClick(user._id)}
                          >
                            <Image
                              boxSize="2rem"
                              borderRadius="full"
                              src={user.avatar}
                              alt={user.fullName}
                              mr="12px"
                            />
                            <Text>
                              {user.fullName} <br />
                              <span style={{ fontSize: "0.7rem" }}>
                                {user.userName}
                              </span>
                            </Text>
                          </MenuItem>
                        ))}
                      </>
                    ) : (
                      <Center>No users found</Center>
                    )}
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
