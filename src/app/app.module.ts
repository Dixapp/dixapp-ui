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
import { RoomsComponent } from './views/rooms/rooms.component';
import { ExpandableListModule } from 'angular2-expandable-list';
import { DixitComponent } from './dixio/views/dixit/dixit.component';
import { GrowlModule } from "primeng/growl";
import { MessageService } from "primeng/components/common/messageservice";
import { MessagesModule } from 'primeng/messages';

import { DataListModule } from 'primeng/datalist';
import { RoomsDialogComponent } from './views/rooms-dialog/rooms-dialog.component';
import { DialogModule } from "primeng/dialog";
import { DixioService } from "./dixio/shared_services/dixio.service";
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ChatComponent } from './views/chat/chat.component';
import { GameWindowComponent } from './dixio/views/game-window/game-window.component';
import { interceptorProvider } from "./helpers/token-interceptor";

import { HttpClientModule } from "@angular/common/http";
import { ImagesrcDirective } from './helpers/imagesrc.directive';


@NgModule({
  declarations: [
    AppComponent,
    BasicLayoutComponent,
    GamesPanelComponent,
    RoomsComponent,
    DixitComponent,
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
    HttpClientModule
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
