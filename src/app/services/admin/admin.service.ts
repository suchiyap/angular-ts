import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../common/global-constant';
import { Observable } from 'rxjs';

export interface Admin {
  id: number;
  encryptedId: string;
  created_at: string;
  created_by: string;
  name: string;
  username: string;
  email: string;
  sys_group_name: string;
  status_desc: string;
  updated_at: string;
  updated_by: string;
}

export interface AdminDetails {
  code: string;
  country_id: string;
  date_of_birth: string;
  display_name: string;
  email: string;
  gender: string;
  is_affiliate: string;
  joined_at: string;
  mobile_no: string;
  mobile_prefix: string;
  name: string;
  rank_level: string;
  rank_level_name: string;
  referral_code: string;
  referral_display_name: string;
  referral_id: number;
  referral_name: string;
  status: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAdminListing(data: {}): Observable<any> {
    return this.http.get<any>(`${GlobalConstants.apiURL}/admin`, {
      params: data,
    });
  }

  removeAdmin(id: number): Observable<any> {
    return this.http.delete<any>(`${GlobalConstants.apiURL}/admin/${id}`);
  }

  getAdminDetails(id: string): Observable<any> {
    return this.http.get<any>(`${GlobalConstants.apiURL}/admin/${id}`);
  }

  updateAdmin(data: {}, id: string): Observable <any> {
    console.log(data, id);
    return this.http.post<any>(`${GlobalConstants.apiURL}/admin/${id}`, data);
  }
}