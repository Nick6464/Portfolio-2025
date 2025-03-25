import React from 'react';
import Style from './Home.module.scss';
import { Box } from '@mui/material';
import classNames from 'classnames';
import EmojiBullet from './EmojiBullet';
import { info } from '../../info/Info';
import me from '../../assets/self.png';
import Terminal from '../about/Terminal';
import SocialIcon from './SocialIcon';

const Home: React.FC = () => {
  return (
    <Box
      component={'main'}
      display={'flex'}
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems={'center'}
      justifyContent={'center'}
      minHeight={'calc(100vh - 175px)'}
    >
      <Box
        className={classNames(Style.avatar, Style.shadowed)}
        alt={'image of developer'}
        style={{ background: info.gradient }}
        component={'img'}
        src={me}
        width={{ xs: '35vh', md: '40vh' }}
        height={{ xs: '35vh', md: '40vh' }}
        borderRadius={'50%'}
        p={'0.75rem'}
        mb={{ xs: '1rem', sm: 0 }}
        mr={{ xs: 0, md: '2rem' }}
        mt={{ xs: '1rem', sm: 0 }}
      />
      <Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          mt={'2rem'}
        >
          <Terminal>
            <h1>
              Hi, I'm{' '}
              <span
                style={{
                  background: info.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {info.firstName}
              </span>
              <span className={Style.hand}>🤚</span>
            </h1>
            <h2>I'm {info.position}.</h2>
            <Box component={'ul'} p={'0.8rem'}>
              {info.miniBio.map((bio, index) => (
                <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} />
              ))}
            </Box>
            <Box
              display={'flex'}
              gap={'1.5rem'}
              justifyContent={'center'}
              fontSize={{ xs: '2rem', md: '2.5rem' }}
            >
              {info.socials.map((social, index) => (
                <SocialIcon
                  key={index}
                  link={social.link}
                  icon={social.icon}
                  label={social.label}
                />
              ))}
            </Box>
          </Terminal>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
