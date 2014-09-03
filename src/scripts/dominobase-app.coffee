do (scope = window) ->
    'use strict'
    scope.Polymer 'dominobase-app'
    ,
        user: 'Anonymous'

        fireLasers: ->
            @fire 'seed-element-lasers-success', 
                sound: 'Pew pew pew!'
