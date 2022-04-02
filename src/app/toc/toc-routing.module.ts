import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TocComponent} from './toc.component';

const routes: Routes = [
  {path: '', component: TocComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TocRoutingModule { }
