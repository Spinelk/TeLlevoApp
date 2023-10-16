import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/models/apiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http:HttpClient) { }


  async getAvatar(){
    const apiUrl = "https://rickandmortyapi.com/api/character";
    const req = await lastValueFrom(this.http.get<ApiResponse>(apiUrl));
    return req;
  }
}
