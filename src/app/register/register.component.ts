import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  weatherForm !: FormGroup;
  users: any;
  pin: string = "122002";
  url = "https://api.postalpincode.in/pincode/" + this.pin;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) {
    this.http.get(this.url).subscribe((data: any) => {
      console.warn("data", data);
      this.users = data[0].PostOffice[0].District;
    })
  }
  hide = true;
  public birthdate: Date | undefined;
  public age: number | undefined;


  profileForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    address: [''],
    dob: [''],
    gender: ['']
  });

  onSubmit() {
    console.log('form data is ', this.profileForm.value);
  }

  ngOnInit(): void {
    this.weatherForm = this.formBuilder.group({
      id: [],
      firstName: new FormControl([''], [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z].*')]),
      lastName: new FormControl([''], [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z].*')]),
      email: new FormControl([''], [Validators.required, Validators.email]),
      gender: new FormControl([''], [Validators.required]),
      dob: new FormControl([''], [Validators.required]),
      address1: new FormControl([''], [Validators.required, Validators.minLength(3)]),
      address2: new FormControl([''], [Validators.required, Validators.minLength(3)]),
      pincode: new FormControl([''], [Validators.required, Validators.pattern('[0-9]*')]),
      pno: new FormControl([''], [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    })
  }

  get FirstName(): FormControl {
    return this.weatherForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.weatherForm.get('lastName') as FormControl;
  }
  get Email(): FormControl {
    return this.weatherForm.get('email') as FormControl;
  }
  get Gender(): FormControl {
    return this.weatherForm.get('gender') as FormControl;
  }
  get Dob(): FormControl {
    return this.weatherForm.get('dob') as FormControl;
  }
  get Address1(): FormControl {
    return this.weatherForm.get('address1') as FormControl;
  }
  get Address2(): FormControl {
    return this.weatherForm.get('address2') as FormControl;
  }
  get Pincode(): FormControl {
    return this.weatherForm.get('pincode') as FormControl;
  }
  get Pno(): FormControl {
    return this.weatherForm.get('pno') as FormControl;
  }

  onClick() {
    if (this.weatherForm.valid) {
      this.api.postUser(this.weatherForm.value)
        .subscribe({
          next: (res) => {
            alert("User Added Successfully")
          },
          error: (err) => {
            alert("Error Occured")
          }
        })
      this.router.navigateByUrl('/display');
    }
  }



  public CalculateAge(): void {
    if (this.birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
  }


}