do (scope = window) ->
    'use strict'
    scope.Polymer 'livegame-page'
    ,
        id: 0
        games: []

        fireLasers: ->
            @fire 'seed-element-lasers-success',
                sound: 'Pew pew pew!'
