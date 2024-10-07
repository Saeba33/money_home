export const isPositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value >= 0;
};

export const areRequiredFieldsFilled = (
  obj: Record<string, unknown>,
  requiredFields: string[]
): boolean => {
  return requiredFields.every(
    (field) => obj[field] !== undefined && obj[field] !== ""
  );
};
