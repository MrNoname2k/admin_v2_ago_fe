import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any;
 /* TODO document why this constructor is empty */ 
  public getData() {
    return this.data;
  }

  public setData(data: any) {
    this.data = data;
  }
}
