import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'uk' ? 'en' : 'uk';
    i18n.changeLanguage(newLang);
  };

  return (
    <Tooltip title={i18n.language === 'uk' ? 'Switch to English' : 'Перейти на українську'}>
      <IconButton
        onClick={toggleLanguage}
        sx={{
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <LanguageIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageSelector;
