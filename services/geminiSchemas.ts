
import { Type } from "@google/genai";

// --- CORE ANALYSIS SCHEMAS ---

export const analysisResultSchema = {
    type: Type.OBJECT,
    properties: {
        sharedProfile: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                demographics: {
                    type: Type.OBJECT,
                    properties: {
                        ageRange: { type: Type.STRING },
                        incomeLevel: { type: Type.STRING },
                        commonLocations: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                },
                commonIndustries: { type: Type.ARRAY, items: { type: Type.STRING } },
                commonJobFunctions: { type: Type.ARRAY, items: { type: Type.STRING } },
                commonCompanySizes: { type: Type.ARRAY, items: { type: Type.STRING } },
                psychographics: {
                    type: Type.OBJECT,
                    properties: {
                        motivations: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { driver: { type: Type.STRING }, description: { type: Type.STRING }, purchasingImplication: { type: Type.STRING } }
                            }
                        },
                        dataSignals: { type: Type.ARRAY, items: { type: Type.STRING } },
                        buyingTriggers: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { trigger: { type: Type.STRING }, implication: { type: Type.STRING } }
                            }
                        }
                    }
                },
                quantitativeModel: {
                    type: Type.OBJECT,
                    properties: { decisionScoreFormula: { type: Type.STRING } }
                }
            }
        },
        lookalikeProspects: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    fullName: { type: Type.STRING },
                    jobTitle: { type: Type.STRING },
                    companyName: { type: Type.STRING },
                    linkedinSearchQuery: { type: Type.STRING },
                    googleDorkQuery: { type: Type.STRING },
                    rationale: { type: Type.STRING }
                }
            }
        }
    }
};

export const scoredProspectsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            prospectInfo: { type: Type.STRING },
            fitScore: { type: Type.NUMBER },
            rationale: { type: Type.STRING }
        }
    }
};

