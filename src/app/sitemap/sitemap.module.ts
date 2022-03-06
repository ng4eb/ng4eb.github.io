import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitemapRoutingModule } from './sitemap-routing.module';
import { SitemapComponent } from './sitemap.component';


@NgModule({
  declarations: [
    SitemapComponent
  ],
  imports: [
    CommonModule,
    SitemapRoutingModule
  ]
})
export class SitemapModule { }
