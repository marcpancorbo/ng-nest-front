import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../../../core/services/common/auth.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserRole, UserRolesValues } from '../../../../core/enums/user-roles';
import { KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [AutoDestroyService],
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    KeyValuePipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: [UserRole.Reviewer],
  });
  submitted$: Subject<void> = new Subject<void>();
  userRoles = UserRolesValues;

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
        tap(() => {
          Object.values(this.form.controls).forEach((control) => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }),
        filter(() => this.form.valid),
        exhaustMap(() =>
          this.authService.register(
            this.form.get('username')?.value,
            this.form.get('password')?.value,
            this.form.get('email')?.value,
            this.form.get('role')?.value
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.router.navigate(['/auth/login']);
      });
  }
}
