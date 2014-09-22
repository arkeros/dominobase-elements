do (scope = window) ->
    'use strict'
    scope.Polymer 'games-page'
    ,
        games: []

        fireLasers: ->
            @fire 'seed-element-lasers-success',
                sound: 'Pew pew pew!'
