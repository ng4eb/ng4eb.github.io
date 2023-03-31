import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickStartComponent } from './quick-start.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'new-to-angular',
        pathMatch: 'full',
        component: QuickStartComponent
    },
    {
        path: 'why-this-book',
        pathMatch: 'full',
        component: QuickStartComponent
    },
    {
        path: 'resources',
        pathMatch: 'full',
        component: QuickStartComponent
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuickStartRoutingModule {}
