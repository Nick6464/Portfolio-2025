import React from 'react';
import styles from './About.module.scss';
import Terminal from './Terminal';
import { Box, useTheme } from '@mui/material';
import { info } from '../../info/Info';

const About: React.FC = () => {
  const theme = useTheme();
  const firstName = info.firstName.toLowerCase();

  function aboutMeText() {
    return (
      <>
        <p>
          <span style={{ color: theme.palette.primary.main }}>
            {firstName}
            {info.lastName.toLowerCase()} $
          </span>{' '}
          <span style={{ color: theme.palette.secondary.main }}>cat</span> about
          {firstName}{' '}
        </p>
        <p>
          <span style={{ color: theme.palette.primary.main }}>
            about{firstName} <span className={styles.green}>(main)</span> $
          </span>{' '}
          <span style={{ color: theme.palette.text.primary }}>{info.bio}</span>
        </p>
      </>
    );
  }

  function skillsText() {
    return (
      <>
        <p>
          <span style={{ color: theme.palette.primary.main }}>
            {firstName}
            {info.lastName.toLowerCase()} $
          </span>{' '}
          <span style={{ color: theme.palette.secondary.main }}>cd</span>{' '}
          skills/tools
        </p>
        <p>
          <span style={{ color: theme.palette.primary.main }}>
            skills/tools <span className={styles.green}>(main)</span> $
          </span>{' '}
          <span style={{ color: theme.palette.secondary.main }}>ls</span>
        </p>
        <p style={{ color: theme.palette.primary.main }}> Proficient With</p>
        <ul className={styles.skills}>
          {info.skills.proficientWith.map((proficiency, index) => (
            <li key={index} style={{ color: theme.palette.text.primary }}>
              {proficiency}
            </li>
          ))}
        </ul>
        <p style={{ color: theme.palette.primary.main }}> Exposed To</p>
        <ul className={styles.skills}>
          {info.skills.exposedTo.map((skill, index) => (
            <li key={index} style={{ color: theme.palette.text.primary }}>
              {skill}
            </li>
          ))}
        </ul>
      </>
    );
  }

  function miscText() {
    return (
      <>
        <p>
          <span style={{ color: theme.palette.primary.main }}>
            {firstName}
            {info.lastName.toLowerCase()} $
          </span>{' '}
          <span style={{ color: theme.palette.secondary.main }}>cd</span>{' '}
          hobbies/interests
        </p>
        <p>
          <span style={{ color: theme.palette.primary.main }}>
            hobbies/interests <span className={styles.green}>(main)</span> $
          </span>{' '}
          <span style={{ color: theme.palette.secondary.main }}>ls</span>
        </p>
        <ul className={styles.hobbies}>
          {info.hobbies.map((hobby, index) => (
            <li key={index} style={{ color: theme.palette.text.primary }}>
              <Box component={'span'} mr={'1rem'}>
                {hobby.emoji}
              </Box>
              {hobby.label}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      mt={'2rem'}
    >
      <Terminal>{aboutMeText()}</Terminal>
      <Terminal>{skillsText()}</Terminal>
      <Terminal>{miscText()}</Terminal>
    </Box>
  );
};

export default About;
