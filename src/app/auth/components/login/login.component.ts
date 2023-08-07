import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginModelResponse, UserLogin } from '../../models/login-model';
import { Utils } from 'src/app/common/utils/utils';
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';
import { NavigatePageService } from 'src/app/core/services/navigate-page/navigate-page.service';
import { FullUserInfo, UserInfo } from 'src/app/common/models/data-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  admin: FullUserInfo = new FullUserInfo();
  role?: boolean ;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private routerRedirect: NavigatePageService
  ) {
    this.initialForm();
  }
  ngOnInit(): void {
    if(sessionStorage.getItem("admin_token")!=null){
      this.routerRedirect.navigateToPage('dashboard');
    }
  }

  public loginForm: FormGroup = new FormGroup({});
  public user!: LoginModelResponse;
  public utils!: Utils;
  public errorMessage: string = '';

  private initialForm(): void {
    this.loginForm = this.fb.group({
      mail: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public submitLoginForm(): void {
    const user: UserLogin = this.loginForm.value;
    this.authService.onLogin(user).subscribe({
      next: (res) => {
        if (res.meta.code !== '200') {

        } else {
          this.role = Buffer.from(res.data.token, 'base64')
          .toString('binary').toString().includes("ADMIN");
          if (
             this.role == false
          ){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          } else {

            this.mapData(res);
            sessionStorage.setItem(
              'profile',
              JSON.stringify(this.admin)
            );
            sessionStorage.setItem(
              'admin_token',
              JSON.stringify(res.data.token)
            );
            this.routerRedirect.navigateToPage('dashboard');
          }
        }
      },
      error: (err) => {

      },
    });
  }


  mapData(res : any) {
    this.admin.address = res.data.userEntity.address;
    this.admin.birthday = res.data.userEntity.birthday;
    this.admin.mail = res.data.userEntity.mail;
    this.admin.phone = res.data.userEntity.phone;
    this.admin.gender = res.data.userEntity.gender;
    this.admin.firstName = res.data.userEntity.firstName;
    this.admin.lastName = res.data.userEntity.lastName;
    this.admin.linkIg = res.data.userEntity.linkIg;
    this.admin.linkFacebook = res.data.userEntity.linkFacebook;
  }
}
