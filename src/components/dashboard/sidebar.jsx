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

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        bgColor="#373741"
        color="white"
        p={4}
      >
        <SidebarContent />
      </Box>

      {/* Sidebar drawer for mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bgColor="#373741" color="white">
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

const SidebarContent = ({ onClose }) => (
  <Box display="flex" flexDirection="column" gap={4}>
    <Box
      w="full"
      h="fit-content"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={6}
    >
      <Text fontSize="2xl" fontWeight="bold">
        Dashboard Kit
      </Text>
    </Box>
    <VStack align="start" spacing={1} w="full">
      <NavItem icon={ViewIcon} to="/dashboard/overview" onClose={onClose}>
        Overview
      </NavItem>
      <NavItem icon={ChatIcon} to="/dashboard/tickets" onClose={onClose}>
        Tickets
      </NavItem>
      <NavItem icon={InfoIcon} to="/dashboard/ideas" onClose={onClose}>
        Ideas
      </NavItem>
      <NavItem icon={CalendarIcon} to="/dashboard/contacts" onClose={onClose}>
        Contacts
      </NavItem>
      <NavItem icon={StarIcon} to="/dashboard/agents" onClose={onClose}>
        Agents
      </NavItem>
      <NavItem icon={ViewIcon} to="/dashboard/articles" onClose={onClose}>
        Articles
      </NavItem>
      <NavItem icon={SettingsIcon} to="/dashboard/settings" onClose={onClose}>
        Settings
      </NavItem>
      <NavItem icon={InfoIcon} to="/dashboard/subscription" onClose={onClose}>
        Subscription
      </NavItem>
    </VStack>
  </Box>
);

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

