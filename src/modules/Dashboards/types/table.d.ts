type Headers = Record<string, HeaderType>

export type TableItem = {
  [key: string]: string | number | boolean | string[] | undefined;
  actions?: string[];
}
