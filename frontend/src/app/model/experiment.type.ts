export type Experiment = {
    userId: number;
    variants: string;
    name: string;
    hypothesis: string;
    status: string;
    objectiveMetric: string;
}