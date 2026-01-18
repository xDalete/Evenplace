export type ArrayResponseType<T> = {
  data: T[];
  message: string;
  success: boolean;
  total?: number;
};

export type BgColors = "dark" | "default" | "light";

export type ColumnSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type ErrorResponseType =
  | string
  | {
      code: number;
      message: string;
      success: boolean;
    };

export type MessageConversionObject = {
  [key: string]: string;
  defaultMessage: string;
};

export type ResponseType<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type Sizes = "lg" | "md" | "sm" | "xl" | "xs";

/**
 * StringfiedDate is any string that can be converted to a Date object.
 */
export type StringfiedDate = string;

export type Themes = "dark" | "light";

export type Variants = "danger" | "info" | "primary" | "secondary" | "success" | "warning";
