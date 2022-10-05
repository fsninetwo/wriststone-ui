import { Injectable } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { environment } from "src/environments/environment";
import { apiEndPoints, microservicesEndpoints } from "./endpoints-constants";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api: Object = {};

  constructor(private router: Router, private serializer: UrlSerializer) {
    this.buildEndpointsList();
  }

  getMsApi({api, msEndPoint, innerParams, queryParams }: {api: string, msEndPoint: string, innerParams?: object, queryParams?: object}) {
    if(!innerParams) {
      innerParams = {};
    }

    var apiEndpoint = environment[environment.env].apiEndpoint;
    var endPoint = microservicesEndpoints[msEndPoint];
    var apiInnerParams = this.api[api](innerParams);
    var apiQueryParams = this.buildQueryParams(queryParams);

    var endpoint = `${apiEndpoint || ''}${endPoint}${apiInnerParams}${apiQueryParams}`

    return endpoint;
  }

  buildQueryParams(params: any) {
    if(!params) {
      return '';
    }
    const tree = this.router.createUrlTree([''], { queryParams: params });
    return this.serializer.serialize(tree);
  }

  private buildEndpointsList() {
    this.api[apiEndPoints.users.authorize] = this.getTemplateFn`/User/Authorize`;
    this.api[apiEndPoints.users.register] = this.getTemplateFn`/User/Register`;
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
