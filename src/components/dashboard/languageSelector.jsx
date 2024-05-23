// LanguageSelector.jsx
import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Select
      onChange={changeLanguage}
      defaultValue={i18n.language}
      bg="gray.700"
      width='fit-content'
    >
      <option value="en">English</option>
      <option value="id-ID">Indonesian</option>
      {/* Add more languages as needed */}
    </Select>
  );
};

export default LanguageSelector;
