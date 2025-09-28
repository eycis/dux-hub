import { Routes } from '@angular/router';
import { ExperimentComponent } from './experiment/experiment.component';

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
            return import("./experiment/experiment.component").then((m)=> ExperimentComponent);
        },
    },
    {
        path: "feedback",
        pathMatch: "full",
        loadComponent : () => {
            return import("./feedback/feedback.component").then((m)=> m.FeedbackComponent);
        },
    },
    {
        path: "reports",
        pathMatch: "full",
        loadComponent : () => {
            return import("./report/report.component").then((m)=> m.ReportComponent);
        },
    },
    {
        path: "integrations",
        pathMatch: "full",
        loadComponent : () => {
            return import("./integrations/integrations.component").then((m)=> m.IntegrationsComponent);
        },
    },
    {
        path: "create-experiment",
        pathMatch: "full",
        loadComponent : () => {
            return import("./create-experiment/create-experiment.component").then((m)=> m.CreateExperimentComponent);
        },
    },
];
