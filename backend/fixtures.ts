import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [user1, user2, admin1, admin2] = await User.create({
    email: 'test1@test.com',
    displayName: 'Иван',
    avatar: 'fixtures/ivan.webp',
    password: '*H#*YGYu',
    role: 'user',
    token: crypto.randomUUID(),
  }, {
    email: 'test2@test.com',
    displayName: 'Петр',
    avatar: 'fixtures/petr.jpg',
    password: '*IBU#D@Bh',
    role: 'user',
    token: crypto.randomUUID(),
  }, {
    email: 'admin1@test.com',
    displayName: 'Антон',
    avatar: 'fixtures/anton.jpg',
    password: 'nif3i4bi@',
    role: 'admin',
    token: crypto.randomUUID(),
  }, {
    email: 'admin2@test.com',
    displayName: 'Андрей',
    avatar: 'fixtures/andrey.jpg',
    password: 'FDi&^&YGbi@',
    role: 'admin',
    token: crypto.randomUUID(),
  });

  await Cocktail.create(
    {
      user: user1,
      name: 'Маргарита',
      image: 'fixtures/margarita.jpg',
      recipe: 'Соберите все ингредиенты. Насыпьте соль в небольшую тарелку. Слегка промокните край бокала для коктейля или бокала для маргариты влажным бумажным полотенцем. Окуните смоченный край в соль, чтобы она покрылась слоем. Отложите в сторону. Смешайте текилу, бренди со вкусом апельсина и сок лайма в шейкере. Добавьте лед и встряхивайте, пока не остынет. Перелейте в коктейльный бокал с соленой каймой или в бокал для маргариты с соленой каймой, наполненный льдом. Украсьте кружком лайма.',
      ingredients: [
        {name: 'соль', quantity: '1 столовая ложка'},
        {name: 'текила', quantity: '½ жидкой унции'},
        {name: 'ликер со вкусом апельсина', quantity: '1 жидкая унция'},
        {name: 'сок лайма', quantity: '½ жидкой унции'},
        {name: 'лед', quantity: '1 стакан'},
        {name: 'лайм', quantity: '1 долька'},
      ],
      isPublished: true,
    },
    {
      user: user2,
      name: 'Мохито',
      image: 'fixtures/mojito.jpg',
      recipe: 'В стакане разомните мяту с сахаром и соком лайма. Добавьте ром и перемешайте. Наполните стакан льдом и залейте газированной водой. Перемешайте и украсьте веточкой мяты и долькой лайма.',
      ingredients: [
        {name: 'свежая мята', quantity: '10 листьев'},
        {name: 'сахар', quantity: '2 чайные ложки'},
        {name: 'ром', quantity: '2 жидкие унции'},
        {name: 'сок лайма', quantity: '1 жидкая унция'},
        {name: 'газированная вода', quantity: 'по вкусу'},
        {name: 'лед', quantity: '1 стакан'},
        {name: 'лайм', quantity: '1 долька'},
      ],
      isPublished: true,
    },
    {
      user: admin1,
      name: 'Пина колада',
      image: 'fixtures/pina_colada.jpeg',
      recipe: 'Смешайте в блендере ром, ананасовый сок и кокосовое молоко с льдом до однородной массы. Перелейте в высокий бокал и украсьте кусочком ананаса и вишенкой.',
      ingredients: [
        {name: 'ром', quantity: '1½ жидкой унции'},
        {name: 'ананасовый сок', quantity: '1 жидкая унция'},
        {name: 'кокосовое молоко', quantity: '1 жидкая унция'},
        {name: 'лед', quantity: '1 стакан'},
        {name: 'ананас', quantity: 'для украшения'},
        {name: 'вишня', quantity: 'для украшения'},
      ],
      isPublished: false,
    },
    {
      user: admin2,
      name: 'Космополитен',
      image: 'fixtures/cosmopolitan.jpg',
      recipe: 'Смешайте в шейкере водку, ликер со вкусом апельсина, сок лайма и клюквенный сок. Добавьте лед и встряхивайте до охлаждения. Процедите в охлажденный бокал для коктейля и украсьте долькой лайма.',
      ingredients: [
        {name: 'водка', quantity: '1½ жидкой унции'},
        {name: 'ликер со вкусом апельсина', quantity: '1 жидкая унция'},
        {name: 'сок лайма', quantity: '½ жидкой унции'},
        {name: 'клюквенный сок', quantity: '1 жидкая унция'},
        {name: 'лед', quantity: '1 стакан'},
        {name: 'лайм', quantity: 'для украшения'},
      ],
      isPublished: true,
    },
    {
      user: admin2,
      name: 'Дайкири',
      image: 'fixtures/daiquiri.jpg',
      recipe: 'В шейкере смешайте ром, сок лайма и сахар. Добавьте лед и встряхивайте до охлаждения. Процедите в охлажденный бокал для коктейля и украсьте долькой лайма.',
      ingredients: [
        {name: 'ром', quantity: '2 жидкие унции'},
        {name: 'сок лайма', quantity: '1 жидкая унция'},
        {name: 'сахар', quantity: '1 чайная ложка'},
        {name: 'лед', quantity: '1 стакан'},
        {name: 'лайм', quantity: 'для украшения'},
      ],
      isPublished: true,
    },
  );
  await db.close();
};

run().catch(console.error);