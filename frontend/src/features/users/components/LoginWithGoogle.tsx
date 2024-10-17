import { googleLogin } from '../usersThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { GoogleLogin } from '@react-oauth/google';

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <>
      <GoogleLogin
        width="336px"
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            void googleLoginHandler(credentialResponse.credential);
          }
        }}
        onError={() => {
          console.log('Login failed');
        }}
      />
    </>
  );
};

export default LoginWithGoogle;