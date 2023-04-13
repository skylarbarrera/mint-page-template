import request from 'graphql-request'
import Head from 'next/head'
import { useMemo } from 'react'
import { Paragraph, Grid } from '@zoralabs/zord'
import { GetServerSideProps, NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { GET_COLLECTIONS_QUERY, SUBGRAPH_URL } from 'constants/queries'
import { ipfsImage, shortenAddress } from '@lib/helpers'
import { useAccount, useEnsName } from 'wagmi'
import {useCollectionMetadata} from '@hooks/useCollectionMetadata'
import { Drop, getAllDropsForHome } from 'contentful/api'
import { CollectionImageInner } from '@components/CollectionImageInner'
import Link from 'next/link'


interface HomePageProps {
  drops: Drop & {collection: SubgraphERC721Drop}[]
}

const HomePage: NextPage<HomePageProps> = ({ drops }) => {
  const { metadata } = useCollectionMetadata(drops[0].collection.contractConfig.metadataRenderer)
  const ogImage = ipfsImage(drops[0].collection?.editionMetadata?.imageURI)
  const { address } = useAccount()
  const { data: ensName } = useEnsName({
    address: address,
  })
  const username = useMemo(() => ensName || shortenAddress(address), [address, ensName])

  if (!drops.length) {
    return (
      <Paragraph py="x5" align="center">
        404, contract not found.
      </Paragraph>
    )
  }

  return (
    <>
      <Head>
        <title>{drops[0].collection.name}</title>
        <meta name="title" content={`${drops[0].collection.name}`} />
        <meta
          name="description"
          content={
            metadata.metadataDetails?.description ||
            "ZORA's creator toolkit makes it easy to create an NFT collection, with tooling that scales with your creative ambitions"
          }
        />
        <meta name="og:title" content={`${drops[0].collection.name}`} />
        <meta
          name="og:url"
          content={`https://create.zora.co/editions/${drops[0].collection.address}`}
        />
        <meta
          name="og:description"
          content={
            metadata.metadataDetails?.description ||
            "ZORA's creator toolkit makes it easy to create an NFT collection, with tooling that scales with your creative ambitions"
          }
        />
        <meta name="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${drops[0].collection.name}`} />
        <meta
          name="twitter:url"
          content={`https://create.zora.co/editions/${drops[0].collection.address}`}
        />
        <meta name="twitter:image" content={ogImage} />
      </Head>


        <Grid  columns={2} align="center" minH="100vh">
          {drops.map((drop: Drop & {collection: SubgraphERC721Drop}) => {
            return (
              <a  key={drop.collection.address} href={`/drops/${drop.slug}`}>
    
              <CollectionImageInner collection={drop.collection}/>
              </a>
            )
          })}
        </Grid>

    </>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async ({ res }) => {

  // get drops from backend
  const drops = await getAllDropsForHome({preview: false});
  const collectionAddresses = drops.map((drop) => drop.contractAddress.toLowerCase())
  const slugs = drops.map((drop) => drop.slug)


  const { erc721Drops } = await request(SUBGRAPH_URL, GET_COLLECTIONS_QUERY, {
    collectionAddresses: collectionAddresses,
  })


const addys = erc721Drops.map(item => item.address)

  const combinedDropsAndCollections = drops.map((drop) => {

    console.log(drop.contractAddress);
    return {
      ...drop,
      collection: erc721Drops.find(item => {

        if (item.address === drop.contractAddress.toLowerCase()){
          return true;
        } 

       })
    }
    });



  if (!combinedDropsAndCollections.length) {
    res.statusCode = 404
  }

  return {
    props: {
      drops: combinedDropsAndCollections,
    },
  }
}
