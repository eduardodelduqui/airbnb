export const calculateNumberOfNights = (
  startDate: Date | null,
  endDate: Date | null
): number => {
  if (!startDate || !endDate) return 0;
  const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const convertBRLtoUSD = (brlCurrency: string): string => {
  const sanitized = brlCurrency.replace(/[^\d,.-]/g, "").trim();
  const decimalConverted = sanitized.replace(",", ".");
  const finalValue = decimalConverted.replace(
    /\./g,
    (match, offset, fullString) => {
      return offset < fullString.lastIndexOf(".") ? "" : ".";
    }
  );
  return finalValue;
};

export const multiplyPrice = (price: string, multiply: number): string => {
  const formattedPrice = convertBRLtoUSD(price);
  const value = parseFloat(formattedPrice) * multiply;
  return `R$ ${value.toFixed(2)}`;
};

export const sumPrice = (price1: string, price2: string): string => {
  const formattedPrice1 = convertBRLtoUSD(price1);
  const formattedPrice2 = convertBRLtoUSD(price2);
  const value = parseFloat(formattedPrice1) + parseFloat(formattedPrice2);
  return `R$ ${value.toFixed(2)}`;
};
