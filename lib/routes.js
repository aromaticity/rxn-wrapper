"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RXNRoutes = /** @class */ (function () {
    function RXNRoutes(baseUrl) {
        this.apiUrl = new URL('api/api/v1/', baseUrl).href;
        this.predictionsUrl = new URL('predictions/', this.apiUrl).href;
        this.retrosynthesisUrl = new URL('retrosynthesis/', this.apiUrl).href;
    }
    Object.defineProperty(RXNRoutes.prototype, "reactionPrediction", {
        get: function () {
            return new URL('pr', this.predictionsUrl).href;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RXNRoutes.prototype, "retrosynthesisPrediction", {
        get: function () {
            return new URL('rs', this.retrosynthesisUrl).href;
        },
        enumerable: false,
        configurable: true
    });
    RXNRoutes.prototype.reactionPredictionResults = function (predictionId) {
        return new URL(predictionId, this.predictionsUrl).href;
    };
    RXNRoutes.prototype.retrosynthesisPredictionResults = function (predictionId) {
        return new URL(predictionId, this.retrosynthesisUrl).href;
    };
    Object.defineProperty(RXNRoutes.prototype, "project", {
        get: function () {
            return new URL('projects', this.apiUrl).href;
        },
        enumerable: false,
        configurable: true
    });
    return RXNRoutes;
}());
exports.default = RXNRoutes;
