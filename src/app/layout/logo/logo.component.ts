import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.svg',
    styleUrls: ['./logo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
    @Input() width = '35px';
    constructor() {}
}
