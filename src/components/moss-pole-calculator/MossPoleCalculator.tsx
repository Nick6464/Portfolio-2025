import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useCostCalculation, usePriceSources } from './hooks';
import InputSection from './InputSection';
import PriceSourceSection from './PriceSourceSection';
import CostBreakdown from './CostBreakdown';
import type {
  ProductSpecifications,
  FilamentParams,
  PetSheetParams,
  ChickenWireParams,
  CableTieParams,
  MossParams,
  PricingParams,
} from './types';

const MossPoleCalculator: React.FC = () => {
  // Product specifications
  const [specs, setSpecs] = useState<ProductSpecifications>({
    poleHeight: 1000,
    poleWidth: 158,
    productionVolume: 100,
  });

  // 3D Printing
  const [filament, setFilament] = useState<FilamentParams>({
    filamentWeight: 55.7,
    filamentCostKg: 28,
    printFailureRate: 5,
  });

  // PET Sheet
  const [petSheet, setPetSheet] = useState<PetSheetParams>({
    petSheetCost: 99.25,
    petSheetLength: 8000,
    petSheetWidth: 990,
    petWasteRate: 10,
  });

  // Chicken Wire
  const [chickenWire, setChickenWire] = useState<ChickenWireParams>({
    wireRollCost: 47.92,
    wireRollLength: 5000,
    wireRollWidth: 900,
    wireWasteRate: 15,
  });

  // Cable Ties
  const [cableTies, setCableTies] = useState<CableTieParams>({
    cableTiesPerPole: 30,
    cableTiePackCost: 45,
    cableTiePackSize: 1000,
    cableTieWasteRate: 5,
  });

  // Sphagnum Moss
  const [moss, setMoss] = useState<MossParams>({
    mossBagCost: 168,
    mossBagSize: 80,
    polesPerBag: 8,
    mossWasteRate: 5,
  });

  // Pricing & Profit
  const [pricing, setPricing] = useState<PricingParams>({
    sellingPrice: 50,
    targetMargin: 60,
  });

  // Calculate costs using custom hook
  const costs = useCostCalculation(
    specs,
    filament,
    petSheet,
    chickenWire,
    cableTies,
    moss,
    pricing
  );

  // Price sources management
  const {
    priceSources,
    expandedSections,
    newSourceForms,
    addPriceSource,
    removePriceSource,
    toggleSection,
    toggleNewSourceForm,
  } = usePriceSources();

  // Helper functions for updating state
  const updateSpecs = (key: string, value: number) => {
    setSpecs(prev => ({ ...prev, [key]: value }));
  };

  const updateFilament = (key: string, value: number) => {
    setFilament(prev => ({ ...prev, [key]: value }));
  };

  const updatePetSheet = (key: string, value: number) => {
    setPetSheet(prev => ({ ...prev, [key]: value }));
  };

  const updateChickenWire = (key: string, value: number) => {
    setChickenWire(prev => ({ ...prev, [key]: value }));
  };

  const updateCableTies = (key: string, value: number) => {
    setCableTies(prev => ({ ...prev, [key]: value }));
  };

  const updateMoss = (key: string, value: number) => {
    setMoss(prev => ({ ...prev, [key]: value }));
  };

  const updatePricing = (key: string, value: number) => {
    setPricing(prev => ({ ...prev, [key]: value }));
  };

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

        {/* Product Specifications */}
        <InputSection
          title="Product Specifications"
          emoji="📏"
          fields={[
            { key: 'poleHeight', label: 'Pole Height (mm)', min: 1 },
            { key: 'poleWidth', label: 'Pole Width Used (mm)', min: 1 },
            {
              key: 'productionVolume',
              label: 'Monthly Production Target',
              min: 1,
            },
          ]}
          values={specs}
          onChange={updateSpecs}
        />

        {/* 3D Printing */}
        <InputSection
          title="3D Printing"
          emoji="🖨️"
          fields={[
            {
              key: 'filamentWeight',
              label: 'Filament per Pole (g)',
              min: 0,
              step: 0.1,
            },
            {
              key: 'filamentCostKg',
              label: 'Filament Cost (NZ$/kg)',
              min: 0,
              step: 0.1,
            },
            {
              key: 'printFailureRate',
              label: 'Print Failure Rate (%)',
              min: 0,
              max: 100,
              step: 0.1,
            },
          ]}
          values={filament}
          onChange={updateFilament}
        >
          <PriceSourceSection
            section="filament"
            sources={priceSources.filament || []}
            expanded={expandedSections.filament || false}
            showNewForm={newSourceForms.filament || false}
            onToggleSection={toggleSection}
            onToggleNewForm={toggleNewSourceForm}
            onAddSource={addPriceSource}
            onRemoveSource={removePriceSource}
          />
        </InputSection>

        {/* PET Sheet */}
        <InputSection
          title="PET Sheet"
          emoji="📦"
          fields={[
            {
              key: 'petSheetCost',
              label: 'Sheet Cost (NZ$)',
              min: 0,
              step: 0.01,
            },
            { key: 'petSheetLength', label: 'Sheet Length (mm)', min: 1 },
            { key: 'petSheetWidth', label: 'Sheet Width (mm)', min: 1 },
            {
              key: 'petWasteRate',
              label: 'Cutting Waste Rate (%)',
              min: 0,
              max: 100,
              step: 0.1,
            },
          ]}
          values={petSheet}
          onChange={updatePetSheet}
        >
          <PriceSourceSection
            section="petSheet"
            sources={priceSources.petSheet || []}
            expanded={expandedSections.petSheet || false}
            showNewForm={newSourceForms.petSheet || false}
            onToggleSection={toggleSection}
            onToggleNewForm={toggleNewSourceForm}
            onAddSource={addPriceSource}
            onRemoveSource={removePriceSource}
          />
        </InputSection>

        {/* Chicken Wire */}
        <InputSection
          title="Chicken Wire"
          emoji="🕸️"
          fields={[
            {
              key: 'wireRollCost',
              label: 'Roll Cost (NZ$)',
              min: 0,
              step: 0.01,
            },
            { key: 'wireRollLength', label: 'Roll Length (mm)', min: 1 },
            { key: 'wireRollWidth', label: 'Roll Width (mm)', min: 1 },
            {
              key: 'wireWasteRate',
              label: 'Cutting Waste Rate (%)',
              min: 0,
              max: 100,
              step: 0.1,
            },
          ]}
          values={chickenWire}
          onChange={updateChickenWire}
        >
          <PriceSourceSection
            section="chickenWire"
            sources={priceSources.chickenWire || []}
            expanded={expandedSections.chickenWire || false}
            showNewForm={newSourceForms.chickenWire || false}
            onToggleSection={toggleSection}
            onToggleNewForm={toggleNewSourceForm}
            onAddSource={addPriceSource}
            onRemoveSource={removePriceSource}
          />
        </InputSection>

        {/* Cable Ties */}
        <InputSection
          title="Cable Ties"
          emoji="🔗"
          fields={[
            { key: 'cableTiesPerPole', label: 'Cable Ties per Pole', min: 1 },
            {
              key: 'cableTiePackCost',
              label: 'Pack Cost (NZ$)',
              min: 0,
              step: 0.01,
            },
            { key: 'cableTiePackSize', label: 'Ties per Pack', min: 1 },
            {
              key: 'cableTieWasteRate',
              label: 'Waste/Breakage Rate (%)',
              min: 0,
              max: 100,
              step: 0.1,
            },
          ]}
          values={cableTies}
          onChange={updateCableTies}
        >
          <PriceSourceSection
            section="cableTies"
            sources={priceSources.cableTies || []}
            expanded={expandedSections.cableTies || false}
            showNewForm={newSourceForms.cableTies || false}
            onToggleSection={toggleSection}
            onToggleNewForm={toggleNewSourceForm}
            onAddSource={addPriceSource}
            onRemoveSource={removePriceSource}
          />
        </InputSection>

        {/* Sphagnum Moss */}
        <InputSection
          title="Sphagnum Moss"
          emoji="🌿"
          fields={[
            { key: 'mossBagCost', label: 'Bag Cost (NZ$)', min: 0, step: 0.01 },
            { key: 'mossBagSize', label: 'Bag Size (Liters)', min: 1 },
            { key: 'polesPerBag', label: 'Poles per Bag', min: 1 },
            {
              key: 'mossWasteRate',
              label: 'Moss Waste Rate (%)',
              min: 0,
              max: 100,
              step: 0.1,
            },
          ]}
          values={moss}
          onChange={updateMoss}
        >
          <PriceSourceSection
            section="moss"
            sources={priceSources.moss || []}
            expanded={expandedSections.moss || false}
            showNewForm={newSourceForms.moss || false}
            onToggleSection={toggleSection}
            onToggleNewForm={toggleNewSourceForm}
            onAddSource={addPriceSource}
            onRemoveSource={removePriceSource}
          />
        </InputSection>

        {/* Pricing & Profit Analysis */}
        <InputSection
          title="Pricing & Profit Analysis"
          emoji="💰"
          fields={[
            {
              key: 'sellingPrice',
              label: 'Target Selling Price (NZ$)',
              min: 0,
              step: 0.01,
            },
            {
              key: 'targetMargin',
              label: 'Target Profit Margin (%)',
              min: 0,
              max: 100,
              step: 0.1,
            },
          ]}
          values={pricing}
          onChange={updatePricing}
        />

        {/* Cost Breakdown */}
        <CostBreakdown costs={costs} />
      </Paper>
    </Box>
  );
};

export default MossPoleCalculator;
