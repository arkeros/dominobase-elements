do (scope = window) ->
    'use strict'
    scope.Polymer 'dominobase-app'
    ,

        toggleCreateGame: (event, detail, sender) ->
            @$.game_create.toggle()

        SignInGoogle: (event, detail, sender) ->
            gapi = detail.gapi

            scope.console.log event
            scope.console.log detail
            scope.console.log sender

            gapi.client.load 'plus', 'v1', () ->
                gapi.client.plus.people.get
                    userId: 'me'
                .execute (resp) ->
                    scope.console.log resp
