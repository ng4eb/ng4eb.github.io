import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitemapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
