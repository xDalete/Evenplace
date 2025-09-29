export const formatDate = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = { month: "2-digit", day: "2-digit", year: "numeric" }
) => {
  if (!value) return value;
  if (typeof value == "string" && !value.includes(":")) {
    value += " 00:00:00";
  }

  return new Intl.DateTimeFormat("pt-BR", formatting).format(new Date(value));
};

export const formatHours = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = { minute: "2-digit", hour: "2-digit" }
) => {
  return formatDate(value, formatting);
};
