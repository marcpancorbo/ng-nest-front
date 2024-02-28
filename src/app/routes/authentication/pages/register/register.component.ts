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

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [AutoDestroyService],
  imports: [ReactiveFormsModule, NzInputModule, NzButtonModule, NzFormModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  submitted$: Subject<void> = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly destroy$: AutoDestroyService
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
            this.form.get('email')?.value
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('User registered');
      });
  }
}
