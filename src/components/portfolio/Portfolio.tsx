import React from 'react';
import PortfolioBlock from './PortfolioBlock';
import { Box, Grid2 as Grid } from '@mui/material';
import { info } from '../../info/Info';

const Portfolio: React.FC = () => {
  return (
    <Box
      sx={{
        margin: 2,
      }}
    >
      <Grid container display={'flex'} justifyContent={'center'} spacing={2}>
        {info.portfolio.map((project, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index} sx={{ display: 'flex' }}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              width={'100%'}
            >
              <PortfolioBlock
                image={project.image}
                icon={project.icon}
                live={project.live}
                source={project.source}
                title={project.title}
                description={project.description}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Portfolio;
