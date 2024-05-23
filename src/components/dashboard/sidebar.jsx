import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Text,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ViewIcon,
  CalendarIcon,
  ChatIcon,
  InfoIcon,
  SettingsIcon,
  StarIcon,
} from "@chakra-ui/icons";
import ThemeToggleButton from "./themeToggle";
import LanguageSelector from "./languageSelector";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Box pt={4} pl={4}>
      {/* Mobile view hamburger button */}
      <IconButton
        display={{ base: "block", md: "none" }}
        icon={<HamburgerIcon />}
        onClick={onOpen}
        aria-label="Open Menu"
      />

      {/* Sidebar for larger screens */}
      <Box
        display={{ base: "none", md: "block" }}
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w="250px"
        bgColor={colorMode === "light" ? "#373741" : "gray.800"}
        color="white"
        p={4}
      >
        <SidebarContent onClose={onClose} />
      </Box>

      {/* Sidebar drawer for mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent
            bgColor={colorMode === "light" ? "#373741" : "gray.800"}
            color="white"
          >
            <DrawerCloseButton />
            <DrawerBody p={0}>
              <SidebarContent onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

const SidebarContent = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box
        w="full"
        h="fit-content"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={"column"}
        gap={4}
        py={6}
      >
        <Box
          mt="auto"
          w="full"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={4}
        >
          <ThemeToggleButton />
          <LanguageSelector />
        </Box>
        <Text fontSize="2xl" fontWeight="bold">
          {t("dashboard")}
        </Text>
      </Box>
      <VStack align="start" spacing={1} w="full">
        <NavItem icon={ViewIcon} to="/dashboard/overview" onClose={onClose}>
          {t("overview")}
        </NavItem>
        <NavItem icon={ChatIcon} to="/dashboard/tickets" onClose={onClose}>
          {t("tickets")}
        </NavItem>
        <NavItem icon={InfoIcon} onClose={onClose}>
          {t("ideas")}
        </NavItem>
        <NavItem icon={CalendarIcon} onClose={onClose}>
          {t("contacts")}
        </NavItem>
        <NavItem icon={StarIcon} onClose={onClose}>
          {t("agents")}
        </NavItem>
        <NavItem icon={ViewIcon} onClose={onClose}>
          {t("articles")}
        </NavItem>
        <NavItem icon={SettingsIcon} onClose={onClose}>
          {t("settings")}
        </NavItem>
        <NavItem icon={InfoIcon} onClose={onClose}>
          {t("subscription")}
        </NavItem>
      </VStack>
    </Box>
  );
};

const NavItem = ({ icon, children, to, onClose }) => (
  <Button
    as={Link}
    to={to}
    w="full"
    justifyContent="start"
    leftIcon={React.createElement(icon)}
    variant="ghost"
    colorScheme="whiteAlpha"
    _hover={{ bg: "gray.600" }}
    onClick={onClose}
    py={6}
    color={"white"}
  >
    {children}
  </Button>
);

SidebarContent.propTypes = {
  onClose: PropTypes.func,
};

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Sidebar;
