import { GetSynthesisAnalysisReportPdfOptions } from './common/types';

class RXNRoutes {
    private apiUrl: string;
    private predictionsUrl: string;
    private retrosynthesisUrl: string;
    private synthesisUrl: string;

    public project: string;
    
    public paragraphToActions: string;

    public reactionPrediction: string;
    public reactionPredictionBatch: string;
    public retrosynthesisPrediction: string;
    public reactionPredictionResults: Function;
    public reactionPredictionBatchResults: Function;
    public retrosynthesisPredictionResults: Function;

    public synthesisCreationFromSequence: string;
    public synthesisStart: Function;
    public synthesisStatus: Function;
    public synthesisSpectrometerReport: Function;

    constructor(baseUrl: string) {
        this.apiUrl = new URL('api/api/v1/', baseUrl).href;
        this.predictionsUrl = new URL('predictions/', this.apiUrl).href;
        this.retrosynthesisUrl = new URL('retrosynthesis/', this.apiUrl).href;
        this.synthesisUrl = new URL('synthesis/', this.apiUrl).href;
        
        this.project = new URL('projects', this.apiUrl).href;
        
        this.paragraphToActions = new URL('paragraph-actions', this.apiUrl).href;

        this.reactionPrediction = new URL('pr/', this.predictionsUrl).href;
        this.reactionPredictionBatch = new URL('batch/', this.reactionPrediction).href;
        this.retrosynthesisPrediction = new URL('rs', this.retrosynthesisUrl).href;
        this.reactionPredictionResults = (predictionId: string) => new URL(predictionId, this.predictionsUrl).href;
        this.reactionPredictionBatchResults = (predictionId: string) => new URL(predictionId, this.reactionPredictionBatch).href;
        this.retrosynthesisPredictionResults = (predictionId: string) => new URL(predictionId, this.retrosynthesisUrl).href;
    
        this.synthesisCreationFromSequence = new URL('create-from-sequence', this.synthesisUrl).href; 
        this.synthesisStart = (synthesisId: string) => new URL(`${synthesisId}/start`, this.synthesisUrl).href;
        this.synthesisStatus = (synthesisId: string) => new URL(synthesisId, this.synthesisUrl).href;
        this.synthesisSpectrometerReport = ({ synthesisId, nodeId, actionIndex }: GetSynthesisAnalysisReportPdfOptions) => new URL(`${synthesisId}/node/${nodeId}/action/${actionIndex}/spectrometer-report`, this.synthesisUrl).href;
    }
}

export default RXNRoutes;