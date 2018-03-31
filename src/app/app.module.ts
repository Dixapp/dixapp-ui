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

import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { socketServiceProvider } from "./helpers/socket.service";
import { RoomsComponent } from './cah/views/rooms/rooms.component';
import { ExpandableListModule } from 'angular2-expandable-list';
import { MainComponent } from './cah/views/main/main.component';
import { GrowlModule } from "primeng/growl";
import { MessageService } from "primeng/components/common/messageservice";
import { MessagesModule } from 'primeng/messages';

import { DataListModule } from 'primeng/datalist';
import { RoomsDialogComponent } from './cah/views/rooms-dialog/rooms-dialog.component';
import { DialogModule } from "primeng/dialog";
import { DixioService } from "./cah/shared_services/dixio.service";
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ChatComponent } from './cah/views/chat/chat.component';
import { GameWindowComponent } from './cah/views/game-window/game-window.component';
import { interceptorProvider } from "./helpers/token-interceptor";

import { HttpClientModule } from "@angular/common/http";
import { ImagesrcDirective } from './helpers/imagesrc.directive';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslationModule } from "./translate/translation.module";
import { DataTableModule } from 'primeng/datatable';



@NgModule({
  declarations: [
    AppComponent,
    BasicLayoutComponent,
    GamesPanelComponent,
    RoomsComponent,
    MainComponent,
    RoomsDialogComponent,
    ChatComponent,
    GameWindowComponent,
    ImagesrcDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AccessModule,
    CardModule,
    ButtonModule,
    SocketIoModule,
    BrowserAnimationsModule,
    ExpandableListModule,
    GrowlModule,
    DataListModule,
    DialogModule,
    TabViewModule,
    MatTabsModule,
    MatInputModule,
    MatDividerModule,
    MessagesModule,
    HttpClientModule,
    MatSidenavModule,
    MatSnackBarModule,
    TranslationModule,
    DataTableModule
  ],
  providers: [
    socketServiceProvider,
    MessageService,
    DixioService,
    interceptorProvider,
    ImagesrcDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
