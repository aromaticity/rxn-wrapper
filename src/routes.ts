class RXNRoutes {
    private apiUrl: string;
    private predictionsUrl: string;

    constructor(baseUrl: string) {
        this.apiUrl = new URL('api/api/v1/', baseUrl).href;
        this.predictionsUrl = new URL('predictions/', this.apiUrl).href;
    }

    get reactionPrediction() {
        return new URL('pr', this.predictionsUrl).href;
    }

    reactionPredictionResults(predictionId: string) {
        return new URL(predictionId, this.predictionsUrl).href;
    }

    get project() {
        return new URL('projects', this.apiUrl).href;
    }
}

export default RXNRoutes;