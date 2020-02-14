import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisChatsPage } from './mis-chats.page';

const routes: Routes = [
  {
    path: '',
    component: MisChatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisChatsPageRoutingModule {}
