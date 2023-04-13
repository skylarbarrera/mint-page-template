import ReactMarkdown from 'react-markdown'
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { maxWidth, wrapWords } from 'styles/styles.css'
import { MintAndPresaleComponent } from '@components/MintAndPresaleComponent'
import { MintDetails } from '@components/MintDetails'
import { useERC721DropContract } from 'providers/ERC721DropProvider'
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

const Well = ({borderColor, style, children}) => {

  return (
  <div style={{borderColor: borderColor, borderWidth: 2 ,borderStyle: 'solid', borderRadius: 30, ...style}}>
  {children}
  </div>
  );
}

export function CollectionInner({
  username,
  textColor,
  accentColor
}: {
  username?: string
  textColor?: string
  accentColor?: string
}) {
  const collectionContext = useERC721DropContract()
  const { metadata } = useCollectionMetadata(
    collectionContext.contractConfig.metadataRenderer
  )
  const metadataDetails = metadata.metadataDetails

  let description = '...'
  try {
    description = JSON.parse(`"${metadataDetails?.description || '...'}"`)
  } catch (e) {
    description = metadataDetails?.description || '...'
  }

  const { disconnect } = useDisconnect()


  return (
    <Flex
      mt="x3"
      align="center"
      direction={{ '@initial': 'column', '@768': 'row-reverse' }}
      gap="x1"
      p={{ '@initial': 'x1', '@576': 'x10' }}
      w="100%"
      //style={[{ maxWidth: 1360, margin: 'auto', minHeight: '80vh' }]}
      style={assignInlineVars({ [collectionAccentColor]: 'pink' })}
    >
      <Flex flex={{ '@initial': '1', '@1024': '1' }}  justify="center">
        <Box position="relative" w="100%"
          className={styles.mediaContainer}
        >
            <CollectionMedia
              className={styles.mediaItem}
              metadata={metadataDetails}
              borderRadius="curved"
              objectFit="cover"
              collection={collectionContext}
            />
          </Box>

      </Flex>
      <Box flex={{ '@initial': '1', '@1024': 'none' }} className={maxWidth} p="x4">
        <Stack gap="x2" mb="x3">
          <Text variant="display-md" mb="x2" style={{color: accentColor}}>
            {collectionContext.name}
          </Text>
          <Paragraph className={wrapWords} mb="x2" style={{color: textColor, opacity: '80%'}}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </Paragraph>
        </Stack>

        <Box>
          {collectionContext != null ? (
            <>
              <MintAndPresaleComponent collection={collectionContext} textColor={textColor} accentColor={accentColor}/>

              <Box      style={assignInlineVars({ [collectionAccentColor]: 'pink' })}>
                {true && (
                  <Well borderColor={accentColor} style={{paddingLeft: 20, paddingRight: 20, padddingTop: 5, marginTop: 10, marginBottom: 10}}>
                    <Flex justify="space-between" align="center">
                      <Text fontSize={14} style={{color: textColor}}>Logged in as {username}</Text>
                      <Button
                        pill
                        variant="ghost"
                        onClick={disconnect}
                        positive="relative"
                        style={{ left: vars.space.x5 }}
                      >
                        {/* need an on hover */}
                        <Box as="span" fontSize={14} style={{color: textColor}}>
                          Disconnect
                        </Box>
                      </Button>
                    </Flex>
                  </Well>
                )}
              </Box>
              <Well borderColor={accentColor} style={{paddingLeft: 20, paddingRight: 20, padddingTop: 10, marginTop: 20, marginBottom: 20}}>
                <MintDetails collection={collectionContext} hideToggle={true} accentColor={accentColor} textColor={textColor}/>
              </Well>
            </>
          ) : (
            <Paragraph align="center" mt="x8">
              <SpinnerOG />
            </Paragraph>
          )}
        </Box>
      </Box>
    </Flex>
  )
}
