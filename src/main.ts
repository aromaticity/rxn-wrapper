import { CreateProjectOptions, PredictReactionOptions, PredictReactionBatchOptions, PredictRetrosynthesisOptions, RXNWrapperOptions } from './common/types';
import RXNRoutes from './routes';
import axios from 'axios';
import { parseActions } from './common/html-parser';

const defaultValues = {
    baseUrl: 'https://rxn.res.ibm.com/rxn/',
    aiModel: '2020-08-10'
}
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
        this.routes = new RXNRoutes(options.baseUrl || defaultValues.baseUrl);
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
        
        return res.data.payload.id;
    }

    async createSynthesisFromSequence(sequenceId: string) {
        if (this.projectId === undefined) return console.error('Project identifier has to be set first.');

        const res = await axios({
            method: 'POST',
            url: '',
            headers: this.headers,
            data: { sequenceId }
        });

        return res.data.synthesis_id;
    }

    async listAllProjects() {
        const res = await axios({
            method: 'GET',
            url: this.routes.project,
            headers: this.headers
        });

        return res.data.payload.content;
    }

    async paragraphToActions(paragraph: string[]) {
        const res = await axios({
            method: 'POST',
            url: this.routes.paragraphToActions,
            headers: this.headers,
            data: { 
                paragraph: paragraph.join(' ')
            }
        });

        return parseActions(res.data.payload.actionSequence);
    }

    async predictReaction(options: PredictReactionOptions) {
        if (this.projectId === undefined) return console.error('Project identifier has to be set first.');

        const res = await axios({
            method: 'POST',
            url: this.routes.reactionPrediction,
            headers: this.headers,
            data: {
                reactants: options.reactants,
                aiModel: options.aiModel || defaultValues.aiModel
            },
            params: {
                projectId: this.projectId
            }
        });

        return res.data.payload.id;
    }

    async predictReactionBatch(options: PredictReactionBatchOptions) {
        const res = await axios({
            method: 'POST',
            url: this.routes.reactionPredictionBatch,
            headers: this.headers,
            data: {
                reactants: options.reactants,
                aiModel: options.aiModel || defaultValues.aiModel
            }
        });

        return {
            taskId: res.data.payload.task_id,
            taskStatus: res.data.payload.task_status
        };
    }

    async predictRetrosynthesis (options: PredictRetrosynthesisOptions) {
        if (this.projectId === undefined) return console.error('Project identifier has to be set first.');

        const res = await axios({
            method: 'POST',
            url: this.routes.retrosynthesisPrediction,
            headers: this.headers,
            data: {
                aiModel: options.aiModel || defaultValues.aiModel,
                isinteractive: false,
                product: options.product,
                parameters: {
                    'availability_pricing_threshold': options.availabilityPricingThreshold || 0,
                    'available_smiles': options.availableSmiles || null,
                    'exclude_smiles': options.excludeSmiles || null,
                    'exclude_substructures': options.excludeSubstructures || null,
                    'exclude_target_molecule': options.excludeTargetMolecule || true,
                    'fap': options.fap || 0.6,
                    'max_steps': options.maxSteps || 3,
                    'nbeams': options.nbeams || 10,
                    'pruning_steps': options.pruningSteps || 2
                }
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
            headers: this.headers
        });

        return res.data.payload.attempts[0].smiles;
    }

    async getPredictReactionBatchResults(predictionId: string) {
        const res = await axios({
            method: 'GET',
            url: this.routes.reactionPredictionBatchResults(predictionId),
            headers: this.headers
        });

        return {
            result: res.data.payload.result,
            task: res.data.payload.task
        };
    }

    async getPredictRetrosynthesisResults(predictionId: string) {
        const res = await axios({
            method: 'GET',
            url: this.routes.retrosynthesisPredictionResults(predictionId),
            headers: this.headers
        });

        return res.data.payload;
    }

    async getSynthesisPlan(synthesisId: string) {
        const tree = await this.getSynthesisStatus(synthesisId);

        let orderedTreeNodes: any = this.postOrderTreeTraversal(tree); 

        let keysToKeep = ['id', 'smiles', 'actions', 'children'];
        
        let flattenedActions: any[] = [];

        for (let node in orderedTreeNodes) {
            // TO DO
        }

        return { tree, orderedTreeNodes, flattenedActions };
    }

    private async getSynthesisStatus(synthesisId: string) {
        const res = await axios({
            method: 'GET',
            url: this.routes.synthesisStatus(synthesisId),
        });

        return res.data.payload.sequences[0].tree;
    }

    private postOrderTreeTraversal(tree: any) {
        let result: any[] = [];

        if ('children' in tree) {
            // TO DO
        }
    }
}

export default RXNWrapper;