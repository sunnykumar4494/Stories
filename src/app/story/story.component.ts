import { Component ,Input } from '@angular/core';
import { DataService } from '../data.service';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
//storyId=37781709;
@Input() storyId = "";
storyurl="";
enable=false;
dataSource :any;

storyDetails:any;
  constructor(public _dataService: DataService) {
  
  }
  ngOnInit(){
    this.getStoriesdetails();
  }

  getStoriesdetails(){
    this._dataService.getstoriesdetails(this.storyId.toString()).subscribe(data=>{
      console.log(data);
      this.storyDetails=data;
      if(this.storyDetails.url){
        this.enable=true;
        this.storyurl=this.storyDetails.url;
      }
      console.log(new Date(this.storyDetails.Time));
      console.log(this.storyDetails);
    })
  }
}
