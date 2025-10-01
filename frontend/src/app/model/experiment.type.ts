import { ExperimentVariant } from "./experimentVariant.type";

export type Experiment = {
    id: number;
    name: string;
    hypothesis: string;
    status: string;
    // variants: ExperimentVariant[];
}