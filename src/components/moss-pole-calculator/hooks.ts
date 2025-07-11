import { useState, useEffect } from 'react';
import type {
  CostBreakdown,
  ProductSpecifications,
  FilamentParams,
  PetSheetParams,
  ChickenWireParams,
  CableTieParams,
  MossParams,
  PricingParams,
  PriceSource,
} from './types';

export const useCostCalculation = (
  specs: ProductSpecifications,
  filament: FilamentParams,
  petSheet: PetSheetParams,
  chickenWire: ChickenWireParams,
  cableTies: CableTieParams,
  moss: MossParams,
  pricing: PricingParams
) => {
  const [costs, setCosts] = useState<CostBreakdown>({
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
      const filamentCostPerGram = filament.filamentCostKg / 1000;
      const filamentCostBase = filament.filamentWeight * filamentCostPerGram;
      const filamentCostWithWaste =
        filamentCostBase * (1 + filament.printFailureRate / 100);

      // Calculate PET sheet cost
      const polesAcrossPetWidth = Math.floor(
        petSheet.petSheetWidth / specs.poleWidth
      );
      const polesAlongPetLength = Math.floor(
        petSheet.petSheetLength / specs.poleHeight
      );
      const totalPolesPerPetSheet = polesAcrossPetWidth * polesAlongPetLength;
      const petCostBase = petSheet.petSheetCost / totalPolesPerPetSheet;
      const petCostWithWaste = petCostBase * (1 + petSheet.petWasteRate / 100);

      // Calculate chicken wire cost
      const polesAcrossWireWidth = Math.floor(
        chickenWire.wireRollWidth / specs.poleWidth
      );
      const polesAlongWireLength = Math.floor(
        chickenWire.wireRollLength / specs.poleHeight
      );
      const totalPolesPerWireRoll = polesAcrossWireWidth * polesAlongWireLength;
      const wireCostBase = chickenWire.wireRollCost / totalPolesPerWireRoll;
      const wireCostWithWaste =
        wireCostBase * (1 + chickenWire.wireWasteRate / 100);

      // Calculate cable tie cost
      const cableTieCostPerTie =
        cableTies.cableTiePackCost / cableTies.cableTiePackSize;
      const cableTieCostBase = cableTies.cableTiesPerPole * cableTieCostPerTie;
      const cableTieCostWithWaste =
        cableTieCostBase * (1 + cableTies.cableTieWasteRate / 100);

      // Calculate moss cost
      const mossCostBase = moss.mossBagCost / moss.polesPerBag;
      const mossCostWithWaste = mossCostBase * (1 + moss.mossWasteRate / 100);

      // Total cost
      const totalCostPerPole =
        filamentCostWithWaste +
        petCostWithWaste +
        wireCostWithWaste +
        cableTieCostWithWaste +
        mossCostWithWaste;

      // Profit calculations
      const grossProfitPerPole = pricing.sellingPrice - totalCostPerPole;
      const actualProfitMargin =
        (grossProfitPerPole / pricing.sellingPrice) * 100;
      const monthlyProfitTotal = grossProfitPerPole * specs.productionVolume;
      const requiredPriceForTargetMargin =
        totalCostPerPole / (1 - pricing.targetMargin / 100);

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
  }, [specs, filament, petSheet, chickenWire, cableTies, moss, pricing]);

  return costs;
};

export const usePriceSources = () => {
  const [priceSources, setPriceSources] = useState<
    Record<string, PriceSource[]>
  >({
    filament: [],
    petSheet: [],
    chickenWire: [],
    cableTies: [],
    moss: [],
  });

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [newSourceForms, setNewSourceForms] = useState<Record<string, boolean>>(
    {}
  );

  // Load price sources from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('moss-pole-price-sources');
    if (saved) {
      try {
        setPriceSources(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading price sources:', error);
      }
    }
  }, []);

  // Save price sources to localStorage
  useEffect(() => {
    localStorage.setItem(
      'moss-pole-price-sources',
      JSON.stringify(priceSources)
    );
  }, [priceSources]);

  const addPriceSource = (section: string, source: PriceSource) => {
    setPriceSources(prev => ({
      ...prev,
      [section]: [...prev[section], source],
    }));
  };

  const removePriceSource = (section: string, id: string) => {
    setPriceSources(prev => ({
      ...prev,
      [section]: prev[section].filter(source => source.id !== id),
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleNewSourceForm = (section: string) => {
    setNewSourceForms(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return {
    priceSources,
    expandedSections,
    newSourceForms,
    addPriceSource,
    removePriceSource,
    toggleSection,
    toggleNewSourceForm,
  };
};
