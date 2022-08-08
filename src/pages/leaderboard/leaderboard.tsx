import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetTeamLeaderboardQuery } from 'services/leaderboard';
import type { TAllLeaderboardRequest, TUserDataScoreLeaderboard } from 'services/leaderboard';
import { userInfoSelector } from 'store/auth-reducer';
import { Container, LeaderCard } from './components';

type TDataLeaderboard = {
  data?: TUserDataScoreLeaderboard;
};

export const LeaderboardPage = () => {
  const userData = useSelector(userInfoSelector);
  const body: TAllLeaderboardRequest = {
    ratingFieldName: 'score',
    cursor: 0,
    limit: 10,
  };
  const { data, error, isLoading } = useGetTeamLeaderboardQuery({
    teamName: process.env.GROUP_NAME || 'chosica',
    body,
  });

  return (
    <Container>
      <Typography variant="h1" color={userData.themeData?.theme_text_color || 'black'}>
        Рекорды
      </Typography>
      <Stack spacing={2} alignItems="center">
        {isLoading && <div>Loading...</div>}
        {error && <div>Oops, an error occured</div>}
        {!data || data.length === 0 ? (
          <div>no results</div>
        ) : (
          data.map((item: TDataLeaderboard, index: number) => (
            <LeaderCard
              rating={0}
              time={0}
              result={item.data?.score || 0}
              name={item.data?.userName || 'name'}
              avatar={item.data?.userAvatar || ''}
              key={index}
            />
          ))
        )}
      </Stack>
    </Container>
  );
};
