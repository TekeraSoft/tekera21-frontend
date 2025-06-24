import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import {
  Control,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ProductFormData } from "./ProductCreateForm";
import AttributeDetails from "./AttributeDetails";

interface IProps {
  watch: UseFormWatch<ProductFormData>;
  control: Control<ProductFormData, any, ProductFormData>;
  variationIndex: number;
  setValue: UseFormSetValue<ProductFormData>;
}

const Attributes = ({ watch, control, variationIndex, setValue }: IProps) => {
  const {
    fields,
    append,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: `variants.${variationIndex}.attributes`,
  });

  const addAttribute = () => {
    const newAttribute = {
      attributeDetails: [{ key: "", value: "" }],
      stock: 0,
      sku: "",
      barcode: "",
      price: 0,
      discountPrice: 0,
    };

    append(newAttribute);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Attributes</h3>
        <Button type="button" onClick={addAttribute} variant="dark" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Attribute
        </Button>
      </div>

      {fields.map((attribute, attributeIndex) => (
        <Card key={attributeIndex} className="bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Attribute {attributeIndex + 1}</h4>
              <Button
                type="button"
                onClick={() => removeAttribute(attributeIndex)}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <AttributeDetails
                  setValue={setValue}
                  attributeIndex={attributeIndex}
                  control={control}
                  variationIndex={variationIndex}
                  watch={watch}
                  key={attributeIndex}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.stock`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.stock`,
                      {
                        required: true,
                        valueAsNumber: true,
                      }
                    )}
                    placeholder="Stock"
                  />
                </div>
                <div>
                  <Label>SKU</Label>
                  <Input
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.sku`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.sku`,
                      {
                        required: true,
                        valueAsNumber: false,
                      }
                    )}
                    placeholder="SKU"
                  />
                </div>
                <div>
                  <Label>Barcode</Label>
                  <Input
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.barcode`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.barcode`,
                      {
                        required: true,
                        valueAsNumber: false,
                      }
                    )}
                    placeholder="Barcode"
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.price`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.price`,
                      {
                        required: true,
                        valueAsNumber: false,
                      }
                    )}
                    placeholder="Price"
                  />
                </div>
                <div>
                  <Label>Discount Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.discountPrice`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.discountPrice`,
                      {
                        required: true,
                        valueAsNumber: false,
                      }
                    )}
                    placeholder="Discount Price"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Attributes;
