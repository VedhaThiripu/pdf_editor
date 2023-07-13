import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css']
})
export class TopheaderComponent implements OnInit {

  logoImage:any;
  title:any;
  constructor(
    private route : Router,
    private api: SmartapiService,
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  onLogOut(){
    this.route.navigate(['/login'])
  }

  getDetails(){
    this.api.smartGet('GET_DETAILS').subscribe((res: any) => {
        console.log(res);
        // this.logoImage=res.site_logo;
        this.title=res.site_title
        this.logoImage='./assets/images/' + res.site_logo 
        
    });
  }

}