export const opportunityBriefSchema = {
    type: Type.OBJECT,
    properties: {
        starvingCrowd: {
            type: Type.OBJECT,
            properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }
        },
        aspirinProblem: {
            type: Type.OBJECT,
            properties: { problem: { type: Type.STRING } }
        },
        gauntletVerdict: {
            type: Type.OBJECT,
            properties: { 
                passes: { type: Type.BOOLEAN }, 
                summary: { type: Type.STRING },
                checklist: {
                    type: Type.OBJECT,
                    properties: {
                        isAspirin: { type: Type.BOOLEAN },
                        isStarvingCrowd: { type: Type.BOOLEAN },
                        isBigEnough: { type: Type.BOOLEAN },
                        isReachable: { type: Type.BOOLEAN },
                        isUrgent: { type: Type.BOOLEAN },
                        canSellHighPrice: { type: Type.BOOLEAN },
                        hasBackEnd: { type: Type.BOOLEAN },
                        isTollbooth: { type: Type.BOOLEAN },
                        isUnique: { type: Type.BOOLEAN },
                        isGrowing: { type: Type.BOOLEAN }
                    }
                }
            }
        },
        marketSizeEstimate: { type: Type.STRING },
        urgencyLevel: { type: Type.STRING },
        quantitativeModel: {
            type: Type.OBJECT,
            properties: {
                decisionScoreFormula: { type: Type.STRING },
                variableDefinitions: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { variable: { type: Type.STRING }, definition: { type: Type.STRING } }
                    } 
                }
            }
        },
        aiPoweredSolution: {
            type: Type.OBJECT,
            properties: {
                solutionName: { type: Type.STRING },
                description: { type: Type.STRING },
                irresistibleOffer: { type: Type.STRING },
                resultsInAdvanceMechanism: {
                    type: Type.OBJECT,
                    properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }
                },
                aiAutomationProtocol: {
                    type: Type.OBJECT,
                    properties: { protocol: { type: Type.STRING }, rationale: { type: Type.STRING } }
                },
                salesPitchAsset: {
                    type: Type.OBJECT,
                    properties: { pitchPersona: { type: Type.STRING }, pitchScript: { type: Type.STRING }, videoScenePrompt: { type: Type.STRING } }
                }
            }
        },
        fastestPathToCash: {
            type: Type.OBJECT,
            properties: { channel: { type: Type.STRING }, rationale: { type: Type.STRING } }
        },
        mentalModelApplicable: {
            type: Type.OBJECT,
            properties: { model: { type: Type.STRING }, rationale: { type: Type.STRING } }
        },
        asymmetricJVProtocol: {
            type: Type.OBJECT,
            properties: { idealPartnerProfile: { type: Type.STRING }, valueProposition: { type: Type.STRING }, outreachAngle: { type: Type.STRING } }
        },
        businessInABoxAngle: {
            type: Type.OBJECT,
            properties: { opportunityName: { type: Type.STRING }, targetBuyer: { type: Type.STRING }, salesPitch: { type: Type.STRING } }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const aiVentureBlueprintSchema = {
    type: Type.OBJECT,
    properties: {
        dataFeasibilityAnalysis: {
            type: Type.OBJECT,
            properties: {
                feasibilityScore: { type: Type.STRING },
                rationale: { type: Type.STRING },
                recommendation: { type: Type.STRING },
                potentialSources: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            type: { type: Type.STRING },
                            notes: { type: Type.STRING }
                        }
                    }
                }
            }
        },
        validatedOpportunity: {
            type: Type.OBJECT,
            properties: {
                starvingCrowd: { type: Type.STRING },
                aspirinProblem: { type: Type.STRING }
            }
        },
        resultsInAdvanceTool: {
            type: Type.OBJECT,
            properties: {
                toolName: { type: Type.STRING },
                description: { type: Type.STRING },
                dataAssetFilename: { type: Type.STRING },
                dataAsset: { type: Type.STRING }
            }
        },
        leadCaptureMechanism: {
            type: Type.OBJECT,
            properties: { strategy: { type: Type.STRING } }
        },
        aiSalesAgent: {
            type: Type.OBJECT,
            properties: {
                persona: { type: Type.STRING },
                triggerLogic: { type: Type.STRING },
                openingScript: { type: Type.STRING }
            }
        },
        backendInstructions: {
            type: Type.OBJECT,
            properties: {
                filePath: { type: Type.STRING },
                code: { type: Type.STRING },
                deploymentSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        ultimatePrompt: { type: Type.STRING },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const dominanceBlueprintSchema = {
    type: Type.OBJECT,
    properties: {
        executiveSummary: { type: Type.STRING },
        clientAcquisitionEngine: {
            type: Type.OBJECT,
            properties: {
                tractionChannelAnalysis: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { channel: { type: Type.STRING }, rationale: { type: Type.STRING } } } },
                dream100Protocol: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { targetDescription: { type: Type.STRING }, rationale: { type: Type.STRING } } } },
                strategicPartnershipProtocol: { type: Type.OBJECT, properties: { idealPartnerProfile: { type: Type.STRING }, irresistibleOffer: { type: Type.STRING }, outreachAngle: { type: Type.STRING } } }
            }
        },
        unfairAdvantageSalesProtocol: {
            type: Type.OBJECT,
            properties: {
                agoraAngle: { type: Type.OBJECT, properties: { marketSophisticationLevel: { type: Type.STRING }, headlineAndHook: { type: Type.STRING }, coreBodyCopyAngle: { type: Type.STRING } } },
                belfortStraightLine: { type: Type.OBJECT, properties: { openingScript: { type: Type.STRING }, intelligenceGatheringQuestions: { type: Type.ARRAY, items: { type: Type.STRING } } } },
                fladlienOfferStack: { type: Type.OBJECT, properties: { coreOffer: { type: Type.STRING }, premiumBonuses: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, value: { type: Type.STRING } } } }, riskReversal: { type: Type.STRING }, urgencyDriver: { type: Type.STRING } } },
                bleedingNeckQualification: { type: Type.OBJECT, properties: { rationale: { type: Type.STRING }, filterQuestions: { type: Type.ARRAY, items: { type: Type.STRING } } } }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const gatekeeperBypassReportSchema = {
    type: Type.OBJECT,
    properties: {
        jvAssetMap: {
            type: Type.OBJECT,
            properties: {
                upstreamPartners: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            businessType: { type: Type.STRING },
                            whyTheyHaveTheBuyers: { type: Type.STRING },
                            estimatedListSize: { type: Type.STRING }
                        }
                    }
                },
                downstreamPartners: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            businessType: { type: Type.STRING },
                            monetizationGap: { type: Type.STRING }
                        }
                    }
                }
            }
        },
        distressRadar: {
            type: Type.OBJECT,
            properties: {
                signals: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            signal: { type: Type.STRING },
                            interpretation: { type: Type.STRING },
                            findingMethod: { type: Type.STRING }
                        }
                    }
                }
            }
        },
        godfatherProposal: {
            type: Type.OBJECT,
            properties: {
                angle: { type: Type.STRING },
                theAsk: { type: Type.STRING },
                theGive: { type: Type.STRING },
                riskReversal: { type: Type.STRING },
                emailScript: { type: Type.STRING }
            }
        },
        productBridgeIdeas: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    conceptName: { type: Type.STRING },
                    description: { type: Type.STRING },
                    whyItFitsPartner: { type: Type.STRING }
                }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const loneWolfReportSchema = {
    type: Type.OBJECT,
    properties: {
        executiveSummary: { type: Type.STRING },
        loneWolfPlays: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    playName: { type: Type.STRING },
                    incomePotential: { type: Type.STRING },
                    timeToFirstCash: { type: Type.STRING },
                    gatekeeperBypassTactic: {
                        type: Type.OBJECT,
                        properties: {
                            tactic: { type: Type.STRING },
                            rationale: { type: Type.STRING }
                        }
                    },
                    requiredAssets: { type: Type.ARRAY, items: { type: Type.STRING } },
                    executionSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
                    aiAgentProtocol: {
                        type: Type.OBJECT,
                        properties: {
                            protocol: { type: Type.STRING },
                            rationale: { type: Type.STRING }
                        }
                    }
                }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const chimericAgentReportSchema = {
    type: Type.OBJECT,
    properties: {
        subjectSynthesis: { type: Type.STRING },
        highStakesSolutions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    solutionName: { type: Type.STRING },
                    problemDomain: { type: Type.STRING },
                    aiLeveragePoint: { type: Type.STRING },
                    monetizationModel: { type: Type.STRING },
                    firstTouchProtocol: {
                        type: Type.OBJECT,
                        properties: {
                            wedge: { type: Type.STRING },
                            rationale: { type: Type.STRING }
                        }
                    }
                }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const sovereignAgentsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING },
            agentType: { type: Type.STRING },
            status: { type: Type.STRING },
            overallBrief: { type: Type.STRING },
            tasks: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        brief: { type: Type.STRING },
                        status: { type: Type.STRING }
                    }
                }
            }
        }
    }
};

