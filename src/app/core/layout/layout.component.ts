import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  $user = this.authService.$user;
  constructor(private readonly authService: AuthService) {}
}
