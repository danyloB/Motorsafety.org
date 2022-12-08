import Vue from 'vue'
import Amplify, { Auth } from 'aws-amplify'
import '@aws-amplify/ui-vue'
import awsconfig from '../aws-exports.js'

Amplify.configure(awsconfig, { ssr: true })

Auth.configure(awsconfig)

Vue.use(Auth)
