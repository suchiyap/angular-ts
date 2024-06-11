import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../common/global-constant';

export interface General {
  id: number;
  code: string;
  name: string;
  seq_no: number;
}

export interface Territory {
  id: number,
  code: string,
  name: string,
  territory_type_name: string,
  calling_no_prefix: number,
  avatar: string,
  prefer_language_code: string,
  currency_code: string,
  currency_symbol: string,
  decimal_point: number,
  symbol_decimal: symbol,
  thousand_separator: symbol,
  seq_no: number
}

export interface GeneralDropdown {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  constructor(private http: HttpClient) {}

  getAllGenerals(data: {}): Observable<any> {
    return this.http.get<any>(`${GlobalConstants.apiURL}/general/all`, {
      params: data,
    });
  }

  getAllTerritory(data: {}): Observable<any> {
    return this.http.get<any>(`${GlobalConstants.apiURL}/territory/all`, {
      params: data,
    });
  }
}
