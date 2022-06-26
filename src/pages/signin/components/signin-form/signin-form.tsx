import { useState } from 'react';
import { Button } from '@mui/material';
import { Form } from 'components/form';
import type { TFormInputs } from 'components/form';
import useAuth from 'providers/with-auth';
import { useNavigate } from 'react-router-dom';
import type { SigninParams } from 'services/auth.service';

const inputs: TFormInputs<SigninParams> = [
  { name: 'login', label: 'Логин', type: 'text', required: true },
  { name: 'password', label: 'Пароль', type: 'password', required: true },
];

export const SigninForm = () => {
  const navigate = useNavigate();
  const { signinUser } = useAuth();
  const [apiError, setApiError] = useState<string | undefined>();

  const onSubmit = (data: SigninParams) => {
    signinUser(data)
      .then((res) => {
        if (res.reason && res.reason !== 'User already in system') {
          setApiError(res.reason);
        } else {
          navigate('/', { replace: true });
        }
      })
      .catch(() => {
        setApiError('что-то пошло не так');
      });
  };

  const goToSignupPage = () => {
    navigate('/signup', { replace: true });
  };

  return (
    <>
      <Form<SigninParams>
        title="Вход"
        inputs={inputs}
        onSubmit={onSubmit}
        submitText="Войти"
        error={apiError}
      />
      <Button size="small" variant="text" fullWidth onClick={goToSignupPage}>
        У вас нет аккаунта? Регистрация
      </Button>
    </>
  );
};
