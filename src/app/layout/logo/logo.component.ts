import {
  Component,
  OnInit,
  ChangeDetectionStrategy, Input,
} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.svg',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent implements OnInit {
  @Input() width = '35px';
  constructor() { }

  ngOnInit(): void {
  }

}
