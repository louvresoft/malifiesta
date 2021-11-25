import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/user/login/login.component';
//import { ProfileComponent } from './app/modulos/user/profile/profile.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { FilterListPipe } from './shared/pipes/filter-list.pipe';
import { MoneyConversionPipe } from './shared/pipes/money-conversion.pipe';
import { PricingConversionPipe } from './shared/pipes/pricing-conversion.pipe';

@NgModule({
  declarations: [
    AppComponent,
    //AccountComponent,
    HeaderComponent,
    PageNotFoundComponent,
    TopbarComponent,
    DashboardComponent,
    LoginComponent,
    //ProfileComponent,
    GetstartedComponent,
    LoadingScreenComponent,
    FilterListPipe,
    MoneyConversionPipe,
    PricingConversionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
