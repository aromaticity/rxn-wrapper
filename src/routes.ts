class RXNRoutes {
    private apiUrl: string;
    private predictionsUrl: string;
    private retrosynthesisUrl: string;

    constructor(baseUrl: string) {
        this.apiUrl = new URL('api/api/v1/', baseUrl).href;
        this.predictionsUrl = new URL('predictions/', this.apiUrl).href;
        this.retrosynthesisUrl = new URL('retrosynthesis/', this.apiUrl).href;
    }

    get reactionPrediction() {
        return new URL('pr', this.predictionsUrl).href;
    }

    get retrosynthesisPrediction() {
        return new URL('rs', this.retrosynthesisUrl).href;
    }

    reactionPredictionResults(predictionId: string) {
        return new URL(predictionId, this.predictionsUrl).href;
    }

    retrosynthesisPredictionResults(predictionId: string) {
        return new URL(predictionId, this.retrosynthesisUrl).href;
    }

    get project() {
        return new URL('projects', this.apiUrl).href;
    }
}

export default RXNRoutes;