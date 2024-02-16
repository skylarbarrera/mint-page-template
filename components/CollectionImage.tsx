import { SubgraphERC721Drop } from 'models/subgraph'
import { DROPS_METADATA_RENDERER } from 'constants/addresses'
import DropMetadataContractProvider from 'providers/DropMetadataProvider'
import ERC721DropContractProvider, { useERC721DropContract } from 'providers/ERC721DropProvider'
import EditionMetadataContractProvider from 'providers/EditionMetadataProvider'
import { CollectionInner } from './CollectionInner'
import { CollectionMedia } from './CollectionMedia'
import { useCollectionMetadata } from '@hooks/useCollectionMetadata'


export function CollectionImage({
  collection,
  username,
  textColor,
  accentColor
}: {
  collection: SubgraphERC721Drop
  username?: string
  textColor?: string
  accentColor?: string
}) {


    const collectionContext = useERC721DropContract()
    const { metadata } = useCollectionMetadata(
      collectionContext.contractConfig.metadataRenderer
    )
    const metadataDetails = metadata.metadataDetails
  

  if (!collection) {
    return <div>Loading...</div>
  }
  return (
  
        <CollectionMedia collection={collectionContext} metadata={metadataDetails}    borderRadius="curved"
              objectFit="cover"/>

  )
}
