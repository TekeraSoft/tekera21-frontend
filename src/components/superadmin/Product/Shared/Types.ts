type optionType = { id: string; label: string };
export type AttributeType = {
  key: string;
  label: string;
  options: optionType[];
  isMultiple?: boolean;
  hasStock?: boolean;
};
