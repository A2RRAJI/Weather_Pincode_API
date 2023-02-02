import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RegisterComponent } from '../register/register.component';
import { OnInit } from '@angular/core';
import { WeatherData } from '../models/weather.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit{
  city: string = "";
  pin: string = "";
  url = "";
  fname: any;
  lname: any;
  email: any;
  gender: any;
  dob: any;
  age: any;
  pno: any;
  state: any;

  weatherData?: WeatherData;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.getUser();
  }

  onWeatherSubmit(city: string){
    this.api.getWeatherData(city)
    .subscribe({
      next: (res) =>{
        this.weatherData=res;
        console.log(res);
      }
    })
  }

  onGetData(url2: string){
    this.http.get(url2).subscribe((data: any) => {
      console.warn("data",data);
      this.state = data[0].PostOffice[0].State;
      this.city = data[0].PostOffice[0].District;
      let city1 = {"name": data[0].PostOffice[0].District};
      this.onWeatherSubmit(city1.name);
    })
  }
  
  getUser(){
    let url1 = {"url": this.url};
    
    this.api.getUser().subscribe({next:(res)=>{
        console.log(res);
        this.fname = res.at(-1).firstName;
        this.lname = res.at(-1).lastName;
        this.email = res.at(-1).email;
        this.gender = res.at(-1).gender;
        if(this.gender == 1){
          this.gender = "Male"
        }
        else{
          this.gender = "Female"
        }
        this.dob = res.at(-1).dob;
        var year = this.dob.slice(0,4);
        this.age = 2023 - year;
        console.log("THIS IS DOB - ",this.dob);
        this.pno = res.at(-1).pno;
        url1 = {"url": "https://api.postalpincode.in/pincode/"+(res.at(-1).pincode)};
        this.onGetData(url1.url);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    

    
    
    
    
  }
  
  

    // this.pin = "560029";
    // this.url = "https://api.postalpincode.in/pincode/"+this.pin;
    
  
}
