import { PackedItem } from 'guillotine-packer-with-weight-and-max-stack-count/dist/types/pack-strategy'
import React from 'react'
import { FC, useEffect, useRef } from 'react'
import {
  stringToColor,
  visualizeItems,
  truckLoad,
  freeTransferCriterion,
  productList,
} from '../utils'

interface ItemVisualizationProps {
  width: number
  height: number
  renderWidth: number
  renderHeight: number
  items: PackedItem[]
}

const ItemVisualization: FC<ItemVisualizationProps> = ({
  width,
  height,
  renderWidth,
  renderHeight,
  items,
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current as any
    if (canvas) {
      const ctx = canvas.getContext('2d')

      // Define color map for item labels
      const colorMap = {}

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Iterate over the items and draw each one
      items.forEach((item) => {
        // Determine the color for the item label
        const label = item.name
        const loadCount = item.count
        let color = colorMap[label]
        if (!color) {
          color = productList.find((e) => e.name === label)?.representedColor
          colorMap[label] = color
        }

        // Draw the item block
        ctx.fillStyle = '#000'
        ctx.fillRect(item.x, item.y, item.width, item.height)
        ctx.fillStyle = color
        ctx.fillRect(item.x + 1, item.y + 1, item.width - 2, item.height - 2)

        // Draw the item label on top of the block
        ctx.fillStyle = 'white'
        ctx.font = `${40}px sans-serif`
        ctx.fillText(loadCount, item.x, item.y + 30)
      })
    }
  }, [items])

  // Helper function to generate random colors

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: '1px solid black',
        width: renderWidth,
        height: renderHeight,
      }}
    />
  )
}

export default ItemVisualization
