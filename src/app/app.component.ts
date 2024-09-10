import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { NotifierComponent } from "./component/notifier/notifier.component";
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotifierComponent, NotifierModule, SpinnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Monster Angular Admin Template';
}
