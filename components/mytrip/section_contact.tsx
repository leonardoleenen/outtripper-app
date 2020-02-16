import React from 'react'
import Icon, { ICONS } from './icons'
import Panel from './panel'

export default () => (
  <div>
    <div className="font-semibold text-xl mb-4"> Do you have any inquire?</div>
    <Panel>
      <div className="flex items-center">
        <div><Icon icon={ICONS.OUTLINED_PHONE} /></div>
        <div className="ml-4">Call for free with your internet connection</div>
      </div>
    </Panel>
    <Panel>
      <div className="flex items-center">
        <div><Icon icon={ICONS.OUTLINED_PHONE} /></div>
        <div className="ml-4">From USA 1800-800-9999</div>
      </div>
    </Panel>
    <Panel>
      <div className="flex items-center">
        <div><Icon icon={ICONS.OUTLINED_PHONE} /></div>
        <div className="ml-4">From the resto of the world +1 989 0303 033</div>
      </div>
    </Panel>
    <Panel>
      <div className="flex items-center">
        <div><Icon icon={ICONS.EMAIL} /></div>
        <div className="ml-4">sales@jurassiclake.com</div>
      </div>
    </Panel>
  </div>
)
