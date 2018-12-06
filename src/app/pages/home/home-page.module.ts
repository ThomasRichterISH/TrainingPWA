import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CMSModule } from '../../cms/cms.module';
import { SharedModule } from '../../shared/shared.module';

import { HomePageComponent } from './components/home-page/home-page.component';
import { HomePageContainerComponent } from './home-page.container';

const homePageRoutes: Routes = [
  { path: '', component: HomePageContainerComponent, data: { wrapperClass: 'homepage' } },
];

@NgModule({
  imports: [CMSModule, RouterModule.forChild(homePageRoutes), SharedModule],
  declarations: [HomePageComponent, HomePageContainerComponent],
})
export class HomePageModule {}
