import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Permission } from "../shared/models/permisson-models";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {
  }

  public getDefaultPermissions(): Observable<Permission[]> {
    const url = this.apiService.getMsApi({
      api: 'getDefaultPermissions',
      msEndPoint: 'wriststone'
    });

    return this.http.get<Array<Permission>>(url);
  }

  public getPermissions(): Observable<Permission[]> {
    const url = this.apiService.getMsApi({
      api: 'getPermissions',
      msEndPoint: 'wriststone'
    });

    return this.http.get<Array<Permission>>(url);
  }
}
