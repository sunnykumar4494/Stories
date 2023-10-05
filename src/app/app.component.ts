import { Component } from '@angular/core';
import { DataService } from './data.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stories:any=[];
  _currentPageData:any;
  options: string[] =[];
  //:any;
  filteredOptions:any;
  public FirstPage:number=1;
  SecondPage:number=2;
  ThirdPage:number=3;
  currentPage=1;
  myControl = new FormControl('');
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  constructor(public _dataService: DataService) {
    this.getStories();
  }
  pagination(pagenumer:any){
    console.log(pagenumer);
    this.currentPage=pagenumer;
    this.FirstPage=pagenumer;
    this.SecondPage=this.currentPage+1;
    this.ThirdPage=this.currentPage+2;
    this.clientsidepagination();
  }
  Previous(){
    if(this.FirstPage==1){
      return ;
    }
    this.FirstPage=this.FirstPage-1;
    this.SecondPage=this.SecondPage-1;
    this.ThirdPage=this.ThirdPage-1;
    this.currentPage=this.FirstPage;
    this.clientsidepagination();
  }

  clientsidepagination(){
    this._currentPageData=this.stories.slice(this.currentPage*10-10,this.currentPage*10);
    console.log(this._currentPageData);
  }
  Next(){
    this.FirstPage=this.FirstPage+1;
    this.SecondPage=this.SecondPage+1;
    this.ThirdPage=this.ThirdPage+1;
    this.currentPage=this.FirstPage;
    this.clientsidepagination();
  }
  getStories(){
    this._dataService.getnewstories().subscribe(data=>{
      console.log(data);
      this.stories=data;
      this.options=data.map(String);
      console.log('options');
      console.log(this.options);
      this._currentPageData=data.slice(0,10);
      console.log(this.stories);
    })
  }
  search(){
    let searchval=this.myControl.value;
    let _arr=[];
    if(searchval==''){
      this.getStories();
    }
    else{
      _arr.push(searchval);
      this._currentPageData=_arr;
    }
  }
}
