import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickStartRoutingModule } from './quick-start-routing.module';
import { QuickStartComponent } from './quick-start.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [QuickStartComponent],
    imports: [CommonModule, QuickStartRoutingModule, FontAwesomeModule]
})
export class QuickStartModule {}
