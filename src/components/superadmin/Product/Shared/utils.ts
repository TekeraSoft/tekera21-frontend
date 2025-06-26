import { ProductAttribute, ProductAttributeDetail } from "@/types/product";
import { BulkUpdateData } from "./BulkUpdateModal";

export function generateAttributeCombinations(
  selectedAttributes: Record<string, string[]>,
  basePrice = 1449,
  baseStock = 50
): ProductAttribute[] {
  const attributeKeys = Object.keys(selectedAttributes).filter(
    (key) => selectedAttributes[key].length > 0
  );

  if (attributeKeys.length === 0) return [];

  // Generate all possible combinations
  const combinations = generateCombinations(selectedAttributes, attributeKeys);

  return combinations.map((combination, index) => {
    const attributeDetails: ProductAttributeDetail[] = combination.map(
      ({ key, value }) => ({
        key,
        value,
      })
    );

    // Generate SKU based on combination
    const skuParts = combination
      .map(
        ({ key, value }) =>
          `${key.charAt(0).toUpperCase()}${value
            .toLowerCase()
            .replace(/\s+/g, "")}`
      )
      .join("-");

    const sku = `DK-${skuParts}-${index + 1}`;
    const barcode = `${sku}-BC`;

    return {
      attributeDetails,
      stock: baseStock,
      price: basePrice,
      discountPrice: 0,
      sku,
      barcode,
    };
  });
}

function generateCombinations(
  selectedAttributes: Record<string, string[]>,
  attributeKeys: string[]
): Array<Array<{ key: string; value: string }>> {
  if (attributeKeys.length === 0) return [];
  if (attributeKeys.length === 1) {
    const key = attributeKeys[0];
    return selectedAttributes[key].map((value) => [{ key, value }]);
  }

  const [firstKey, ...restKeys] = attributeKeys;
  const firstValues = selectedAttributes[firstKey];
  const restCombinations = generateCombinations(selectedAttributes, restKeys);

  const combinations: Array<Array<{ key: string; value: string }>> = [];

  for (const value of firstValues) {
    for (const restCombination of restCombinations) {
      combinations.push([{ key: firstKey, value }, ...restCombination]);
    }
  }

  return combinations;
}

export function getAttributeDisplayText(
  attributeDetails: ProductAttributeDetail[]
): string {
  return attributeDetails
    .map((detail) => `${detail.key}: ${detail.value}`)
    .join(", ");
}

// NEW: Parse existing ProductAttribute[] back to selectedAttributes
export function parseAttributesFromCombinations(
  attributes: ProductAttribute[],
  multiSelectKeys: string[] = ["size", "weight"] // Keys that should be arrays
): Record<string, string | string[]> {
  if (!attributes || attributes.length === 0) return {};

  const selectedAttributes: Record<string, string | string[]> = {};
  const attributeValueMap: Record<string, Set<string>> = {};

  // Collect all unique values for each attribute key
  attributes.forEach((attribute) => {
    attribute.attributeDetails.forEach((detail) => {
      if (!attributeValueMap[detail.key]) {
        attributeValueMap[detail.key] = new Set();
      }
      attributeValueMap[detail.key].add(detail.value);
    });
  });

  // Convert to selectedAttributes format
  Object.entries(attributeValueMap).forEach(([key, valueSet]) => {
    const values = Array.from(valueSet);

    if (multiSelectKeys.includes(key)) {
      // Multi-select attributes (size, weight)
      selectedAttributes[key] = values;
    } else {
      // Single-select attributes (color, material, style)
      selectedAttributes[key] = values[0] || "";
    }
  });

  return selectedAttributes;
}

// NEW: Detect primary attribute type from existing data
export function detectPrimaryAttributeType(
  attributes: ProductAttribute[]
): "size" | "weight" {
  if (!attributes || attributes.length === 0) return "size";

  // Check if any attribute has size or weight
  const hasSize = attributes.some((attr) =>
    attr.attributeDetails.some((detail) => detail.key === "size")
  );
  const hasWeight = attributes.some((attr) =>
    attr.attributeDetails.some((detail) => detail.key === "weight")
  );

  return hasWeight ? "weight" : "size";
}

export function applyBulkUpdates(
  attributes: ProductAttribute[],
  bulkData: BulkUpdateData
): ProductAttribute[] {
  return attributes.map((attribute, index) => {
    const updatedAttribute = { ...attribute };

    // Update stock
    if (bulkData.updateFields.stock && bulkData.stock !== undefined) {
      updatedAttribute.stock = bulkData.stock;
    }

    // Update price
    if (bulkData.updateFields.price && bulkData.price !== undefined) {
      updatedAttribute.price = bulkData.price;
    }

    // Update discount price
    if (
      bulkData.updateFields.discountPrice &&
      bulkData.discountPrice !== undefined
    ) {
      updatedAttribute.discountPrice = bulkData.discountPrice;
    }

    // Regenerate SKU
    if (bulkData.updateFields.sku) {
      const skuParts = attribute.attributeDetails
        .map(
          ({ key, value }) =>
            `${key.charAt(0).toUpperCase()}${value
              .toLowerCase()
              .replace(/\s+/g, "")}`
        )
        .join("-");
      updatedAttribute.sku = `DK-${skuParts}-${index + 1}`;
    }

    // Regenerate Barcode
    if (bulkData.updateFields.barcode) {
      updatedAttribute.barcode = `${updatedAttribute.sku}-BC`;
    }

    return updatedAttribute;
  });
}
