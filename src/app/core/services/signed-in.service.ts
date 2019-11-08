import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignedInUserService {
  public IsUserSignedIn: Subject<boolean> = new Subject<boolean>();
}
