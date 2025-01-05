import React, { ReactNode } from 'react'
import { IOptions } from './options'

/**
 * @param canvasProps Attributes passed to the underlying canvas element
 * @param children Tags rendered using the provided renderers
 * @param containerProps Attributes passed to the root div element
 * @param id Should be provided when using SSR
 * @param options https://www.goat1000.com/tagcanvas-options.php
 */
export type ICloud = {
  canvasProps?: React.HTMLAttributes<HTMLCanvasElement>
  children: ReactNode
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  id?: string | number
  options?: IOptions
}
