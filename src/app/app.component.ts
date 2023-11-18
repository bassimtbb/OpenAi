import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions =[
    {route:"/home",title:"Home","icon":"house"  },
    {route:"/gpt",title:"GPT","icon":"person"  }
  ]
  currentAction: any;
  constructor(private router :Router){
  }
  handleRoute(action:any){
    this.currentAction=action;
    this.router.navigateByUrl(action.route);

  }
  title = 'OpenAi';
}
