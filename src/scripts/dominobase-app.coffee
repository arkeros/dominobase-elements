do (scope = window) ->
    'use strict'
    scope.Polymer 'dominobase-app'
    ,
        toggleCreateGame: (event, detail, sender) ->
            @$.game_create.toggle()

        SignInGoogle: (event, detail, sender) ->
            self = this
            gapi = detail.gapi

            scope.console.log event
            scope.console.log detail
            scope.console.log sender

            gapi.client.load 'plus', 'v1', () ->
                gapi.client.plus.people.get
                    userId: 'me'
                .execute (resp) ->
                    scope.console.log resp
                    self.user =
                        name: resp.displayName
                        image: resp.image.url
                        email: resp.emails[0].value
                        url: resp.url
                        language: resp.language
                        gender: resp.gender
                        oauth:
                            token: detail.result.access_token
                        logged: true
                    scope.console.log self.user

                    scope.Strophe.SASLPlain.priority = 100
                    scope.console.log scope.Strophe
                    xmpp = scope.Strophe.Connection 'ws://echo.websocket.org',
                        protocol: "ws"
                    xmpp.connect self.user.email, self.user.oauth.token
                    scope.console.log xmpp
