import {CocktailMutation} from '../../../types';
import React from 'react';
import {Box, CardMedia, Grid, Typography} from '@mui/material';
import {API_URL} from '../../../config';

interface Props {
  information: CocktailMutation;
}

const CocktailDetails: React.FC<Props> = ({information}) => {
  const imageUrl = `${API_URL}/${information.image}`;

  return (
    <>
      <Grid container sx={{columnGap: 3, rowGap: 5}}>
        <Grid item>
          <CardMedia
            sx={{
              width: '270px',
              padding: '0',
              height: '350px',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
            image={imageUrl}
            title="Фото коктейля"
          />
        </Grid>
        <Grid item>
          <Typography fontWeight="600" marginBottom="5px" variant="h4">{information.name}</Typography>
          <Typography fontWeight="600" variant="body1">Ингредиенты:</Typography>
          <ul>
            {information.ingredients.map((item) => (
              <li key={item._id}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)} - {item.quantity}
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
      <Box sx={{marginTop: 5}}>
        <Typography sx={{fontWeight: '600', mb: 1, fontSize: '20px'}} variant="body1">Рецепт приготовления:</Typography>
        <Typography variant="body1">{information.recipe}</Typography>
      </Box>
    </>
  );
};

export default CocktailDetails;