import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private path = "https://hacker-news.firebaseio.com/v0/";

  constructor(private _httpclient: HttpClient) {

  }

  getnewstories() {
    var _newstoryurl="newstories.json?print=pretty";
     return this._httpclient.get<any>(this.path+_newstoryurl);
  }
  getstoriesdetails(id:string) {
    //https://hacker-news.firebaseio.com/v0/item/37777092.json?print=pretty
    var _storydetailurl="item/"+id+".json?print=pretty";
     return this._httpclient.get<any>(this.path+_storydetailurl);
  }

}
