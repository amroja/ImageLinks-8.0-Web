import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Util } from './Util.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public systemSettings: any;

  constructor(private util: Util) {
    this.systemSettings = {};
  }
  generateBlobHttpOptions(): any {
    return {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      responseType: 'blob',
    };
  }

  generateTextHttpOptions(): any {
    return {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      responseType: 'text/plain',
    };
  }
}
