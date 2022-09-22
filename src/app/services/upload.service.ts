import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  getUserByCredentials(login: string, password: string) {
    const url = this.apiService.getMsApi({
      api: 'getUserByCredentials',
      msEndPoint: 'wriststone'
    })

    return this.http.get<User>(url)
  }
}
