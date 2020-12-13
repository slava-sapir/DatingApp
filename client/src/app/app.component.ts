import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;
  appUrl = 'https://localhost:5001/api/users'

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.http.get(this.appUrl).subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }
}
