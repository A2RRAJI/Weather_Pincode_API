import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private formBuilder: FormBuilder) {}
  hide = true;

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

  
}