export const cashflowProtocolSchema = {
    type: Type.OBJECT,
    properties: {
        mindsetCalibration: { type: Type.OBJECT, properties: { corePrinciple: { type: Type.STRING }, affirmation: { type: Type.STRING } } },
        highTicketOffer: { 
            type: Type.OBJECT, 
            properties: { 
                offerName: { type: Type.STRING }, 
                pricePoint: { type: Type.STRING }, 
                coreComponents: { type: Type.ARRAY, items: { type: Type.STRING } },
                irresistibleBonuses: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, value: { type: Type.STRING } } } }
            } 
        },
        prospectingDirective: { type: Type.OBJECT, properties: { idealClientProfile: { type: Type.STRING }, killListQuery: { type: Type.STRING } } },
        closingScript: { type: Type.OBJECT, properties: { opening: { type: Type.STRING }, painFindingQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }, solutionPresentation: { type: Type.STRING }, close: { type: Type.STRING } } },
        battlePlan48Hours: { type: Type.OBJECT, properties: { hours0_6: { type: Type.STRING }, hours7_24: { type: Type.STRING }, hours25_48: { type: Type.STRING } } }
    }
};

export const realEstateAlphaSchema = {
    type: Type.OBJECT,
    properties: {
        esotericAlpha: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                strategies: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            source: { type: Type.STRING },
                            strategy: { type: Type.STRING },
                            outreachScripts: {
                                type: Type.OBJECT,
                                properties: { sms: { type: Type.STRING }, rvm: { type: Type.STRING }, directMail: { type: Type.STRING } }
                            }
                        }
                    }
                }
            }
        },
        dealFlowEngine: {
            type: Type.OBJECT,
            properties: {
                harvester: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, stageSummary: { type: Type.STRING }, tasks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { taskName: { type: Type.STRING }, description: { type: Type.STRING } } } }, output: { type: Type.STRING } } },
                validator: { 
                    type: Type.OBJECT, 
                    properties: { 
                        title: { type: Type.STRING }, 
                        stageSummary: { type: Type.STRING }, 
                        tasks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { taskName: { type: Type.STRING }, description: { type: Type.STRING } } } }, 
                        output: { type: Type.STRING },
                        leverageScoringAlgorithm: {
                            type: Type.OBJECT,
                            properties: {
                                formula: { type: Type.STRING }
                            }
                        }
                    } 
                },
                dossier: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, stageSummary: { type: Type.STRING }, tasks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { taskName: { type: Type.STRING }, description: { type: Type.STRING } } } }, output: { type: Type.STRING } } }
            }
        },
        uploadedDataAnalysis: { type: Type.OBJECT, properties: { summary: { type: Type.STRING }, insights: { type: Type.ARRAY, items: { type: Type.STRING } } } },
        investorPlaybook: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, steps: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { stepName: { type: Type.STRING }, description: { type: Type.STRING } } } } } },
        aiAgentProtocol: { type: Type.OBJECT, properties: { protocol: { type: Type.STRING } } },
        dataVisualizationSuite: {
            type: Type.OBJECT,
            properties: {
                marketOpportunityChart: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        data: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    county: { type: Type.STRING },
                                    medianPrice: { type: Type.NUMBER },
                                    leverageScore: { type: Type.NUMBER },
                                    foreclosureRate: { type: Type.NUMBER }
                                }
                            }
                        }
                    }
                },
                samplePropertyDossier: {
                    type: Type.OBJECT,
                    properties: {
                        address: { type: Type.STRING },
                        imageUrl: { type: Type.STRING },
                        stats: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING } } } },
                        investmentThesis: { type: Type.STRING }
                    }
                }
            }
        }
    }
};

