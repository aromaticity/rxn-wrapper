export type CreateProjectOptions = {
    name: string;
    invitations?: string[];
    select?: boolean;
}

export type RXNWrapperOptions = {
    apiKey: string;
    baseUrl?: string;
    projectId?: string;
};

export type PredictReactionOptions = {
    reactants: string;
    aiModel?: string;
};

export type PredictRetrosynthesisOptions = {
    product: string;
    availabilityPricingThreshold?: number;
    availableSmiles?: string;
    excludeSmiles?: string;
    excludeSubstructures?: string;
    excludeTargetMolecule?: boolean;
    fap?: number;
    maxSteps?: number;
    nbeams?: number;
    pruningSteps?: number;
    aiModel?: string;
}