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