LanguageRapidView = require './language-rapid-view'
{CompositeDisposable} = require 'atom'

module.exports = LanguageRapid =
  languageRapidView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @languageRapidView = new LanguageRapidView(state.languageRapidViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @languageRapidView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'language-rapid:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @languageRapidView.destroy()

  serialize: ->
    languageRapidViewState: @languageRapidView.serialize()

  toggle: ->
    console.log 'LanguageRapid was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
