import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoadmapRoutingModule } from './roadmap-routing.module';
import { RoadmapComponent } from './roadmap.component';


@NgModule({
  declarations: [
    RoadmapComponent
  ],
  imports: [
    CommonModule,
    RoadmapRoutingModule
  ]
})
export class RoadmapModule { }
