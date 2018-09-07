import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainContentComponent } from './layout/main-content/main-content.component';
import { MainToolbarComponent } from './layout/main-toolbar/main-toolbar.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItUpComponent } from './add-it-up/add-it-up.component';
import { CustomMaterialModule } from './custom-material.module';
import { QuestionComponent } from './add-it-up/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    MainToolbarComponent,
    SideNavComponent,
    DashboardComponent,
    AddItUpComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataService],
  entryComponents: [AddItUpComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
