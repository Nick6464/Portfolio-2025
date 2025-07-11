import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import type { CostBreakdown as CostBreakdownType } from './types';

interface CostBreakdownProps {
  costs: CostBreakdownType;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ costs }) => {
  return (
    <Card
      sx={{
        mt: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h3" textAlign="center" gutterBottom>
          📊 Cost Breakdown per Pole
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={2.4}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  ${costs.filamentCost.toFixed(2)}
                </Typography>
                <Typography variant="body2">3D Printing</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  ${costs.petCost.toFixed(2)}
                </Typography>
                <Typography variant="body2">PET Sheet</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  ${costs.wireCost.toFixed(2)}
                </Typography>
                <Typography variant="body2">Chicken Wire</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  ${costs.cableCost.toFixed(2)}
                </Typography>
                <Typography variant="body2">Cable Ties</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  ${costs.mossCost.toFixed(2)}
                </Typography>
                <Typography variant="body2">Sphagnum Moss</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card
          sx={{
            bgcolor: 'rgba(255,255,255,0.15)',
            color: 'white',
            textAlign: 'center',
            mb: 3,
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        >
          <CardContent>
            <Typography variant="h3" component="div">
              ${costs.totalCost.toFixed(2)}
            </Typography>
            <Typography variant="h6">Total Cost per Pole</Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  ${costs.grossProfit.toFixed(2)}
                </Typography>
                <Typography variant="body2">Gross Profit per Pole</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {costs.profitMargin.toFixed(1)}%
                </Typography>
                <Typography variant="body2">Profit Margin</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  ${costs.monthlyProfit.toFixed(0)}
                </Typography>
                <Typography variant="body2">Monthly Profit</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  ${costs.requiredPrice.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Required Price for Target Margin
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
