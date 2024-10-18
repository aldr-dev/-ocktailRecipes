import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectCocktailsData, selectFetchCocktailsLoading} from '../cocktailsSlice';
import {fetchCocktailsData} from '../cocktailsThunks';
import {toast} from 'react-toastify';
import {Box, Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CocktailCard from '../components/CocktailCard';

const Home = () => {
  const dispatch = useAppDispatch();
  const cocktailsData = useAppSelector(selectCocktailsData);
  const cocktailFetchingLoader = useAppSelector(selectFetchCocktailsLoading);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        await dispatch(fetchCocktailsData()).unwrap();
      } catch (error) {
        toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
        console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
      }
    };

    void fetchCocktails();
  }, [dispatch]);

  return (
    <>
      <Typography sx={{mb: 2}} variant="h5" fontWeight="600" color="#000">Коллекция Коктейлей: Все Рецепты В Одном
        Месте.</Typography>
      {cocktailFetchingLoader ? (<CircularProgress sx={{color: '#000'}}/>) : (
        <>
          {cocktailsData.length === 0 ? (
            <Typography variant="body2" color="#000">Упс! Пока что здесь нет доступных коктейлей, но скоро мы обновим
              нашу коллекцию. Возвращайтесь позже, чтобы найти вдохновение для новых миксов!</Typography>) : (
            <Box display="flex" gap={1} flexWrap="wrap">
              {cocktailsData.map((cocktail) => (
                <CocktailCard key={cocktail._id} cocktail={cocktail}/>
              ))}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Home;