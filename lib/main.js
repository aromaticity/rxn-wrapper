"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = __importDefault(require("./routes"));
var axios_1 = __importDefault(require("axios"));
var html_parser_1 = require("./common/html-parser");
var defaultValues = {
    baseUrl: 'https://rxn.res.ibm.com/rxn/',
    aiModel: '2020-08-10'
};
var RXNWrapper = /** @class */ (function () {
    function RXNWrapper(options) {
        this.apiKey = options.apiKey;
        if (options.projectId !== undefined)
            this.projectId = options.projectId;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.apiKey
        };
        this.routes = new routes_1.default(options.baseUrl || defaultValues.baseUrl);
    }
    Object.defineProperty(RXNWrapper.prototype, "setProjectId", {
        set: function (id) {
            this.projectId = id;
        },
        enumerable: false,
        configurable: true
    });
    RXNWrapper.prototype.createProject = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: 'POST',
                            url: this.routes.project,
                            headers: this.headers,
                            data: {
                                name: options.name,
                                invitations: options.invitations || []
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        if (options.select)
                            this.projectId = res.data.payload.id;
                        return [2 /*return*/, res.data.payload.id];
                }
            });
        });
    };
    RXNWrapper.prototype.createSynthesisFromSequence = function (sequenceId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.projectId === undefined)
                            return [2 /*return*/, console.error('Project identifier has to be set first.')];
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: '',
                                headers: this.headers,
                                data: { sequenceId: sequenceId }
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.synthesis_id];
                }
            });
        });
    };
    RXNWrapper.prototype.listAllProjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: 'GET',
                            url: this.routes.project,
                            headers: this.headers
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.payload.content];
                }
            });
        });
    };
    RXNWrapper.prototype.paragraphToActions = function (paragraph) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: 'POST',
                            url: this.routes.paragraphToActions,
                            headers: this.headers,
                            data: {
                                paragraph: paragraph.join(' ')
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, html_parser_1.parseActions(res.data.payload.actionSequence)];
                }
            });
        });
    };
    RXNWrapper.prototype.predictReaction = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.projectId === undefined)
                            return [2 /*return*/, console.error('Project identifier has to be set first.')];
                        return [4 /*yield*/, axios_1.default({
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
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.payload.id];
                }
            });
        });
    };
    RXNWrapper.prototype.predictReactionBatch = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: 'POST',
                            url: this.routes.reactionPredictionBatch,
                            headers: this.headers,
                            data: {
                                reactants: options.reactants,
                                aiModel: options.aiModel || defaultValues.aiModel
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, {
                                taskId: res.data.payload.task_id,
                                taskStatus: res.data.payload.task_status
                            }];
                }
            });
        });
    };
    RXNWrapper.prototype.predictRetrosynthesis = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.projectId === undefined)
                            return [2 /*return*/, console.error('Project identifier has to be set first.')];
                        return [4 /*yield*/, axios_1.default({
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
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.payload.id];
                }
            });
        });
    };
    RXNWrapper.prototype.getPredictReactionResults = function (predictionId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: 'GET',
                            url: this.routes.reactionPredictionResults(predictionId),
                            headers: this.headers
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.payload.attempts[0].smiles];
                }
            });
        });
    };
    RXNWrapper.prototype.getPredictReactionBatchResults = function (predictionId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: 'GET',
                            url: this.routes.reactionPredictionBatchResults(predictionId),
                            headers: this.headers
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, {
                                result: res.data.payload.result,
                                task: res.data.payload.task
                            }];
                }
            });
        });
    };
    RXNWrapper.prototype.getPredictRetrosynthesisResults = function (predictionId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: 'GET',
                            url: this.routes.retrosynthesisPredictionResults(predictionId),
                            headers: this.headers
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.payload];
                }
            });
        });
    };
    RXNWrapper.prototype.getSynthesisPlan = function (synthesisId) {
        return __awaiter(this, void 0, void 0, function () {
            var tree, orderedTreeNodes, keysToKeep, flattenedActions, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSynthesisStatus(synthesisId)];
                    case 1:
                        tree = _a.sent();
                        orderedTreeNodes = this.postOrderTreeTraversal(tree);
                        keysToKeep = ['id', 'smiles', 'actions', 'children'];
                        flattenedActions = [];
                        for (node in orderedTreeNodes) {
                            // TO DO
                        }
                        return [2 /*return*/, { tree: tree, orderedTreeNodes: orderedTreeNodes, flattenedActions: flattenedActions }];
                }
            });
        });
    };
    RXNWrapper.prototype.getSynthesisStatus = function (synthesisId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: 'GET',
                            url: this.routes.synthesisStatus(synthesisId),
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.payload.sequences[0].tree];
                }
            });
        });
    };
    RXNWrapper.prototype.postOrderTreeTraversal = function (tree) {
        var result = [];
        if ('children' in tree) {
            // TO DO
        }
    };
    return RXNWrapper;
}());
exports.default = RXNWrapper;
