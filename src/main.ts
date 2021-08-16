import { CreateProjectOptions, PredictReactionOptions, RXNWrapperOptions } from './common/types';
import RXNRoutes from './routes';
import axios from 'axios';

class RXNWrapper {
    private apiKey: string;
    private headers: any;
    private routes: RXNRoutes;
    public projectId?: string;

    constructor(options: RXNWrapperOptions) {
        this.apiKey = options.apiKey;
        if (options.projectId !== undefined) this.projectId = options.projectId;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.apiKey
        };
        this.routes = new RXNRoutes(options.baseUrl || 'https://rxn.res.ibm.com/rxn/');
    }

    set setProjectId(id: string) {
        this.projectId = id;
    }

    async createProject(options: CreateProjectOptions) {
        const res = await axios({
            method: 'POST',
            url: this.routes.project,
            headers: this.headers,
            data: { 
                name: options.name,
                invitations: options.invitations || []
            }
        });

        if (options.select) this.projectId = res.data.payload.id;
    }

    async listAllProjects() {
        const res = await axios({
            method: 'GET',
            url: this.routes.project,
            headers: this.headers
        });

        return res.data.payload.content;
    }

    async predictReaction(options: PredictReactionOptions, cb: Function) {
        if (this.projectId === undefined) return console.error('Project identifier has to be set first.');

        const res = await axios({
            method: 'POST',
            url: this.routes.reactionPrediction,
            headers: this.headers,
            data: {
                reactants: options.reactants,
                aiModel: options.aiModel || '2020-08-10'
            },
            params: {
                projectId: this.projectId
            }
        });

        return res.data.payload.id;
    }

    async getPredictReactionResults(predictionId: string) {
        const res = await axios({
            method: 'GET',
            url: this.routes.reactionPredictionResults(predictionId),
            headers: this.headers,
        });

        return res.data.payload.attempts[0].smiles;
    }
}

export default RXNWrapper;