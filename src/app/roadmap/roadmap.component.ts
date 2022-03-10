import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {SeoService} from '../service/seo.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoadmapComponent implements OnInit {

  constructor(private _seoService: SeoService) { }

  ngOnInit(): void {
    this._seoService.setSEO({
      title: 'Roadmap',
      description: 'The roadmap of ng4eb - this book will continue to grow',
      keywords: 'Angular, resources, free, online, roadmap, ng4eb',
      path: '/roadmap'
    })
  }

}
