import { ExperimentVariantDto } from "./experimentVariantDto.type";

export type ExperimentDto = {
    name: string;
    hypothesis: string;
    variants: ExperimentVariantDto[];
}