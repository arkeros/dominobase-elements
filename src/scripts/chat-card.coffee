do (scope = window) ->
  'use strict'
  scope.Polymer 'chat-card'
  ,
    created: () ->
      @messages = []
      return
