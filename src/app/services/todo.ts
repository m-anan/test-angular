import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Todo {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.example.com/items';
  getData(): Observable<any[]> {
    // Use the http client to make a GET request and return an Observable
    return this.http.get<any[]>(this.apiUrl);
  }
}
