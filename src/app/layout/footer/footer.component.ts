import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faHome, faMap } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faAngular } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    faHome = faHome;
    faMap = faMap;
    faGithub = faGithub;
    faAngular = faAngular;

    constructor() {}
}
