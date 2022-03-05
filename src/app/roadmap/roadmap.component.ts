import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoadmapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
