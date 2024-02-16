import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Flex, FlexProps, SpinnerOG } from '@zoralabs/zord'
import { AssetRenderer, AssetRendererProps } from 'components/Assets/AssetRenderer'
import { MediaType, mimeToMediaType } from 'models/mediaType'
import React, { useEffect, useState } from 'react'
import { getMimeType } from 'utils/asset'
import { transformIPFSURL } from 'providers/IPFSProvider'
import { ERC721DropProviderState } from 'providers/ERC721DropProvider'

interface CollectionMediaProps extends FlexProps {
  collection?: ERC721DropProviderState
  metadata: any
  objectFit?: 'cover' | 'contain'
}

export function CollectionMedia({
  collection,
  metadata,
  objectFit = 'contain',
  ...props
}: CollectionMediaProps) {
  const [isAudio, setIsAudio] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [assetRendererProps, setAssetRendererProps] = useState<AssetRendererProps>({
    src: '',
    coverImageUrl: '',
    mediaType: MediaType.UNKNOWN,
  })

  useEffect(() => {
    let mounted = true

    ;(async () => {
      // TODO: Review & refactor this
      if (!metadata || metadata.loading) {
        return
      }

      const image = metadata?.imageURI || metadata?.image
      const media = metadata.animation_url || metadata.animationURI
      const url = transformIPFSURL(media || image)
      if (!url) return

      const coverUrl = transformIPFSURL(image)
      const mimeType = await getMimeType(url)
      const mediaType = mimeType ? mimeToMediaType[mimeType] : MediaType.UNKNOWN
      const isAudio = mediaType === MediaType.AUDIO
      setIsAudio(isAudio)

      if (mounted) {
        setLoading(false)
        setAssetRendererProps({
          src: url,
          coverImageUrl: coverUrl,
          mediaType,
        })
      }
    })()

    return () => {
      mounted = false
    }
  }, [metadata])


  const willChange = { willChange: 'transform' }

  const [angle, setAngle] = useState(12.5)

  const y = useMotionValue(0.5)
  const x = useMotionValue(0.5)
  const hoverProgress = useMotionValue(1)

  const rotateY = useTransform(x, [0, 1], [angle, -angle], {
    clamp: true,
  })
  const rotateX = useTransform(y, [0, 1], [-angle, angle], {
    clamp: true,
  })
  const moveY = useTransform(y, [0, 1], [angle / 2, -angle / 2], {
    clamp: true,
  })
  const moveX = useTransform(x, [0, 1], [angle / 2, -angle / 2], {
    clamp: true,
  })

  function onMove(e) {
    const bounds = e.currentTarget.getBoundingClientRect()
    const xValue = (e.clientX - bounds.x) / e.currentTarget.clientWidth
    const yValue = (e.clientY - bounds.y) / e.currentTarget.clientHeight
    
    x.stop()
    y.stop()

    const duration = 0.5 * hoverProgress.get()

    animate(x, xValue, {
      ease: [0.25, 1, 0.5, 1],
      duration
    })
    animate(y, yValue, {
      ease: [0.25, 1, 0.5, 1],
      duration
    })
  }

  function onEnter() {
    x.stop()
    y.stop()
    hoverProgress.set(1, true)

    animate(x, 0.5, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
    animate(y, 0.5, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
    animate(hoverProgress, 0, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
  }

  function onLeave() {
    hoverProgress.stop()
    animate(x, 0.5, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
    animate(y, 0.5, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
    hoverProgress.set(1, true)
  }

  return (
 <Flex flex={{ '@initial': '1', '@1024': '1' }} p="x2" justify="center">
 <motion.div
   animate={{
     scale: 1,
     y: 0,
   }}
   initial={{
     scale: 0,
     y: 200,
   }}
   style={willChange}
   transition={{
     damping: 40,
     delay: 0.4,
     mass: 1,
     stiffness: 300,
     type: 'spring',
   }}
 >
   <motion.div
     animate={{
       rotateY: 0,
       transformPerspective: 1200,
     }}
     initial={{
       rotateY: 180,
       transformPerspective: 0,
     }}
     style={willChange}
     transition={{
       damping: 8,
       delay: 0.4,
       mass: 1,
       stiffness: 60,
       type: 'spring',
     }}
   >
     <motion.div
       onMouseMove={onMove}
       whileHover={{ scale: 1.0666 }}
       onHoverStart={onEnter}
       onHoverEnd={onLeave}
       style={{ ...willChange, rotateX, rotateY, transformPerspective: 800 }}
       transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.5 }}
     >
       <div
         style={{
           height: 1024,
           width: 1024,
           objectFit: 'contain',
           position: 'relative',
           maxHeight: '60vh',
           maxWidth: '60vh',
           willChange: 'transform',
         }}
       >
    
         <motion.div
           style={{
             position: 'absolute',
             left: '12.5%',
             right: '12.5%',
             top: '12.5%',
             bottom: '12.5%',
             willChange: 'transform',
             x: moveX,
             y: moveY,
          
           }}
         >
         {loading ? (
        <SpinnerOG />
      ) : (
        <AssetRenderer
          collection={collection}
          image={{
            style: {
              width: '100%',
              height: '100%',
              objectFit,
              // this needs to be dropped, need correct assets to override
              borderRadius: 60
            },
          }}
          {...assetRendererProps}
        />
      )}
         </motion.div>
       </div>
     </motion.div>
   </motion.div>
 </motion.div>
</Flex>
  )
}

