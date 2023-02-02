import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
    { path: '', component: RegisterComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'display', component: DisplayComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [RegisterComponent, DisplayComponent]