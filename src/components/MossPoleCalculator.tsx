import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const MossPoleCalculator: React.FC = () => {
  // Product specifications
  const [poleHeight, setPoleHeight] = useState(1000);
  const [poleWidth, setPoleWidth] = useState(158);
  const [productionVolume, setProductionVolume] = useState(100);

  // 3D Printing
  const [filamentWeight, setFilamentWeight] = useState(55.7);
  const [filamentCostKg, setFilamentCostKg] = useState(28);
  const [printFailureRate, setPrintFailureRate] = useState(5);

  // PET Sheet
  const [petSheetCost, setPetSheetCost] = useState(99.25);
  const [petSheetLength, setPetSheetLength] = useState(8000);
  const [petSheetWidth, setPetSheetWidth] = useState(990);
  const [petWasteRate, setPetWasteRate] = useState(10);

  // Chicken Wire
  const [wireRollCost, setWireRollCost] = useState(47.92);
  const [wireRollLength, setWireRollLength] = useState(5000);
  const [wireRollWidth, setWireRollWidth] = useState(900);
  const [wireWasteRate, setWireWasteRate] = useState(15);

  // Cable Ties
  const [cableTiesPerPole, setCableTiesPerPole] = useState(30);
  const [cableTiePackCost, setCableTiePackCost] = useState(45);
  const [cableTiePackSize, setCableTiePackSize] = useState(1000);
  const [cableTieWasteRate, setCableTieWasteRate] = useState(5);

  // Sphagnum Moss
  const [mossBagCost, setMossBagCost] = useState(168);
  const [mossBagSize, setMossBagSize] = useState(80);
  const [polesPerBag, setPolesPerBag] = useState(8);
  const [mossWasteRate, setMossWasteRate] = useState(5);

  // Pricing & Profit
  const [sellingPrice, setSellingPrice] = useState(50);
  const [targetMargin, setTargetMargin] = useState(60);

  // Calculated values
  const [costs, setCosts] = useState({
    filamentCost: 0,
    petCost: 0,
    wireCost: 0,
    cableCost: 0,
    mossCost: 0,
    totalCost: 0,
    grossProfit: 0,
    profitMargin: 0,
    monthlyProfit: 0,
    requiredPrice: 0,
  });

  useEffect(() => {
    const calculateCosts = () => {
      // Calculate 3D printing cost
      const filamentCostPerGram = filamentCostKg / 1000;
      const filamentCostBase = filamentWeight * filamentCostPerGram;
      const filamentCostWithWaste =
        filamentCostBase * (1 + printFailureRate / 100);

      // Calculate PET sheet cost
      const polesAcrossPetWidth = Math.floor(petSheetWidth / poleWidth);
      const polesAlongPetLength = Math.floor(petSheetLength / poleHeight);
      const totalPolesPerPetSheet = polesAcrossPetWidth * polesAlongPetLength;
      const petCostBase = petSheetCost / totalPolesPerPetSheet;
      const petCostWithWaste = petCostBase * (1 + petWasteRate / 100);

      // Calculate chicken wire cost
      const polesAcrossWireWidth = Math.floor(wireRollWidth / poleWidth);
      const polesAlongWireLength = Math.floor(wireRollLength / poleHeight);
      const totalPolesPerWireRoll = polesAcrossWireWidth * polesAlongWireLength;
      const wireCostBase = wireRollCost / totalPolesPerWireRoll;
      const wireCostWithWaste = wireCostBase * (1 + wireWasteRate / 100);

      // Calculate cable tie cost
      const cableTieCostPerTie = cableTiePackCost / cableTiePackSize;
      const cableTieCostBase = cableTiesPerPole * cableTieCostPerTie;
      const cableTieCostWithWaste =
        cableTieCostBase * (1 + cableTieWasteRate / 100);

      // Calculate moss cost
      const mossCostBase = mossBagCost / polesPerBag;
      const mossCostWithWaste = mossCostBase * (1 + mossWasteRate / 100);

      // Total cost
      const totalCostPerPole =
        filamentCostWithWaste +
        petCostWithWaste +
        wireCostWithWaste +
        cableTieCostWithWaste +
        mossCostWithWaste;

      // Profit calculations
      const grossProfitPerPole = sellingPrice - totalCostPerPole;
      const actualProfitMargin = (grossProfitPerPole / sellingPrice) * 100;
      const monthlyProfitTotal = grossProfitPerPole * productionVolume;
      const requiredPriceForTargetMargin =
        totalCostPerPole / (1 - targetMargin / 100);

      setCosts({
        filamentCost: filamentCostWithWaste,
        petCost: petCostWithWaste,
        wireCost: wireCostWithWaste,
        cableCost: cableTieCostWithWaste,
        mossCost: mossCostWithWaste,
        totalCost: totalCostPerPole,
        grossProfit: grossProfitPerPole,
        profitMargin: actualProfitMargin,
        monthlyProfit: monthlyProfitTotal,
        requiredPrice: requiredPriceForTargetMargin,
      });
    };

    calculateCosts();
  }, [
    poleHeight,
    poleWidth,
    productionVolume,
    filamentWeight,
    filamentCostKg,
    printFailureRate,
    petSheetCost,
    petSheetLength,
    petSheetWidth,
    petWasteRate,
    wireRollCost,
    wireRollLength,
    wireRollWidth,
    wireWasteRate,
    cableTiesPerPole,
    cableTiePackCost,
    cableTiePackSize,
    cableTieWasteRate,
    mossBagCost,
    mossBagSize,
    polesPerBag,
    mossWasteRate,
    sellingPrice,
    targetMargin,
  ]);

  return (
    <Box maxWidth="lg" sx={{ mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          gutterBottom
          color="success.main"
        >
          🌿 Moss Pole Production Cost Calculator
        </Typography>

        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderLeft: 4, borderLeftColor: 'success.main' }}
        >
          <Typography variant="h5" gutterBottom color="success.main">
            📏 Product Specifications
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Pole Height (mm)"
                type="number"
                value={poleHeight}
                onChange={e => setPoleHeight(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Pole Width Used (mm)"
                type="number"
                value={poleWidth}
                onChange={e => setPoleWidth(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Monthly Production Target"
                type="number"
                value={productionVolume}
                onChange={e => setProductionVolume(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderLeft: 4, borderLeftColor: 'success.main' }}
        >
          <Typography variant="h5" gutterBottom color="success.main">
            🖨️ 3D Printing
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Filament per Pole (g)"
                type="number"
                value={filamentWeight}
                onChange={e => setFilamentWeight(Number(e.target.value))}
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Filament Cost (NZ$/kg)"
                type="number"
                value={filamentCostKg}
                onChange={e => setFilamentCostKg(Number(e.target.value))}
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Print Failure Rate (%)"
                type="number"
                value={printFailureRate}
                onChange={e => setPrintFailureRate(Number(e.target.value))}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderLeft: 4, borderLeftColor: 'success.main' }}
        >
          <Typography variant="h5" gutterBottom color="success.main">
            📦 PET Sheet
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Sheet Cost (NZ$)"
                type="number"
                value={petSheetCost}
                onChange={e => setPetSheetCost(Number(e.target.value))}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Sheet Length (mm)"
                type="number"
                value={petSheetLength}
                onChange={e => setPetSheetLength(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Sheet Width (mm)"
                type="number"
                value={petSheetWidth}
                onChange={e => setPetSheetWidth(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Cutting Waste Rate (%)"
                type="number"
                value={petWasteRate}
                onChange={e => setPetWasteRate(Number(e.target.value))}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderLeft: 4, borderLeftColor: 'success.main' }}
        >
          <Typography variant="h5" gutterBottom color="success.main">
            🕸️ Chicken Wire
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Roll Cost (NZ$)"
                type="number"
                value={wireRollCost}
                onChange={e => setWireRollCost(Number(e.target.value))}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Roll Length (mm)"
                type="number"
                value={wireRollLength}
                onChange={e => setWireRollLength(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Roll Width (mm)"
                type="number"
                value={wireRollWidth}
                onChange={e => setWireRollWidth(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Cutting Waste Rate (%)"
                type="number"
                value={wireWasteRate}
                onChange={e => setWireWasteRate(Number(e.target.value))}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderLeft: 4, borderLeftColor: 'success.main' }}
        >
          <Typography variant="h5" gutterBottom color="success.main">
            🔗 Cable Ties
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Cable Ties per Pole"
                type="number"
                value={cableTiesPerPole}
                onChange={e => setCableTiesPerPole(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Pack Cost (NZ$)"
                type="number"
                value={cableTiePackCost}
                onChange={e => setCableTiePackCost(Number(e.target.value))}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Ties per Pack"
                type="number"
                value={cableTiePackSize}
                onChange={e => setCableTiePackSize(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Waste/Breakage Rate (%)"
                type="number"
                value={cableTieWasteRate}
                onChange={e => setCableTieWasteRate(Number(e.target.value))}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderLeft: 4, borderLeftColor: 'success.main' }}
        >
          <Typography variant="h5" gutterBottom color="success.main">
            🌿 Sphagnum Moss
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Bag Cost (NZ$)"
                type="number"
                value={mossBagCost}
                onChange={e => setMossBagCost(Number(e.target.value))}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Bag Size (Liters)"
                type="number"
                value={mossBagSize}
                onChange={e => setMossBagSize(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Poles per Bag"
                type="number"
                value={polesPerBag}
                onChange={e => setPolesPerBag(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Moss Waste Rate (%)"
                type="number"
                value={mossWasteRate}
                onChange={e => setMossWasteRate(Number(e.target.value))}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 3, borderLeft: 4, borderLeftColor: 'success.main' }}
        >
          <Typography variant="h5" gutterBottom color="success.main">
            💰 Pricing & Profit Analysis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Target Selling Price (NZ$)"
                type="number"
                value={sellingPrice}
                onChange={e => setSellingPrice(Number(e.target.value))}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Target Profit Margin (%)"
                type="number"
                value={targetMargin}
                onChange={e => setTargetMargin(Number(e.target.value))}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Card
          sx={{
            mt: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h3"
              textAlign="center"
              gutterBottom
            >
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
                    <Typography variant="body2">
                      Gross Profit per Pole
                    </Typography>
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
      </Paper>
    </Box>
  );
};

export default MossPoleCalculator;
