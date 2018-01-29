import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { IncomesPage } from '../pages/incomes/incomes';
import { ExpensesPage } from '../pages/expenses/expenses';
import { CreatePage } from '../pages/create/create';
import { ShowPage } from '../pages/show/show';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MessageServiceProvider } from '../providers/message-service/message-service';
import { MovementsServiceProvider } from '../providers/movements-service/movements-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MainPage,
    IncomesPage,
    ExpensesPage,
    CreatePage,
    ShowPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainPage,
    IncomesPage,
    ExpensesPage,
    CreatePage,
    ShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    MessageServiceProvider,
    MovementsServiceProvider
  ]
})
export class AppModule {}
