do (scope = window) ->
    'use strict'
    scope.Polymer 'dominobase-livegame'
    ,
        games: []

        fireLasers: ->
            @fire 'seed-element-lasers-success', 
                sound: 'Pew pew pew!'
