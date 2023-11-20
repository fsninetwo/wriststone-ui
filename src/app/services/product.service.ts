import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductDTO } from "../shared/models/product-models";
import { ApiService } from "./configuration/api.service";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient) {}

  getAllUsers() {
    const url = this.apiService.getMsApi({
      api: 'getAllProducts',
      msEndPoint: 'wriststone'
    });

    return this.http.get<ProductDTO[]>(url);
  }
}
