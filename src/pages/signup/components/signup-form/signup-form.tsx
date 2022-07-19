import { useState } from 'react';
import { Button } from '@mui/material';
import { Form } from 'components/form';
import type { TFormInputs } from 'components/form';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from 'store/auth-reducer';
import { useNavigate } from 'react-router-dom';
import { signup } from 'services/auth/auth-api';
import type { SignupParams } from 'services/auth/types';

type TSubmitWithPassRepeat = SignupParams & {
  passwordRepeat: string;
};

const inputs: TFormInputs<TSubmitWithPassRepeat> = [
  { name: 'email', label: 'Почта', type: 'email', mask: true },
  { name: 'login', label: 'Логин', type: 'text', mask: true },
  { name: 'first_name', label: 'Имя', type: 'text', mask: true },
  { name: 'second_name', label: 'Фамилия', type: 'text', mask: true },
  { name: 'phone', label: 'Телефон', type: 'text', mask: true },
  { name: 'password', label: 'Пароль', type: 'password', mask: true },
  { name: 'passwordRepeat', label: 'Пароль (еще раз)', type: 'password', mask: true },
];

export const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState<string | undefined>();

  const onSubmit = ({
    passwordRepeat,
    ...data
  }: TSubmitWithPassRepeat): { reason: string } | void => {
    if (passwordRepeat === data.password) {
      signup(data)
        .then((res) => {
          if (res.reason) {
            dispatch(setUserLoggedIn(true));
            navigate('/game', { replace: true });
          }
          setApiError(res.reason);
        })
        .catch(() => {
          setApiError('что-то пошло не так');
        });
    } else {
      setApiError('Пароль не совпадает');
    }
  };

  const goToSigninPage = () => {
    navigate('/login', { replace: true });
  };

  return (
    <>
      <Form<TSubmitWithPassRepeat>
        title="Регистрация"
        inputs={inputs}
        onSubmit={onSubmit}
        submitText="Зарегистрироваться"
        error={apiError}
      />
      <Button size="small" variant="text" fullWidth onClick={goToSigninPage}>
        У меня есть аккаунт
      </Button>
    </>
  );
};
