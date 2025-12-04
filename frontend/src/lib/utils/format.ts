import { AxiosError, isAxiosError } from "axios";
import { ErrorResponseType, MessageConversionObject } from "../Types/Types";

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

export const formatDateWithHours = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    minute: "2-digit",
    hour: "2-digit"
  }
) => {
  return formatDate(value, formatting);
};

export const formatCurrency = (value: number | string, currency: string = "BRL") => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);
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
