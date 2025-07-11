export interface PriceSource {
  id: string;
  item: string;
  source: string;
  url: string;
  price: string;
  notes: string;
}

export interface CostBreakdown {
  filamentCost: number;
  petCost: number;
  wireCost: number;
  cableCost: number;
  mossCost: number;
  totalCost: number;
  grossProfit: number;
  profitMargin: number;
  monthlyProfit: number;
  requiredPrice: number;
}

export interface ProductSpecifications {
  poleHeight: number;
  poleWidth: number;
  productionVolume: number;
  [key: string]: number;
}

export interface FilamentParams {
  filamentWeight: number;
  filamentCostKg: number;
  printFailureRate: number;
  [key: string]: number;
}

export interface PetSheetParams {
  petSheetCost: number;
  petSheetLength: number;
  petSheetWidth: number;
  petWasteRate: number;
  [key: string]: number;
}

export interface ChickenWireParams {
  wireRollCost: number;
  wireRollLength: number;
  wireRollWidth: number;
  wireWasteRate: number;
  [key: string]: number;
}

export interface CableTieParams {
  cableTiesPerPole: number;
  cableTiePackCost: number;
  cableTiePackSize: number;
  cableTieWasteRate: number;
  [key: string]: number;
}

export interface MossParams {
  mossBagCost: number;
  mossBagSize: number;
  polesPerBag: number;
  mossWasteRate: number;
  [key: string]: number;
}

export interface PricingParams {
  sellingPrice: number;
  targetMargin: number;
  [key: string]: number;
}

export interface SupplierEntry {
  id: string;
  name: string;
  url: string;
  category: string;
  notes?: string;
}
