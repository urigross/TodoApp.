import {ChangeDetectionStrategy, Component} from '@angular/core';

// yoava: main branch
// yoava: cmps, don't be cheap, components. readability means everything

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}
