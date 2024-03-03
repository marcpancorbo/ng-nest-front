import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { takeUntil } from 'rxjs';
import { AuthService } from '../services/common/auth.service';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NzButtonModule, RouterLink],
  providers: [AutoDestroyService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  $user = this.authService.$user;
  constructor(
    private readonly authService: AuthService,
    private readonly destroy$: AutoDestroyService,
    private readonly router: Router
  ) {}

  logout(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/']));
  }
}
