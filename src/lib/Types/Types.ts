/**
 * StringfiedDate is any string that can be converted to a Date object.
 */
export type StringfiedDate = string;

export type ColumnSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

export type Themes = "light" | "dark";

export type Variants = "primary" | "secondary" | "danger" | "warning" | "success" | "info";

export type BgColors = "light" | "dark" | "default";

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type ErrorResponseType =
  | string
  | {
      success: boolean
      message: string
      code: number
    }

export type MessageConversionObject = {
  defaultMessage: string
  [key: string]: string
}

export type ResponseType<T> = {
  success: boolean
  message: string
  data: T
}

export type ArrayResponseType<T> = {
  success: boolean
  message: string
  data: T[]
  total?: number
}
