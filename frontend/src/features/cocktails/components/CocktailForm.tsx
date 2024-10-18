import React, {useState} from 'react';
import {CocktailFormFields} from '../../../types';
import {Avatar, Box, Button, Grid, TextField, Typography} from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectCreateError, selectSendCocktailsLoading} from '../cocktailsSlice';
import {sendCocktailsData} from '../cocktailsThunks';

const CocktailForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectSendCocktailsLoading);
  const error = useAppSelector(selectCreateError);

  const [resetFileName, setResetFileName] = useState(false);
  const [cocktail, setCocktail] = useState<CocktailFormFields>({
    name: '',
    image: null,
    recipe: '',
    ingredients: [
      {name: '', quantity: ''}
    ],
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const addIngredient = () => {
    setCocktail(prevState => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        {name: '', quantity: ''}
      ]
    }));
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setCocktail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onIngredientChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const {name, value} = event.target;
    setCocktail((prevState) => {
      const ingredientCopy = [...prevState.ingredients];
      ingredientCopy[index] = {...ingredientCopy[index], [name]: value};

      return {
        ...prevState,
        ingredients: ingredientCopy
      };
    });
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setCocktail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onIngredientDelete = (index: number) => {
    setCocktail((prevState => {
      return {
        ...prevState,
        ingredients: prevState.ingredients.filter((_, i) => i !== index),
      };
    }));
  };

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (
        cocktail.name.trim().length !== 0 &&
        cocktail.image !== null &&
        cocktail.recipe.trim().length !== 0 &&
        cocktail.ingredients.some(ingredient =>
          ingredient.name.trim().length !== 0 && ingredient.quantity.trim().length !== 0
        )
      ) {
        await dispatch(sendCocktailsData(cocktail)).unwrap();
        setResetFileName(true);
        navigate('/my-cocktails');
      }
    } catch (error) {
      console.error('Произошла ошибка при отправки данных. Пожалуйста, попробуйте позже. ' + error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
      }}>
      <Box sx={{display: 'flex', alignItems: 'center', gap: 1.3, mb: 3}}>
        <Avatar sx={{bgcolor: '#001F3F', width: 56, height: 56}}>
          <LocalBarIcon fontSize="large"/>
        </Avatar>
        <Typography component="h1" color="#000" fontWeight="600" variant="h5">
          Добавить новый коктейль
        </Typography>
      </Box>
      <Box component="form" onSubmit={submitFormHandler} sx={{width: '100%'}}>
        <Grid container direction="column" spacing={2.5}>
          <Grid item>
            <TextField
              label="Название"
              required
              id="name"
              name="name"
              value={cocktail.name}
              onChange={onFieldChange}
              error={Boolean(getFieldError('name'))}
              helperText={getFieldError('name')}
            />
          </Grid>
          {cocktail.ingredients.map((ingredient, index) => (
            <Grid key={`ingredient_${index}`} item>
              <Grid container spacing={2.5} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    label="Название ингредиента"
                    required
                    id="IngredientName"
                    name="name"
                    value={ingredient.name}
                    onChange={(event) => onIngredientChange(event, index)}
                    error={Boolean(getFieldError('name'))}
                    helperText={getFieldError('name')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Количество"
                    required
                    id="IngredientQuantity"
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(event) => onIngredientChange(event, index)}
                    error={Boolean(getFieldError('quantity'))}
                    helperText={getFieldError('quantity')}
                  />
                </Grid>
                {index > 0 && (
                  <Grid item xs={1}>
                    <Button onClick={() => onIngredientDelete(index)}>
                      <RemoveCircleOutlineIcon fontSize="large" sx={{color: '#001F3F'}}/>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
          <Grid item>
            <Button
              sx={{
                py: 1,
                backgroundColor: '#001F3F',
                '&:hover': {
                  backgroundColor: '#002e60',
                }
              }}
              variant="contained"
              onClick={addIngredient} type="button">
              Добавить ингредиент
            </Button>
          </Grid>
          <Grid item>
            <TextField
              label="Описание приготовления"
              required
              multiline
              rows={4}
              id="recipe"
              name="recipe"
              value={cocktail.recipe}
              onChange={onFieldChange}
              error={Boolean(getFieldError('recipe'))}
              helperText={getFieldError('recipe')}
            />
          </Grid>
          <Grid item sx={{width: '320px'}}>
            <FileInput
              onChange={onChangeFileInput}
              label="Изображение"
              name="image"
              resetFileName={resetFileName}
              handleResetFileName={handleResetFileName}
            />
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              loadingPosition="start"
              startIcon={<AddIcon/>}
              disabled={
                cocktail.name.trim().length === 0 ||
                cocktail.image === null ||
                cocktail.recipe.trim().length === 0 ||
                cocktail.ingredients.some(ingredient =>
                  ingredient.name.trim().length === 0 || ingredient.quantity.trim().length === 0
                )
              }
              loading={loading}
              variant="contained"
              sx={{
                width: '214px',
                backgroundColor: '#001F3F',
                '&:hover': {
                  backgroundColor: '#002e60',
                },
                '&.Mui-disabled': {
                  background: '#b2b2b2',
                  color: '#757575',
                },
                color: '#fff',
                py: 1,
                '& .MuiLoadingButton-loadingIndicator': {
                  color: '#fff',
                },
              }}>
              <span>Создать коктейль</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CocktailForm;