export const alphaSignalSchema = {
    type: Type.OBJECT,
    properties: {
        executiveSummary: { type: Type.STRING },
        revenuePlays: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    playName: { type: Type.STRING },
                    probabilityOfSuccess: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, rationale: { type: Type.STRING } } },
                    potentialRevenue: { type: Type.STRING },
                    psychologicalEdge: { type: Type.OBJECT, properties: { principle: { type: Type.STRING }, application: { type: Type.STRING } } },
                    requiredAssets: { type: Type.ARRAY, items: { type: Type.STRING } },
                    executionSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
                    aiAgentProtocol: { type: Type.OBJECT, properties: { protocol: { type: Type.STRING }, rationale: { type: Type.STRING } } }
                }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const competitiveDisplacementBriefSchema = {
    type: Type.OBJECT,
    properties: {
        trafficAnalysis: {
            type: Type.OBJECT,
            properties: {
                marketPosition: { type: Type.STRING },
                supportingSignals: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        marketSizeEstimate: { type: Type.STRING },
        quantitativeModel: {
             type: Type.OBJECT,
             properties: {
                 decisionScoreFormula: { type: Type.STRING },
                 variableDefinitions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { variable: { type: Type.STRING }, definition: { type: Type.STRING } } } }
             }
        },
        dataVisualizationSuite: {
             type: Type.OBJECT,
             properties: {
                 decisionDecomposition: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.NUMBER } } } },
                 angleUplift: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { segment: { type: Type.STRING }, angle: { type: Type.STRING }, uplift: { type: Type.NUMBER } } } }
             }
        },
        marketMindAnalysis: {
             type: Type.OBJECT,
             properties: {
                 dominantEmotionalDrivers: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { emotion: { type: Type.STRING }, weight: { type: Type.NUMBER }, rationale: { type: Type.STRING } } } },
                 hotButtonKeywords: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { keyword: { type: Type.STRING }, context: { type: Type.STRING } } } },
                 psycholinguisticRoutingEngine: {
                     type: Type.OBJECT,
                     properties: {
                         routingLogic: { type: Type.STRING },
                         heroVariants: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { angle: { type: Type.STRING }, headline: { type: Type.STRING }, adHook: { type: Type.STRING } } } }
                     }
                 }
             }
        },
        aiPoweredWedge: {
            type: Type.OBJECT,
            properties: {
                blindSpot: { type: Type.STRING },
                wedgeIdea: { type: Type.STRING },
                wedgeDescription: { type: Type.STRING }
            }
        },
        outreachCopy: {
            type: Type.OBJECT,
            properties: {
                subjectLine: { type: Type.STRING },
                body: { type: Type.STRING },
                rvmScript: { type: Type.STRING },
                textMessage: { type: Type.STRING }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const b2cMarketDeconstructionSchema = {
    type: Type.OBJECT,
    properties: {
        definingInterests: { type: Type.ARRAY, items: { type: Type.STRING } },
        influentialBrands: { type: Type.ARRAY, items: { type: Type.STRING } },
        competitorBrands: { type: Type.ARRAY, items: { type: Type.STRING } },
        customerPersonas: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING }
                }
            }
        },
        b2cBuyingTriggers: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    trigger: { type: Type.STRING },
                    implication: { type: Type.STRING }
                }
            }
        },
        marketMindAnalysis: {
             type: Type.OBJECT,
             properties: {
                 dominantEmotionalDrivers: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { emotion: { type: Type.STRING }, weight: { type: Type.NUMBER }, rationale: { type: Type.STRING } } } },
                 hotButtonKeywords: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { keyword: { type: Type.STRING }, context: { type: Type.STRING } } } },
                 psycholinguisticRoutingEngine: {
                     type: Type.OBJECT,
                     properties: {
                         routingLogic: { type: Type.STRING },
                         heroVariants: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { angle: { type: Type.STRING }, headline: { type: Type.STRING }, adHook: { type: Type.STRING } } } }
                     }
                 }
             }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const liveMarketIntelSchema = {
    type: Type.OBJECT,
    properties: {
        topic: { type: Type.STRING },
        executiveSummary: { type: Type.STRING },
        latestDevelopments: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    headline: { type: Type.STRING },
                    date: { type: Type.STRING },
                    source: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    impactAnalysis: { type: Type.STRING }
                }
            }
        },
        marketSentiment: {
            type: Type.OBJECT,
            properties: {
                sentiment: { type: Type.STRING },
                rationale: { type: Type.STRING },
                keyQuotes: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        competitorMoves: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    company: { type: Type.STRING },
                    action: { type: Type.STRING },
                    implication: { type: Type.STRING }
                }
            }
        },
        sources: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    uri: { type: Type.STRING }
                }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const demandSignalSchema = {
    type: Type.OBJECT,
    properties: {
        targetAudience: { type: Type.STRING },
        buyingProbabilityScore: { type: Type.NUMBER },
        scoreRationale: { type: Type.STRING },
        leadingIndicators: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    signal: { type: Type.STRING },
                    predictiveWeight: { type: Type.STRING },
                    rationale: { type: Type.STRING }
                }
            }
        },
        signalSources: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    reachEstimate: { type: Type.STRING },
                    engineeringAsMarketingPlay: { type: Type.STRING }
                }
            }
        },
        intentDecayTimeline: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    phase: { type: Type.STRING },
                    action: { type: Type.STRING },
                    probabilityDrop: { type: Type.STRING }
                }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const opportunityRadarSchema = {
    type: Type.OBJECT,
    properties: {
        sector: { type: Type.STRING },
        executiveSummary: { type: Type.STRING },
        realTimeTrends: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    trendName: { type: Type.STRING },
                    growthSignal: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING },
                    sourceUrl: { type: Type.STRING }
                }
            }
        },
        bestOpportunity: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                starvingCrowd: { type: Type.STRING },
                painPoint: { type: Type.STRING },
                marketSize: { type: Type.STRING }
            }
        },
        aiMultiplierStrategy: {
            type: Type.OBJECT,
            properties: {
                coreSolution: { type: Type.STRING },
                the10xMechanism: { type: Type.STRING },
                automationWorkflow: { type: Type.STRING }
            }
        },
        formulaicBreakdown: {
            type: Type.OBJECT,
            properties: {
                acquisitionFormula: { type: Type.STRING },
                retentionFormula: { type: Type.STRING },
                monetizationFormula: { type: Type.STRING }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const edgarAnomalySchema = {
    type: Type.OBJECT,
    properties: {
        companyIdentifier: { type: Type.STRING },
        analysisDate: { type: Type.STRING },
        executiveSummary: { type: Type.STRING },
        anomalies: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING },
                    description: { type: Type.STRING },
                    severity: { type: Type.STRING },
                    sourceLocation: { type: Type.STRING }
                }
            }
        },
        redFlags: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    flag: { type: Type.STRING },
                    implication: { type: Type.STRING }
                }
            }
        },
        sourceFilings: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    uri: { type: Type.STRING }
                }
            }
        },
        methodology: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

