import { addParameters, configure } from '@storybook/react'

addParameters({
  options: {
    name: '@4react/store',
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
