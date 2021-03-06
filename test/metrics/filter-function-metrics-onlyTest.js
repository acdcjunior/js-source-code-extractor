const expect = require("chai").expect;

const extractJavaScriptASTsFromJsFile = require("../../src/parsing/extract-js-ast-from-js-file");
const extractAllMetricsFromJsAst = require("../../src/metrics/extract-all-metrics-from-js-ast");
const filterFunctionMetricsOnly = require("../../src/metrics/filter-function-metrics-only");

const demoFileJsAST = extractJavaScriptASTsFromJsFile('test/metrics/filter-function-metrics-onlyDemo.js', 'utf8');
const demoFileFullMetrics = extractAllMetricsFromJsAst(demoFileJsAST);

describe("filterFunctionsMetrics", function () {

    it(`ast`, () => {
        expect(demoFileFullMetrics).to.deep.equal(
            [{
                _type: 'VariableDeclaration',
                metrics: {declarationStmts: 3, executableStmts: 1, parametersCount: 2, callExprs: 2},
                detail: {
                    declarations: [{
                        _type: 'VariableDeclarator',
                        metrics: {declarationStmts: 3, executableStmts: 1, parametersCount: 2, callExprs: 2},
                        detail: {
                            id: {_type: 'Identifier'},
                            init: {
                                _type: 'CallExpression',
                                metrics: {callExprs: 2, declarationStmts: 2, executableStmts: 1, parametersCount: 2},
                                detail: {
                                    callee: {
                                        _type: 'FunctionExpression',
                                        metrics: {parametersCount: 2, declarationStmts: 2, executableStmts: 1, callExprs: 1},
                                        detail: {
                                            body: {
                                                _type: 'BlockStatement',
                                                metrics: {declarationStmts: 2, executableStmts: 1, parametersCount: 1, callExprs: 1},
                                                detail: {
                                                    body: [{
                                                        _type: 'FunctionDeclaration',
                                                        functionName: 'aaa',
                                                        metrics: {declarationStmts: 1},
                                                        detail: {
                                                            body: {
                                                                _type: 'BlockStatement',
                                                                metrics: {declarationStmts: 1},
                                                                detail: {
                                                                    body: [{
                                                                        _type: 'VariableDeclaration',
                                                                        metrics: {declarationStmts: 1},
                                                                        detail: {
                                                                            declarations: [{
                                                                                _type: 'VariableDeclarator',
                                                                                metrics: {declarationStmts: 1},
                                                                                detail: {id: {_type: 'Identifier'}, init: {_type: 'Literal'}}
                                                                            }]
                                                                        }
                                                                    }]
                                                                }
                                                            }
                                                        },
                                                        loc: 'test/metrics/filter-function-metrics-onlyDemo.js?2:4-4:5'
                                                    }, {
                                                        _type: 'ExpressionStatement',
                                                        metrics: {executableStmts: 1, declarationStmts: 1, parametersCount: 1, callExprs: 1},
                                                        detail: {
                                                            expression: {
                                                                _type: 'CallExpression',
                                                                metrics: {callExprs: 1, declarationStmts: 1, parametersCount: 1},
                                                                detail: {
                                                                    callee: {
                                                                        _type: 'FunctionExpression',
                                                                        functionName: 'yyy',
                                                                        metrics: {parametersCount: 1, declarationStmts: 1},
                                                                        detail: {
                                                                            body: {
                                                                                _type: 'BlockStatement',
                                                                                metrics: {declarationStmts: 1},
                                                                                detail: {
                                                                                    body: [{
                                                                                        _type: 'FunctionDeclaration',
                                                                                        functionName: 'bbb',
                                                                                        metrics: {declarationStmts: 1},
                                                                                        detail: {
                                                                                            body: {
                                                                                                _type: 'BlockStatement',
                                                                                                metrics: {declarationStmts: 1},
                                                                                                detail: {
                                                                                                    body: [{
                                                                                                        _type: 'VariableDeclaration',
                                                                                                        metrics: {declarationStmts: 1},
                                                                                                        detail: {
                                                                                                            declarations: [{
                                                                                                                _type: 'VariableDeclarator',
                                                                                                                metrics: {declarationStmts: 1},
                                                                                                                detail: {
                                                                                                                    id: {_type: 'Identifier'},
                                                                                                                    init: {_type: 'Literal'}
                                                                                                                }
                                                                                                            }]
                                                                                                        }
                                                                                                    }]
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        loc: 'test/metrics/filter-function-metrics-onlyDemo.js?6:8-8:9'
                                                                                    }]
                                                                                }
                                                                            }
                                                                        },
                                                                        loc: 'test/metrics/filter-function-metrics-onlyDemo.js?5:5-9:5'
                                                                    }, arguments: [{_type: 'Literal'}]
                                                                }
                                                            }
                                                        }
                                                    }]
                                                }
                                            }
                                        },
                                        loc: 'test/metrics/filter-function-metrics-onlyDemo.js?1:9-10:1'
                                    }, arguments: [{_type: 'Literal'}]
                                }
                            }
                        }
                    }]
                }
            }]
        );
    });

    it(`filtering`, () => {
        const functionMetricsOnly = filterFunctionMetricsOnly(demoFileFullMetrics);

        expect(functionMetricsOnly).to.deep.equal(
            [{
                _type: 'FunctionExpression',
                metrics: {parametersCount: 2, declarationStmts: 2, executableStmts: 1, callExprs: 1},
                loc: 'test/metrics/filter-function-metrics-onlyDemo.js?1:9-10:1'
            }, {
                _type: 'FunctionExpression',
                functionName: 'yyy',
                metrics: {parametersCount: 1, declarationStmts: 1},
                loc: 'test/metrics/filter-function-metrics-onlyDemo.js?5:5-9:5'
            }, {
                _type: 'FunctionDeclaration',
                functionName: 'bbb',
                metrics: {declarationStmts: 1},
                loc: 'test/metrics/filter-function-metrics-onlyDemo.js?6:8-8:9'
            }, {
                _type: 'FunctionDeclaration',
                functionName: 'aaa',
                metrics: {declarationStmts: 1},
                loc: 'test/metrics/filter-function-metrics-onlyDemo.js?2:4-4:5'
            }]
        );
    });

    it(`filtering with LOC restriction`, () => {
        const functionMetricsOnly = filterFunctionMetricsOnly(demoFileFullMetrics, 4);

        expect(functionMetricsOnly).to.deep.equal(
            [{
                _type: 'FunctionExpression',
                metrics: {parametersCount: 2, declarationStmts: 2, executableStmts: 1, callExprs: 1},
                loc: 'test/metrics/filter-function-metrics-onlyDemo.js?1:9-10:1'
            }, {
                _type: 'FunctionExpression',
                functionName: 'yyy',
                metrics: {parametersCount: 1, declarationStmts: 1},
                loc: 'test/metrics/filter-function-metrics-onlyDemo.js?5:5-9:5'
            }]
        );
    });

});