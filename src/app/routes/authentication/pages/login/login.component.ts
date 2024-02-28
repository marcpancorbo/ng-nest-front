import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, exhaustMap, filter, switchMap, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { AuthService } from '../../../../core/services/common/auth.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AutoDestroyService],
  imports: [ReactiveFormsModule, NzInputModule, NzButtonModule, NzFormModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  submitted$: Subject<void> = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly destroy$: AutoDestroyService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToSubmit();
  }

  subscribeToSubmit(): void {
    this.submitted$
      .pipe(
        filter(() => this.form.valid),
        exhaustMap(() =>
          this.authService.login(
            this.form.get('username')?.value,
            this.form.get('password')?.value
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(({ access_token }) => {
        const user: User = jwtDecode(access_token);
        user.access_token = access_token;
        sessionStorage.setItem('user', JSON.stringify(user));
        this.authService.setUser(user);
        this.router.navigate(['/']);
      });
  }
}
