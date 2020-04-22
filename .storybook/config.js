import { addParameters, configure } from '@storybook/react'

addParameters({
  options: {
    name: '@4react/state',
    showPanel: true,
    panelPosition: 'right'
  },
  knobs: {
    escapeHTML: false
  }
})

configure(() => {
  require('./stories/_stories.js')
}, module)
