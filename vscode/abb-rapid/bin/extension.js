'use strict';
const vscode = require("vscode");

const RAPID_MODE = {language: 'rapid', scheme: 'file'};

function activate(context) {
    console.log('ABB-Rapid extension is now active.');

    let workspaceSymbolCompiler = new RapidWorkspaceSymbolCompiler();
    let symbolController = new WorkspaceSymbolController(workspaceSymbolCompiler);
    context.subscriptions.push(workspaceSymbolCompiler);
    context.subscriptions.push(symbolController);

    let workspaceSymbolProvider = new RapidWorkspaceSymbolProvider();
    context.subscriptions.push(workspaceSymbolProvider);
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(workspaceSymbolProvider));

    let completionItemProvider = new RapidCompletionItemProvider();
    context.subscriptions.push(completionItemProvider);
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(RAPID_MODE, completionItemProvider, '.', '\"'));

    let signatureHelpProvider = new RapidSignatureHelpProvider();
    context.subscriptions.push(signatureHelpProvider);
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(RAPID_MODE, signatureHelpProvider, '(', ','));
}
exports.activate = activate;

function deactivate() {
    console.log('ABB-Rapid extension is now inactive.');
}
exports.deactivate = deactivate;

class WorkspaceSymbolController {

    constructor(symbolCompiler) {
        this._symbolCompiler = symbolCompiler;
        // this._symbolCompiler.updateSymbolLists();

        let subscriptions = [];
        vscode.workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);
        vscode.workspace.onDidOpenTextDocument(this._onEvent, this, subscriptions);

        this._symbolCompiler.updateSymbolLists();

        this._disposable = vscode.Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    _onEvent() {
        this._symbolCompiler.updateSymbolLists();
    }
}

class RapidWorkspaceSymbolCompiler {
    constructor() {
        this._variables = [];
        this._functions = [];
    }

    updateSymbolLists() {
        console.log('updateSymbolLists called: ');
        vscode.workspace.findFiles('**/**','**/*.cfg').then(function(value){console.log(value)});
    }
}

class RapidWorkspaceSymbolProvider {
    provideWorkspaceSymbols(query, token) {
        console.log('provideWorkspaceSymbols called: ' + query);
    }
}

class RapidCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        console.log('provideCompletionItems called: ');
    }
}

class RapidSignatureHelpProvider {
    provideSignatureHelp(document, position, token) {
        console.log('provideSignatureHelp called: ')
    }
}
