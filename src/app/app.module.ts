import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { AccessModule } from "./access/access.module";
import { GamesPanelComponent } from './views/games-panel/games-panel.component';
import { CardModule } from 'primeng/card';
import { SocketIoModule } from 'ng-socket-io';
import { socketServiceProvider } from "./helpers/socket.service";
import { GrowlModule } from "primeng/growl";
import { MessageService } from "primeng/components/common/messageservice";
import { MessagesModule } from 'primeng/messages';

import { interceptorProvider } from "./helpers/token-interceptor";

import { HttpClientModule } from "@angular/common/http";
import { ImagesrcDirective } from './helpers/imagesrc.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslationModule } from "./translate/translation.module";
import { CahModule } from "./cah/cah.module";


@NgModule({
  declarations: [
    AppComponent,
    BasicLayoutComponent,
    GamesPanelComponent,
    ImagesrcDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AccessModule,
    CardModule,
    SocketIoModule,
    BrowserAnimationsModule,
    GrowlModule,
    MessagesModule,
    HttpClientModule,
    MatSnackBarModule,
    TranslationModule,
    CahModule
  ],
  providers: [
    socketServiceProvider,
    MessageService,
    interceptorProvider,
    ImagesrcDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
