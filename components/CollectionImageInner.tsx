import ReactMarkdown from 'react-markdown'
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { maxWidth, wrapWords } from 'styles/styles.css'
import { MintAndPresaleComponent } from '@components/MintAndPresaleComponent'
import { MintDetails } from '@components/MintDetails'
import ERC721DropContractProvider, { useERC721DropContract } from 'providers/ERC721DropProvider'
import { useCollectionMetadata } from 'hooks/useCollectionMetadata'
import * as styles from './CollectionMedia.css'
import { useDisconnect } from 'wagmi'
import {
  vars,
  Box,
  Flex,
  Stack,
  Text,
  Button,
  Paragraph,
  SpinnerOG,
  border,
} from '@zoralabs/zord'
import {CollectionMedia} from './CollectionMedia'
import { collectionAccentColor } from 'styles/theme.css';
import { SubgraphERC721Drop } from 'models/subgraph';
import DropMetadataContractProvider from 'providers/DropMetadataProvider'
import EditionMetadataContractProvider from 'providers/EditionMetadataProvider'
import { DROPS_METADATA_RENDERER } from 'constants/addresses';
import { CollectionImage } from './CollectionImage';

const Well = ({borderColor, style, children}) => {

  return (
  <div style={{borderColor: borderColor, borderWidth: 2 ,borderStyle: 'solid', borderRadius: 30, ...style}}>
  {children}
  </div>
  );
}

export function CollectionImageInner({
 collection
}: {
  collection: SubgraphERC721Drop

}) {

    
    const components = {
        drop: DropMetadataContractProvider,
        edition: EditionMetadataContractProvider,
      }
      const MetadataProvider =
        components[
          DROPS_METADATA_RENDERER.includes(collection.contractConfig?.metadataRenderer)
            ? 'drop'
            : 'edition'
        ]
    



  return (
    <ERC721DropContractProvider collection={collection}>
        <MetadataProvider
        collection={collection}
        metadataRendererAddress={collection.contractConfig.metadataRenderer}
        >
            <CollectionImage collection={collection}/>
        </MetadataProvider>
    </ERC721DropContractProvider>

  )
}
