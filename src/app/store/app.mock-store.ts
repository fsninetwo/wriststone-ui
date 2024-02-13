import { noUndefined } from "@angular/compiler/src/util";
import { BehaviorSubject, Observable } from "rxjs";

export class StoreMock<T> {
  private state: BehaviorSubject<any> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(): Observable<T> {
    return this.state.asObservable();
  }

  dispatch() {}
  pipe() {}
}
