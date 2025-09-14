import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadComponent : () => {
            return import("./home/home.component").then((m)=> m.HomeComponent);
        },
    },
    {
        path: "experiments",
        pathMatch: "full",
        loadComponent : () => {
            return import("./home/home.component").then((m)=> m.HomeComponent);
        },
    },
    {
        path: "feedback",
        pathMatch: "full",
        loadComponent : () => {
            return import("./home/home.component").then((m)=> m.HomeComponent);
        },
    },
    {
        path: "reports",
        pathMatch: "full",
        loadComponent : () => {
            return import("./home/home.component").then((m)=> m.HomeComponent);
        },
    },
    {
        path: "integration",
        pathMatch: "full",
        loadComponent : () => {
            return import("./home/home.component").then((m)=> m.HomeComponent);
        },
    },
];