export const aiVideoFoundrySchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        directorsCut: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    scene: { type: Type.STRING },
                    script: { type: Type.STRING },
                    visualPrompts: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { type: { type: Type.STRING }, prompt: { type: Type.STRING } } } },
                    voiceoverScript: { type: Type.STRING },
                    musicCue: { type: Type.STRING },
                    overlayText: { type: Type.STRING }
                }
            }
        },
        technicalImplementation: {
            type: Type.OBJECT,
            properties: {
                techStack: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, rationale: { type: Type.STRING } } } },
                architecture: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        saasMonetizationModel: {
            type: Type.OBJECT,
            properties: {
                pricingTiers: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, price: { type: Type.STRING }, description: { type: Type.STRING } } } },
                go_to_market_strategy: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        }
    }
};

export const highLeveragePlaybookSchema = {
    type: Type.OBJECT,
    properties: {
        brandingPersona: { type: Type.STRING },
        positioningStatement: { type: Type.STRING },
        idealClientProfile: { type: Type.ARRAY, items: { type: Type.STRING } },
        irresistibleOffer: {
            type: Type.OBJECT,
            properties: {
                offerName: { type: Type.STRING },
                pricePoint: { type: Type.STRING },
                components: { type: Type.ARRAY, items: { type: Type.STRING } },
                salesPitchAsset: {
                    type: Type.OBJECT,
                    properties: {
                        pitchPersona: { type: Type.STRING },
                        pitchScript: { type: Type.STRING },
                        videoScenePrompt: { type: Type.STRING }
                    }
                }
            }
        },
        marketingFunnel: { type: Type.ARRAY, items: { type: Type.STRING } },
        finalWisdom: { type: Type.STRING },
        
        // B2B specific properties
        searchAndAcquisitionProtocol: {
            type: Type.OBJECT,
            properties: {
                alphaSignal: { type: Type.STRING },
                leveragePoint: { type: Type.STRING },
                protocolSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        clientAcquisitionEngine: {
            type: Type.OBJECT,
            properties: {
                tractionChannelAnalysis: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { channel: { type: Type.STRING }, rationale: { type: Type.STRING } } } },
                dream100Protocol: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { targetDescription: { type: Type.STRING }, rationale: { type: Type.STRING } } } },
                strategicPartnershipProtocol: { type: Type.OBJECT, properties: { idealPartnerProfile: { type: Type.STRING }, irresistibleOffer: { type: Type.STRING }, outreachAngle: { type: Type.STRING } } }
            }
        },

        // B2C specific properties
        asymmetricWedgeStrategy: {
            type: Type.OBJECT,
            properties: {
                targetMicroTribe: { type: Type.STRING },
                asymmetricWedge: {
                    type: Type.OBJECT,
                    properties: {
                        idea: { type: Type.STRING },
                        rationale: { type: Type.STRING },
                        wedgeType: { type: Type.STRING }
                    }
                },
                infiltrationPlan: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        }
    }
};

export const alphaAcquisitionPlaybookSchema = {
    type: Type.OBJECT,
    properties: {
        channelPartnershipProtocol: {
            type: Type.OBJECT,
            properties: {
                idealPartnerProfile: { type: Type.STRING },
                aiPoweredSearchQueries: { type: Type.ARRAY, items: { type: Type.STRING } },
                irresistiblePartnershipOffer: { type: Type.STRING }
            }
        },
        buyingTriggerProtocol: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    triggerEvent: { type: Type.STRING },
                    signalIntelligence: { type: Type.STRING },
                    strategicApproach: { type: Type.STRING }
                }
            }
        }
    }
};
