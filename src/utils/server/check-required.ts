const checkRequired = (
  requiredFields: string[],
  body: any
): { error: string } | null => {
  for (const field of requiredFields) {
    if (!body[field]) {
      return { error: 'Value is required ' + field };
    }
  }
  return null;
};

export default checkRequired;
