import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule, MatSidenavModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatProgressBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    CommonModule,
    FlexLayoutModule],
  exports: [MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule],
  declarations: []
})
export class CustomMaterialModule { }
