import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchOneCocktailLoading, selectOneCocktailData} from '../cocktailsSlice';
import {useParams} from 'react-router-dom';
import {fetchOneCocktail} from '../cocktailsThunks';
import CircularProgress from '@mui/material/CircularProgress';
import {Typography} from '@mui/material';
import CocktailDetails from '../components/CocktailDetails';

const CocktailRecipe = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const cocktailsOneData = useAppSelector(selectOneCocktailData);
  const fetchOneCocktailLoading = useAppSelector(selectFetchOneCocktailLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneCocktail(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {fetchOneCocktailLoading ? (<CircularProgress sx={{color: '#000'}}/>) : (
        <>
          {cocktailsOneData === null ? (
              <Typography variant="body2" color="#000">К сожалению, коктейль с таким ID отсутствует в нашей базе.
                Попробуйте выбрать другой или вернитесь на главную страницу.</Typography>) :
            (<CocktailDetails information={cocktailsOneData}/>)}
        </>
      )}
    </>
  );
};

export default CocktailRecipe;