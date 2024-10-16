import express from 'express';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import Cocktail from '../models/Cocktail';
import parseParameters from '../helpers/parseParameters';
import role from '../middleware/role';

const cocktailsRouter = express.Router();

cocktailsRouter.post('/', auth, permit('user', 'admin'), imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).send({error: 'Пользователь не авторизован'});
    }

    const ingredientsParse = parseParameters(req.body.ingredients);

    const cocktailData = new Cocktail({
      user: req.user?._id,
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      recipe: req.body.recipe,
      ingredients: ingredientsParse,
    });

    await cocktailData.save();
    return res.send(cocktailData);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

cocktailsRouter.get('/', role, async (req: RequestWithUser, res, next) => {
  try {
    let cocktails;
    const authorId = req.query.author as string;

    if (authorId) {
      if (req.user) {
        cocktails = await Cocktail.find({user: req.user?._id}).sort({_id: -1});
      }
    } else {
      if (req.user) {
        if (req.user?.role === 'admin') {
          cocktails = await Cocktail.find({}).sort({_id: -1});
        }
        if (req.user?.role === 'user') {
          cocktails = await Cocktail.find({
            $or: [{isPublished: true}, {
              user: req.user._id,
              isPublished: false
            }]
          }).sort({_id: -1});
        }
      } else {
        cocktails = await Cocktail.find({isPublished: true}).sort({_id: -1});
      }
    }

    return res.send(cocktails);
  } catch (error) {
    return next(error);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findOne({_id: req.params.id});

    if (!cocktail) {
      return res.status(404).send({error: `Коктейль с данным id: ${req.params.id}} не найден!`});
    }

    return res.send(cocktail);
  } catch (error) {
    return next(error);
  }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;

    const cocktail = await Cocktail.findById({_id: id});

    if (!cocktail) {
      return res.status(404).send({error: `Коктейль с данным id: ${id} не найден!`});
    }

    cocktail.isPublished = !cocktail.isPublished;

    await cocktail.save();
    return res.send(cocktail);
  } catch (error) {
    return next(error);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;

    const deletedCocktail = await Cocktail.findByIdAndDelete(id);

    if (!deletedCocktail) {
      return res.status(404).send({error: `Коктейль с id ${id} не найден!`});
    }

    return res.status(200).send({message: 'Коктейль успешно удалён.'});
  } catch (error) {
    return next(error);
  }
});

export default cocktailsRouter;