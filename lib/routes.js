"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RXNRoutes = /** @class */ (function () {
    function RXNRoutes(baseUrl) {
        var _this = this;
        this.apiUrl = new URL('api/api/v1/', baseUrl).href;
        this.predictionsUrl = new URL('predictions/', this.apiUrl).href;
        this.retrosynthesisUrl = new URL('retrosynthesis/', this.apiUrl).href;
        this.synthesisUrl = new URL('synthesis/', this.apiUrl).href;
        this.project = new URL('projects', this.apiUrl).href;
        this.paragraphToActions = new URL('paragraph-actions', this.apiUrl).href;
        this.reactionPrediction = new URL('pr/', this.predictionsUrl).href;
        this.reactionPredictionBatch = new URL('batch/', this.reactionPrediction).href;
        this.retrosynthesisPrediction = new URL('rs', this.retrosynthesisUrl).href;
        this.reactionPredictionResults = function (predictionId) { return new URL(predictionId, _this.predictionsUrl).href; };
        this.reactionPredictionBatchResults = function (predictionId) { return new URL(predictionId, _this.reactionPredictionBatch).href; };
        this.retrosynthesisPredictionResults = function (predictionId) { return new URL(predictionId, _this.retrosynthesisUrl).href; };
        this.synthesisCreationFromSequence = new URL('create-from-sequence', this.synthesisUrl).href;
        this.synthesisStart = function (synthesisId) { return new URL(synthesisId + "/start", _this.synthesisUrl).href; };
        this.synthesisStatus = function (synthesisId) { return new URL(synthesisId, _this.synthesisUrl).href; };
        this.synthesisSpectrometerReport = function (_a) {
            var synthesisId = _a.synthesisId, nodeId = _a.nodeId, actionIndex = _a.actionIndex;
            return new URL(synthesisId + "/node/" + nodeId + "/action/" + actionIndex + "/spectrometer-report", _this.synthesisUrl).href;
        };
    }
    return RXNRoutes;
}());
exports.default = RXNRoutes;
