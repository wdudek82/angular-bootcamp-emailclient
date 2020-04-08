import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { HomeComponent } from './home/home.component';
import { EmailCreateComponent } from './email-create/email-create.component';
import { EmailReplyComponent } from './email-reply/email-reply.component';
import { EmailIndexComponent } from './email-index/email-index.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

@NgModule({
  declarations: [
    InboxComponent,
    HomeComponent,
    EmailCreateComponent,
    EmailReplyComponent,
    EmailIndexComponent,
    EmailShowComponent,
    PlaceholderComponent,
  ],
  imports: [CommonModule, InboxRoutingModule],
  exports: [
    EmailIndexComponent,
  ],
})
export class InboxModule {}
