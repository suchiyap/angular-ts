export class GlobalConstants {
  public static appURL: string = "http://localhost:4200/";  
  public static storageURL: string = "https://std-mlm-api.securevws.com/storage/";
  public static apiURL: string = "https://std-mlm-api.securevws.com/api/admin";
}

export function getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}

export function  getRowIndex(index: number, currentPage: number, maxSize: number): number {
  return ((currentPage - 1) * (maxSize)) + index + 1;
}