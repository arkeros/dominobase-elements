do (scope = window) ->
  'use strict'
  scope.Polymer 'dominobase-app'
  ,
    toggleCreateGame: () ->
      @$.gameCreate.toggle()

    SignInGoogle: (event, detail, sender) ->
      self = this
      gapi = detail.gapi

      scope.console.log event
      scope.console.log detail
      scope.console.log sender

      @user =
        oauth:
          token: detail.result.access_token
      gapi.client.load 'plus', 'v1', () ->
        gapi.client.plus.people.get
          userId: 'me'
        .execute (resp) ->
          scope.console.log resp
          self.user =
            name: resp.displayName
            image: resp.image.url
            cover: resp.cover.coverPhoto.url
            email: resp.emails[0].value
            url: resp.url
            language: resp.language
            gender: resp.gender
            oauth: self.user.oauth
            logged: true
          return
        self.connect()

    connect: () ->
      location = '//178.62.195.197:7070/http-bind'
      @user.xmpp = new scope.Strophe.Connection location
      @user.xmpp.connect @user.email, @user.oauth.token
      scope.console.log @user
