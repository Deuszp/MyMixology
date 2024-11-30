import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  Container,
  useTheme,
  alpha,
  Alert,
  TextField,
  InputAdornment,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import {
  fetchAllCocktails,
  setSelectedIngredients,
  clearFilters,
  setSearchQuery
} from '../store/cocktailsSlice';
import { AppDispatch } from '../store';
import { Cocktail, RootState } from '../types';
import RecipeDialog from '../components/RecipeDialog';
import LanguageSelector from '../components/LanguageSelector';
import { getRandomCocktails, getAllIngredients } from '../services/cocktailService';
import { translateIngredient } from '../utils/ingredientTranslator';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  
  const {
    filteredCocktails,
    selectedIngredients,
    searchQuery,
    loading,
    error
  } = useSelector((state: RootState) => state.cocktails);

  const [openRecipe, setOpenRecipe] = useState<Cocktail | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [randomCocktails, setRandomCocktails] = useState<Cocktail[]>([]);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);

  // Отримуємо всі інгредієнти при першому завантаженні
  useEffect(() => {
    const ingredients = getAllIngredients();
    setAllIngredients(ingredients);
  }, []);

  // Отримуємо випадкові коктейлі при першому завантаженні
  useEffect(() => {
    const fetchRandomCocktails = async () => {
      try {
        const cocktails = await getRandomCocktails(6);
        setRandomCocktails(cocktails);
      } catch (error) {
        console.error('Error fetching random cocktails:', error);
      }
    };

    fetchRandomCocktails();
  }, []);

  // Отримуємо всі коктейлі
  useEffect(() => {
    dispatch(fetchAllCocktails());
  }, [dispatch]);

  // Оновлюємо стан пошуку
  useEffect(() => {
    if (selectedIngredients.length > 0 || searchQuery) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [selectedIngredients, searchQuery]);

  const handleIngredientChange = (_event: any, newValue: string[]) => {
    dispatch(setSelectedIngredients(newValue));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setShowSearchResults(false);
  };

  const calculateMatchPercentage = (cocktail: Cocktail): number => {
    if (selectedIngredients.length === 0) return 0;
    
    const matchedIngredients = selectedIngredients.filter(selected =>
      cocktail.ingredients.some((ingredient: string) => 
        ingredient.toLowerCase().includes(selected.toLowerCase())
      )
    );
    
    return Math.round((matchedIngredients.length / selectedIngredients.length) * 100);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Ліва панель */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Мовний селектор */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <LanguageSelector />
              </Box>

              {/* Поле пошуку */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {t('search.title')}
                </Typography>
                <TextField
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  placeholder={t('search.placeholder')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    },
                  }}
                />
              </Box>

              {/* Вибір інгредієнтів */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {t('cocktails.ingredients')}
                </Typography>
                <Autocomplete
                  multiple
                  options={allIngredients}
                  value={selectedIngredients}
                  onChange={handleIngredientChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={t('cocktails.startTypingIngredient')}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  )}
                  renderTags={(value: string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={translateIngredient(option)}
                        sx={{
                          borderRadius: '16px',
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          '& .MuiChip-deleteIcon': {
                            color: 'white'
                          }
                        }}
                      />
                    ))
                  }
                  renderOption={(props, option) => (
                    <li {...props}>
                      <LocalBarIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      {translateIngredient(option)}
                    </li>
                  )}
                  sx={{ mb: 2 }}
                />
                {selectedIngredients.length > 0 && (
                  <Button
                    startIcon={<CloseIcon />}
                    onClick={handleClearFilters}
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    {t('common.clear')}
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Права панель */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                minHeight: '80vh'
              }}
            >
              {/* Результати пошуку */}
              <Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {showSearchResults 
                    ? t('search.results', { count: filteredCocktails.length })
                    : t('cocktails.random')}
                </Typography>

                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <Grid container spacing={3}>
                    {(showSearchResults ? filteredCocktails : randomCocktails).map((cocktail) => (
                      <Grid item xs={12} sm={6} md={4} key={cocktail.id}>
                        <Card
                          onClick={() => setOpenRecipe(cocktail)}
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: 6,
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={cocktail.image}
                            alt={cocktail.name}
                            sx={{ objectFit: 'cover' }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                              {cocktail.name}
                            </Typography>
                            {showSearchResults && (
                              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                  {t('cocktails.matchPercentage', {
                                    percent: calculateMatchPercentage(cocktail)
                                  })}
                                </Typography>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Діалог рецепту */}
      <RecipeDialog
        cocktail={openRecipe}
        open={!!openRecipe}
        onClose={() => setOpenRecipe(null)}
      />
    </Box>
  );
};

export default Dashboard;
