import { Injectable } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { join } from "path";
import { environment } from "src/environments/environment.prod";
import { apiEndPoints, microservicesEndpoints } from "./endpoints-constants";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api: Object = {};

  constructor(private router: Router, private serializer: UrlSerializer) {}

  getMsApi({api, msEndPoint, innerParams, queryParams }: {api: string, msEndPoint: string, innerParams?: object, queryParams?: object}) {
    if(!innerParams) {
      innerParams = {};
    }

    return `${environment[environment.env].apiEndpoint || ''}/${microservicesEndpoints[msEndPoint]}/${this.api[api](innerParams)}${this.buildQueryParams(queryParams)}`;
  }

  buildQueryParams(params: any) {
    if(!params) {
      return '';
    }
    const tree = this.router.createUrlTree([''], { queryParams: params });
    return this.serializer.serialize(tree);
  }

  private buildEndpointsList() {
    this.api[apiEndPoints.users.getUserByCredentials] = this.getTemplateFn``;
  }

  private getTemplateFn(strings, ...keys) {
    return (function (...values) {
      const dict = values[values.length - 1] || {};
      const hasDummy = Object.keys(dict).some(key => key === 'dummy$')
      const result = [strings[0]];
      keys.forEach(function (key, i) {
        let value = '';
        if(hasDummy) {
          value = dict.dummy$
        } else {
          value = Number.isInteger(key) ? values[key] : dict[key];
        }
        result.push(value, strings[i + 1])
      });
      return result.join('').replace(/(\/)\1+/gm, '/')
    });
  }
}
