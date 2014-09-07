do (scope = window) ->
    'use strict'
    scope.Polymer 'dominobase-app'
    ,
        user: 'Anonymous'

        toggleCreateGame: (event, detail, sender) ->
            @$.game_create.toggle()
