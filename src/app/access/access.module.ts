import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AccessRoutingModule } from "./access-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserService } from "./user.service";
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from "primeng/growl";
import { AuthGuard } from "./auth.guard";
import { TranslationModule } from "../translate/translation.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccessRoutingModule,
    GrowlModule,
    TranslationModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    UserService,
    MessageService,
    AuthGuard
  ]

})
export class AccessModule { }
