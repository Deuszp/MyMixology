import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { Cocktail } from '../types';
import { translateIngredient, replaceIngredientsInInstructions } from '../utils/ingredientTranslator';
import { convertToMetric } from '../utils/measurementConverter';

interface RecipeDialogProps {
  cocktail: Cocktail | null;
  open: boolean;
  onClose: () => void;
}

const RecipeDialog: React.FC<RecipeDialogProps> = ({ cocktail, open, onClose }) => {
  const { t } = useTranslation();

  if (!cocktail) return null;

  // Використовуємо інструкції безпосередньо з об'єкту коктейлю
  const processedInstructions = replaceIngredientsInInstructions(
    cocktail.instructions,
    cocktail.ingredients
  );

  // Розділяємо інструкції на кроки
  const steps = processedInstructions.split('\n').filter(step => step.trim());

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            {cocktail.name}
            <Typography variant="subtitle1" color="text.secondary" component="span" sx={{ ml: 2 }}>
              {t(`cocktails.types.${cocktail.type.toLowerCase()}`)}
            </Typography>
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Зображення коктейлю */}
          {cocktail.image && (
            <Grid item xs={12} md={6}>
              <Paper elevation={2}>
                <Box
                  component="img"
                  src={cocktail.image}
                  alt={cocktail.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    display: 'block',
                  }}
                />
              </Paper>
            </Grid>
          )}

          {/* Інгредієнти */}
          <Grid item xs={12} md={cocktail.image ? 6 : 12}>
            <Typography variant="h6" gutterBottom>
              {t('common.ingredients')}
            </Typography>
            <List>
              {cocktail.ingredients.map((ingredient, index) => (
                <ListItem key={ingredient} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LocalBarIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography>
                        {cocktail.measures && cocktail.measures[index] && (
                          <Typography component="span" color="text.secondary">
                            {convertToMetric(cocktail.measures[index])} -{' '}
                          </Typography>
                        )}
                        {translateIngredient(ingredient)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Інструкції */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              {t('common.instructions')}
            </Typography>
            <List>
              {steps.map((step, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ pl: 2 }}>
                        {step.replace(/^\d+\.\s*/, '')}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDialog;
