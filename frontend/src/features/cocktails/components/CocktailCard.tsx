import {CocktailMutation} from '../../../types';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {API_URL} from '../../../config';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {deleteOneCocktail, fetchCocktailsData, toggleCocktail} from '../cocktailsThunks';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Menu, MenuItem, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

interface Props {
  cocktail: CocktailMutation;
}

const CocktailCard: React.FC<Props> = ({cocktail}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const imageUrl = `${API_URL}/${cocktail.image}`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIsPublishedCocktail = async () => {
    await dispatch(toggleCocktail(cocktail._id));
    await dispatch(fetchCocktailsData());
  };

  const handleDeleteCocktail = async () => {
    const confirmDelete = confirm('Вы действительно хотите удалить данный коктейль?');
    if (confirmDelete) {
      await dispatch(deleteOneCocktail(cocktail._id));
      await dispatch(fetchCocktailsData());
    }
  };

  const isAuthorOwner = cocktail.user === user?._id;
  const isAdmin = user?.role === 'admin';

  return (
    <Card sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '280px',
      padding: '10px',
      textDecoration: 'none',
      backgroundColor: '#fff',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    }}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

        {!cocktail.isPublished && (isAuthorOwner || isAdmin) && (
          <Typography
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'rgba(255,255,255,0.4)',
              color: '#001f3f',
              display: 'inline-block',
              padding: '4px 8px',
              border: '1px solid #001f3f',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '0.875rem',
            }}
            variant="body2">
            Не опубликован
          </Typography>
        )}

        {(!cocktail.isPublished && isAdmin || isAdmin) && (
          <Box sx={{display: 'flex', marginLeft: 'auto'}}>
            <Button
              onClick={handleClick}
              sx={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                minWidth: 0,
                width: 30,
                height: 30,
                border: '1px solid #001f3f',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.4)',
                color: '#000',
              }}>
              <MoreHorizIcon/>
            </Button>
            <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted
                  sx={{'& .MuiPaper-root': {minWidth: 120}}}>
              {!cocktail.isPublished && isAdmin && (
                <MenuItem onClick={handleIsPublishedCocktail} sx={{padding: '4px 8px', fontSize: '0.875rem'}}>
                  <PublishIcon sx={{fontSize: '18px'}}/>&nbsp;Опубликовать
                </MenuItem>
              )}
              {(isAdmin) && (
                <MenuItem onClick={handleDeleteCocktail} sx={{padding: '4px 8px', fontSize: '0.875rem'}}>
                  <DeleteIcon sx={{fontSize: '18px'}}/>&nbsp;Удалить
                </MenuItem>
              )}
            </Menu>
          </Box>
        )}
      </Box>

      <CardMedia
        sx={{
          width: '100%',
          padding: '0',
          height: '280px',
          objectFit: 'cover',
          borderRadius: '5px',
          overflow: 'hidden',
          display: 'flex',
          marginBottom: '15px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        image={imageUrl}
        title="Фото коктейля"
      />
      <CardContent sx={{marginBottom: '5px', padding: '0'}}>
        <Typography sx={{color: '#000'}} gutterBottom variant="h5" component="div">
          {cocktail.name}
        </Typography>
        {!cocktail.isPublished && (
          <Typography sx={{display: 'flex', alignItems: 'flex-start', color: '#B3B3B3', marginBottom: '15px'}} variant="body2">
            <InfoIcon/>&nbsp;Ваш коктейль находится на рассмотрении модератора!
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{padding: '0', marginTop: 'auto'}}>
        <Button
          component={Link}
          to={`/cocktail-recipe/${cocktail._id}`}
          variant="contained"
          endIcon={<ArrowForwardIosIcon/>}
          sx={{
            color: '#fff',
            marginBottom: '10px',
            backgroundColor: '#001F3F',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#002e60',
            },
          }}>
          Перейти к рецепту
        </Button>
      </CardActions>
    </Card>
  );
};

export default CocktailCard;