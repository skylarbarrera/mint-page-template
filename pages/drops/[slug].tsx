import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Drop, getAllDropsWithSlug, getDropBySlug } from '../../contentful/api'

import request from 'graphql-request'
import Head from 'next/head'
import { useMemo } from 'react'
import { Stack, Paragraph, ThemeProvider } from '@zoralabs/zord'
import { GetServerSideProps, NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { GET_COLLECTIONS_QUERY, SUBGRAPH_URL } from 'constants/queries'
import { ipfsImage, shortenAddress } from '@lib/helpers'
import { useAccount, useEnsName } from 'wagmi'
import { Collection } from '@components/Collection'
import {useCollectionMetadata} from '@hooks/useCollectionMetadata'


interface HomePageProps {
  drop: Drop & { collection: SubgraphERC721Drop}
}

const HomePage: NextPage<HomePageProps> = ({ drop }) => {
  const { metadata } = useCollectionMetadata(drop.collection.contractConfig.metadataRenderer)
  const ogImage = ipfsImage(drop.collection?.editionMetadata?.imageURI)
  const { address } = useAccount()
  const { data: ensName } = useEnsName({
    address: address,
  })
  const username = useMemo(() => ensName || shortenAddress(address), [address, ensName])

  if (!drop.collection) {
    return (
      <Paragraph py="x5" align="center">
        404, contract not found.
      </Paragraph>
    )
  }

  return (
    <>
      <Head>
        <title>{drop.collection.name}</title>
        <meta name="title" content={`${drop.collection.name}`} />
        <meta
          name="description"
          content={
            metadata.metadataDetails?.description ||
            "ZORA's creator toolkit makes it easy to create an NFT collection, with tooling that scales with your creative ambitions"
          }
        />
        <meta name="og:title" content={`${drop.collection.name}`} />
        <meta
          name="og:url"
          content={`https://create.zora.co/editions/${drop.collection.address}`}
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
        <meta name="twitter:title" content={`${drop.collection.name}`} />
        <meta
          name="twitter:url"
          content={`https://create.zora.co/editions/${drop.collection.address}`}
        />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      {/*  Background Component */}
      <div
        style={{
          background:
            `radial-gradient(66.46% 100.48% at 50% 50%, ${drop.backgroundColor || '#270061'} 0%, #000000 100%)`,
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          padding: 0,
          margin: 0,
          zIndex: -10,
        }}
      />

      <Stack align="center" minH="100vh">

          <Collection key={drop.collection.address} username={username} collection={drop.collection} accentColor={drop.accentColor} textColor={drop.textColor}/>
      </Stack>

    </>
  )
}

export default HomePage





export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  
    // get drop information from backend
  const data = await getDropBySlug({slug: params.slug, preview: false})


  // get zora drop info based on contract address 
  const { erc721Drops } = await request(SUBGRAPH_URL, GET_COLLECTIONS_QUERY, {
    collectionAddresses: [data.drop.contractAddress],
  })

  console.log({
    ...data.drop, 
    collection: erc721Drops[0]
  });

  if (!erc721Drops.length) {
    res.statusCode = 404
  }

  return {
    props: {
      drop: {
        ...data.drop, 
        collection: erc721Drops[0]
      },
    },
  }
}

/*

export async function getStaticProps({ params, preview = false }) {
    console.log('slug: ', params.slug);

  const data = await getDropBySlug(params.slug, preview)
  console.log('this is my drop: ', data)
  return {
    props: {
      preview,
      drop: data?.drop ?? null,
    },
  }
}


export async function getStaticPaths() {
  const allDrops = await getAllDropsWithSlug();
  console.log('all drops')
  console.log(allDrops)
  return {
    paths: allDrops?.map(({ slug }) => `/drops/${slug}`) ?? [],
    fallback: true,
  }
}

*/