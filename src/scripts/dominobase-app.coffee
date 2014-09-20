do (scope = window) ->
    'use strict'
    scope.Polymer 'dominobase-app'
    ,

        toggleCreateGame: (event, detail, sender) ->
            @$.game_create.toggle()

        SignInGoogle: (event, detail, sender) ->
            scope.console.log event
            scope.console.log detail
            scope.console.log sender

