import { useState } from "react";
import {
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Textarea,
  Box,
} from "@chakra-ui/react";
import mockData from "../../data/mockData.json";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    customer_id: "",
    subject: "",
    description: "",
    priority: "Medium", // Default priority
  });

  const [formErrors, setFormErrors] = useState({
    customer_id: "",
    subject: "",
    description: "",
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    let errors = {};
    let isValid = true;

    if (!formData.customer_id) {
      errors.customer_id = "Customer is required";
      isValid = false;
    }

    if (!formData.subject) {
      errors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.description) {
      errors.description = "Description is required";
      isValid = false;
    }

    setFormErrors(errors);

    if (!isValid) {
      return;
    }

    // Form is valid, continue with submission
    const newTicket = {
      ticket_id: mockData.Tickets.length + 1,
      customer_id: parseInt(formData.customer_id),
      subject: formData.subject,
      description: formData.description,
      status: "Open",
      priority: formData.priority,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Create ticket assignment
    const newAssignment = {
      assignment_id: mockData.Ticket_Assignments.length + 1,
      ticket_id: newTicket.ticket_id,
      admin_id: 0, // Assign admin_id as 0
      assigned_at: new Date().toISOString(),
      resolved_at: null, // Initially not resolved
    };

    // Update mockData
    mockData.Tickets.push(newTicket);
    mockData.Ticket_Assignments.push(newAssignment);

    // Update the file (in a real scenario, this would be an API call or database operation)
    saveMockDataToLocalStorage(mockData);

    // Clear form fields after submission
    setFormData({
      customer_id: "",
      subject: "",
      description: "",
      priority: "Medium",
    });

    // Show success alert
    setAlert({
      status: "success",
      title: "Ticket Created!",
      description: "The ticket has been successfully created.",
    });
  };

  const handleAlertClose = () => {
    setAlert(null);
  };

  // Function to save mockData to Local Storage (simulate)
  const saveMockDataToLocalStorage = (data) => {
    localStorage.setItem("mockData", JSON.stringify(data));
  };

  return (
    <Box
      maxW={"100vw"}
      minH={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
        <Heading>Ticket Form</Heading>
      <VStack
        as="form"
        spacing={4}
        onSubmit={handleSubmit}
        alignItems="stretch"
        width={["100%", "80%", "60%", "50%"]} // Responsive width
        mx="auto" // Center align
      >
        <FormControl
          id="customer_id"
          isRequired
          isInvalid={!!formErrors.customer_id}
        >
          <FormLabel>Customer</FormLabel>
          <Select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            placeholder="Select customer"
          >
            {mockData.Customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{formErrors.customer_id}</FormErrorMessage>
        </FormControl>

        <FormControl id="subject" isRequired isInvalid={!!formErrors.subject}>
          <FormLabel>Subject</FormLabel>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
          />
          <FormErrorMessage>{formErrors.subject}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="description"
          isRequired
          isInvalid={!!formErrors.description}
        >
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            size="md"
            minHeight="100px"
          />
          <FormErrorMessage>{formErrors.description}</FormErrorMessage>
        </FormControl>

        <FormControl id="priority" isRequired>
          <FormLabel>Priority</FormLabel>
          <Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4}>
          Create Ticket
        </Button>

        {/* Success alert */}
        {alert && (
          <Alert status={alert.status} mt={4}>
            <AlertIcon />
            <VStack alignItems="flex-start">
              <AlertTitle>{alert.title}</AlertTitle>
              <p>{alert.description}</p>
            </VStack>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={handleAlertClose}
            />
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

export default TicketForm;
