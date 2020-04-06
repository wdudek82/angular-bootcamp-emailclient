import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [InboxComponent, HomeComponent],
  imports: [CommonModule, InboxRoutingModule],
})
export class InboxModule {}
