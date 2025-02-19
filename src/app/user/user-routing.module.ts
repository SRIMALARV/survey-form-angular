import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { AvailableFormsComponent } from "./available-forms/available-forms.component";
import { FormComponent } from "./form/form.component";

const routes: Routes = [
    {
        path: '', component: UserDashboardComponent,
        children: [
            { path: '', redirectTo: 'available-forms', pathMatch: 'full' },
            { path: 'available-forms', component: AvailableFormsComponent },
            { path: 'form/:id', component: FormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRoutingModule { }