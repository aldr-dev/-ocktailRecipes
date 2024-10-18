import {Container} from '@mui/material';
import NavBar from './UI/NavBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Register from './features/users/Register';
import Login from './features/users/Login';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/users/usersSlice';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import CocktailForm from './features/cocktails/components/CocktailForm';
import Home from './features/cocktails/containers/Home';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <NavBar/>
      <Container maxWidth="lg" sx={{mb: 3}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/my-cocktails" element={
            <ProtectedRoute isAllowed={user && (user.role === 'user' || user.role === 'admin')}>
              {/*страницы моих коктейлей*/}
            </ProtectedRoute>
          }/>
          <Route path="/add-new-cocktail" element={
            <ProtectedRoute isAllowed={user && (user.role === 'user' || user.role === 'admin')}>
              <CocktailForm/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;