import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectCocktailsByAuthorData, selectFetchCocktailsByAuthorLoading} from '../cocktailsSlice';
import {toast} from 'react-toastify';
import {fetchCocktailsByAuthor} from '../cocktailsThunks';
import {selectUser} from '../../users/usersSlice';
import CircularProgress from '@mui/material/CircularProgress';
import {Box, Typography} from '@mui/material';
import CocktailCard from '../components/CocktailCard';

const MyCocktails = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const cocktailsByAuthorData = useAppSelector(selectCocktailsByAuthorData);
  const cocktailsByAuthorDataFetchingLoader = useAppSelector(selectFetchCocktailsByAuthorLoading);

  useEffect(() => {
    const fetchByAuthorData = async () => {
      if (user?._id) {
        try {
          await dispatch(fetchCocktailsByAuthor(user._id)).unwrap();
        } catch (error) {
          toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
          console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
        }
      }
    };

    void fetchByAuthorData();
  }, [dispatch, user?._id]);

  return (
    <>
      <Typography sx={{mb: 2}} variant="h5" fontWeight="600" color="#000">Мои коктейли.</Typography>
      {cocktailsByAuthorDataFetchingLoader ? (<CircularProgress sx={{color: '#000'}}/>) : (
        <>
          {cocktailsByAuthorData.length === 0 ? (
            <Typography variant="body2" color="#000">Коктейли пока не найдены. Но это отличный повод попробовать создать
              свой уникальный рецепт! Возвращайтесь позже или добавьте новый коктейль прямо сейчас.</Typography>) : (
            <Box display="flex" gap={1} flexWrap="wrap">
              {cocktailsByAuthorData.map((cocktail) => (
                <CocktailCard key={cocktail._id} cocktail={cocktail}/>
              ))}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default MyCocktails;