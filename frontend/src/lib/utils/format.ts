import { AxiosError, isAxiosError } from "axios";

import { ErrorResponseType, MessageConversionObject } from "../Types/Types";

export const formatDate = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" }
) => {
  if (!value) return value;
  if (typeof value == "string" && !value.includes(":")) {
    value += " 00:00:00";
  }

  return new Intl.DateTimeFormat("pt-BR", formatting).format(new Date(value));
};

export const formatHours = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" }
) => {
  return formatDate(value, formatting);
};

export const formatDateWithHours = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    year: "numeric"
  }
) => {
  return formatDate(value, formatting);
};

export const formatCurrency = (value: number | string, currency: string = "BRL") => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  return new Intl.NumberFormat("pt-BR", { currency, style: "currency" }).format(value);
};

export function formatErrorMessage(
  err: AxiosError<ErrorResponseType> | unknown,
  message: MessageConversionObject | string
) {
  const messages: MessageConversionObject = typeof message === "string" ? { defaultMessage: message } : message;

  if (!isAxiosError<ErrorResponseType>(err) || !err.response || typeof err.response.data === "string")
    return messages.defaultMessage;

  const responseMessage = err.response.data.message;

  return messages[responseMessage] || responseMessage;
}
