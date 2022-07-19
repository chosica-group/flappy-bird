import { useEffect } from 'react';
import { REDIRECT_URI } from 'pages/signin/components/signin-form/signin-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authWithYandexOauth } from 'services/auth/auth-api';
import { setUserLoggedIn } from 'store/auth-reducer';

export const AccessToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const code: string | null = params.get('code');
  useEffect(() => {
    if (code) {
      authWithYandexOauth({ code, redirect_uri: REDIRECT_URI })
        .then(() => {
          dispatch(setUserLoggedIn(true));
          navigate('/game', { replace: true });
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    } else {
      navigate('/welcome', { replace: true });
    }
  });
  return <div />;
};
