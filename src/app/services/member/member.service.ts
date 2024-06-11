import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../common/global-constant';
import { Observable } from 'rxjs';

export interface Member {
  id: number;
  encryptedId: string;
  code: string;
  contact_no: string;
  country_desc: string;
  created_at: string;
  created_by: string;
  display_name: string;
  email: string;
  is_affiliate: boolean;
  joined_at: string;
  name: string;
  referral_code: string;
  referral_display_name: string;
  referral_name: string;
  status_desc: string;
  updated_at: string;
  updated_by: string;
  username: string;
}

export interface MemberDetails {
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
export class MemberService {
  constructor(private http: HttpClient) {}

  getMemberListing(data: {}): Observable<any> {
    return this.http.get<any>(`${GlobalConstants.apiURL}/member`, {
      params: data,
    });
  }

  removeMember(id: number): Observable<any> {
    return this.http.delete<any>(`${GlobalConstants.apiURL}/member/${id}`);
  }

  getMemberDetails(id: string): Observable<any> {
    return this.http.get<any>(`${GlobalConstants.apiURL}/member/${id}`);
  }

  updateMember(data: {}, id: string): Observable <any> {
    console.log(data, id);
    return this.http.post<any>(`${GlobalConstants.apiURL}/member/${id}`, data);
  }
}