import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/api-services/common/security.service';
import { SpinnerService } from 'src/app/api-services/common/spinner.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  isSubmitted :  boolean = false
  constructor(
    private formBuilder  :  FormBuilder,
    private route : Router,
    private apiServices :  SmartapiService,
    private spinner :SpinnerService
    ){}

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName  : [null,[Validators.required,Validators.maxLength(120)]],
      userPassword  : [null,[Validators.required,Validators.minLength(8),Validators.maxLength(15)]]
    })
  }

  get loginFormControls(){
    return this.loginForm.controls
  }

  onLogin(){
    this.isSubmitted =  true
    if(this.loginForm.valid){
      this.route.navigate(['/home']);
        // this.apiServices.smartPost('users',this.loginForm.getRawValue(),true).subscribe((data)=>{
          
        // })
    }
  }

}
