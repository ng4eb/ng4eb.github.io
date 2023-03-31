import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/layout.service';
import { SeoService } from '../shared/seo.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    isDarkTheme$ = this._layoutService.getIsDarkTheme$();

    constructor(private _layoutService: LayoutService, private _seoService: SeoService) {}

    ngOnInit() {
        this._seoService.setSEO({
            title: 'Angular for Everybody',
            description: 'A free, online, keep-it-simple-stupid eBook that explains Angular concepts in simple English.',
            keywords: 'Angular, eBook, free, online, concepts, simple English, open-source',
            path: ''
        });
    }
}
