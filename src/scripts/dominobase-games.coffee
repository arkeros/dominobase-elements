do (scope = window) ->
    'use strict'
    scope.Polymer 'dominobase-games'
    ,
        games: []

        fireLasers: ->
            @fire 'seed-element-lasers-success', 
                sound: 'Pew pew pew!'
