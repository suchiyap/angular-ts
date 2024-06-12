export class GlobalConstants {
  public static appURL: string = "http://localhost:4200/";  
  public static storageURL: string = "http://127.0.0.1/8000/storage/";
  public static apiURL: string = "http://127.0.0.1/8000/api/admin";
}

export function getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}

export function  getRowIndex(index: number, currentPage: number, maxSize: number): number {
  return ((currentPage - 1) * (maxSize)) + index + 1;
}