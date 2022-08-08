import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { AppBar as AppBarMui, Container, Stack, Toolbar } from '@mui/material';
import { FullscreenBtn } from 'components/fullscreen-btn';
import { SiteThemeBtn } from 'components/site-theme';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'services/auth/auth-api';
import { useGetThemeQuery, useUpdateUserThemeMutation } from 'services/theme/theme-api';
import { setUserTheme, setUserThemeName, userInfoSelector } from 'store/auth-reducer';
import { DesktopLogo, DesktopMenu, MobileLogo, MobileMenu, User } from './components';

const pages = [
  { text: 'Игра', path: '/game' },
  { text: 'Лидеры', path: '/leaderboard' },
  { text: 'Форум', path: '/forum' },
];

export const AppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const userData = useSelector(userInfoSelector);
  const [skip, setSkip] = useState(true);
  const { data: currentTheme, isSuccess } = useGetThemeQuery(userData.userTheme || 'light', {
    skip,
  });
  // const [themeName, setThemeName] = useState<string>(userData.userTheme || 'light');
  const dispatch = useDispatch();
  const [updateUserTheme] = useUpdateUserThemeMutation();
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserTheme(currentTheme));
    }
  }, [currentTheme, dispatch, isSuccess]);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutUser = async () => {
    try {
      const logoutUser = await logout();
      if (logoutUser) {
        document.location.reload();
      }
    } catch (e) {
      console.log(e, 'error logout');
    }
  };
  const handleChangeMode = async () => {
    // setThemeName((prevState) => (prevState === 'light' ? 'dark' : 'light'));
    if (userData.userId && userData.userTheme) {
      const newTheme = userData.userTheme === 'light' ? 'dark' : 'light';
      await updateUserTheme({ user_id: userData.userId, theme_name: newTheme });
      dispatch(setUserThemeName(newTheme));
      setSkip(false);
    }
  };

  return (
    <AppBarMui position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DesktopLogo />

          <MobileMenu pages={pages} />

          <MobileLogo />

          <DesktopMenu handleCloseNavMenu={handleCloseUserMenu} pages={pages} />
          <Stack direction="row" spacing={1}>
            <FullscreenBtn element={document.documentElement} />
            <SiteThemeBtn
              handleChangeMode={handleChangeMode}
              themeName={userData.userTheme || 'light'}
            />
            <User
              anchorElUser={anchorElUser}
              handleCloseUserMenu={handleCloseUserMenu}
              handleOpenUserMenu={handleOpenUserMenu}
              handleLogoutUser={handleLogoutUser}
            />
          </Stack>
        </Toolbar>
      </Container>
    </AppBarMui>
  );
};
