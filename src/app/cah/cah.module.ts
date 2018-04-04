import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from "./views/chat/chat.component";
import { GameWindowComponent } from "./views/game-window/game-window.component";
import { MainComponent } from "./views/main/main.component";
import { RoomsComponent } from "./views/rooms/rooms.component";
import { RoomsDialogComponent } from "./views/rooms-dialog/rooms-dialog.component";
import { DataTableModule } from "primeng/primeng";
import { MatSnackBarModule } from "@angular/material";
import { ButtonModule } from "primeng/button";
import { MatTabsModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from "primeng/dialog";
import { CahService } from "./shared_services/cah.service";
import { socketServiceProvider } from "../helpers/socket.service";
import { TableModule } from "primeng/table";
import { TranslationModule } from "../translate/translation.module";

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    TableModule,
    MatSnackBarModule,
    ButtonModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MessagesModule,
    DialogModule,
    TranslationModule
  ],
  declarations: [
    ChatComponent,
    GameWindowComponent,
    MainComponent,
    RoomsComponent,
    RoomsDialogComponent
  ],
  providers: [
    CahService,
    socketServiceProvider
  ]
})
export class CahModule { }
