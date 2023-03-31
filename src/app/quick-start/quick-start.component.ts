import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../shared/seo.service';
import { quickStartContent } from './quick-start-content';
import { quickStartSeo } from './quick-start-seo';

@Component({
    selector: 'app-quick-start',
    templateUrl: './quick-start.component.html',
    styleUrls: ['./quick-start.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickStartComponent implements OnInit {
    path = '';
    faAngleLeft = faAngleLeft;
    quickStartContent = quickStartContent;

    constructor(private _route: ActivatedRoute, private _seoService: SeoService) {}

    mapPathToKey(path: string) {
        const words = path.split('-');
        for (let i = 1; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1, words[i].length);
        }
        return words.join('');
    }

    ngOnInit() {
        this.path = this.mapPathToKey(this._route.snapshot.url[0].path);
        this._seoService.setSEO({ ...quickStartSeo[this.path], path: this._route.snapshot.url[0].path });
    }
}
