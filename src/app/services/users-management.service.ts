import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRegisterDto, UsersManagementDto, UsersManagementEditDto } from "../shared/models/user-models";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})

export class UsersManagementService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  public getAllUsers(): Observable<UsersManagementDto[]> {
    const url = this.apiService.getMsApi({
      api: 'getAllUsers',
      msEndPoint: 'wriststone'
    });

    return this.http.get<UsersManagementDto[]>(url);
  }

  public getAllRoles(): Observable<string[]> {
    const url = this.apiService.getMsApi({
      api: 'getAllUserRoles',
      msEndPoint: 'wriststone'
    });

    return this.http.get<string[]>(url);
  }

  public getUser(userId: number): Observable<UsersManagementEditDto> {
    const url = this.apiService.getMsApi({
      api: 'getManagementUser',
      msEndPoint: 'wriststone',
      innerParams: { userId }
    });

    return this.http.get<UsersManagementEditDto>(url);
  }

  public updateUser(userEdit: UsersManagementEditDto): Observable<UsersManagementEditDto> {
    const url = this.apiService.getMsApi({
      api: 'updateManagementUser',
      msEndPoint: 'wriststone'
    });

    return this.http.put<UsersManagementEditDto>(url, userEdit);
  }

  public addUser(userCreate: UserRegisterDto) {
    const url = this.apiService.getMsApi({
      api: 'addManagementUser',
      msEndPoint: 'wriststone',
    });

    return this.http.post(url, userCreate);
  }

  public removeUser(userId: number) {
    const url = this.apiService.getMsApi({
      api: 'removeManagementUser',
      msEndPoint: 'wriststone',
      innerParams: { userId }
    });

    return this.http.delete(url);
  }
}
