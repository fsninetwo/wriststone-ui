import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAuthResponseDTO, UserCredentialsDTO } from "../shared/models/UserModels";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  authorize(userCredentials: UserCredentialsDTO) {
    const url = this.apiService.getMsApi({
      api: 'authorize',
      msEndPoint: 'wriststone'
    })

    return this.http.post<UserAuthResponseDTO>(url, userCredentials);
  }
}
