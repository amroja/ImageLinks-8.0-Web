import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BrandingComponent } from 'src/app/layouts/full/vertical/sidebar/branding.component';
import { MaterialModule } from 'src/app/material.module';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrandingComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.router.navigate(['/dashboards/dashboard1']);
  }
}
