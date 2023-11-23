import { TestBed } from "@angular/core/testing";
import { Permission } from "src/app/shared/models/permisson-models";
import { ApiService } from "../configuration/api.service";
import { PermissionService } from "../permission.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

const defaultPermissions: Permission[] = [
  { permission: "test", accessLevel: "test" }
];

const permissions: Permission[] = [
  { permission: "test", accessLevel: "test" },
  { permission: "test1", accessLevel: "test1" }
];

describe("PermissionService", () => {
  let service: PermissionService;
  let httpMock: HttpTestingController;
  let mockApiService = jasmine.createSpyObj(["getMsApi"]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ],
    });
    service = TestBed.inject(PermissionService);
    httpMock = TestBed.get(HttpTestingController)
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("getDefaultPermissions should return default permissions", () => {
    mockApiService.getMsApi.and.returnValue("testApi");
    service.getDefaultPermissions().subscribe(
      (result: Permission[]) => {
        expect(result).toEqual(defaultPermissions);
      });

      const request = httpMock.expectOne("testApi");
      expect(request.request.method).toEqual("GET");
      request.flush(defaultPermissions);
  });

  it("getPermissions should return permissions", () => {
    mockApiService.getMsApi.and.returnValue("testApi");
    service.getPermissions().subscribe(
      (result: Permission[]) => {
        expect(result).toEqual(permissions);
      });

      const request = httpMock.expectOne("testApi");
      expect(request.request.method).toEqual("GET");
      request.flush(permissions);
  });
});
