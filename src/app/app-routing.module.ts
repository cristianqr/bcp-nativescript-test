import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MoneyViewComponent, ExchangeViewComponent } from "./views";

const routes: Routes = [
    { path: "", redirectTo: "/exchange", pathMatch: "full" },
    { path: "exchange", component: ExchangeViewComponent },
    { path: "money", component: MoneyViewComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
