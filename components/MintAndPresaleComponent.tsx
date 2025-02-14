import { Box, BoxProps, Button, Flex } from '@zoralabs/zord'
import { MintComponent } from 'components/MintComponent'
import { PresaleComponent } from 'components/PresaleComponent'
import { useSaleStatus } from 'hooks/useSaleStatus'
import { ERC721DropProviderState } from 'providers/ERC721DropProvider'
import { useState } from 'react'

export function MintAndPresaleComponent({
  collection,
  className = '',
  showPresaleValue = true,
  textColor,
  accentColor
}: {
  className?: BoxProps['className']
  showPresaleValue?: boolean
  collection: ERC721DropProviderState
  textColor: string
  accentColor: string
}) {
  const { presaleExists, merkleRootExists, saleNotStarted, saleIsFinished } =
    useSaleStatus({
      collection,
    })

  const [showPresale, setShowPresale] = useState(
    saleNotStarted && !saleIsFinished && showPresaleValue
  )

  return presaleExists && merkleRootExists ? (
    <Box className={className}>
      <Flex flexChildren gap="x3" mb="x2">
        <Button
          pill
          variant={showPresale ? 'primary' : 'ghost'}
          color={showPresale ? 'primary' : 'tertiary'}
          onClick={() => setShowPresale(true)}
        >
          Presale
        </Button>
        <Button
          pill
          variant={!showPresale ? 'primary' : 'ghost'}
          color={!showPresale ? 'primary' : 'tertiary'}
          onClick={() => setShowPresale(false)}
        >
          Public sale
        </Button>
      </Flex>
      <Box display={showPresale ? 'block' : 'none'}>
        <PresaleComponent collection={collection} textColor={textColor} accentColor={accentColor}/>
      </Box>
      <Box display={!showPresale ? 'block' : 'none'}>
        <MintComponent collection={collection} textColor={textColor} accentColor={accentColor}/>
      </Box>
    </Box>
  ) : (
    <MintComponent className={className} collection={collection} textColor={textColor} accentColor={accentColor}/>
  )
}
