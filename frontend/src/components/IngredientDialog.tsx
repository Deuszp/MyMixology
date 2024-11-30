import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { IngredientCategory } from '../utils/ingredientCategories';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface IngredientDialogProps {
  open: boolean;
  onClose: () => void;
  category: IngredientCategory | null;
  onIngredientClick: (ingredient: string) => void;
  selectedIngredients: string[];
}

const IngredientDialog: React.FC<IngredientDialogProps> = ({
  open,
  onClose,
  category,
  onIngredientClick,
  selectedIngredients,
}) => {
  const { t } = useTranslation();

  if (!category) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {t(`ingredients.categories.${category.name}`)}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 1 }}>
          {category.ingredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={t(`ingredients.names.${ingredient.toLowerCase().replace(/ /g, '_')}`)}
              onClick={() => onIngredientClick(ingredient)}
              color={selectedIngredients.includes(ingredient) ? "primary" : "default"}
              sx={{ 
                borderRadius: '16px',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default IngredientDialog;
