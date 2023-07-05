import { gql } from 'graphql-request';

export const GraphQueryConfig = {
  opensea_buyer: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/AwoxEZbiWLvv6e3QdvdMZw4WDURdGbvPfHmZRc8Dpfz9`,
    req_body: gql`
        query($wallet: String){
            results: trades(where:{
                buyer: $wallet
              }){
                transactionHash
              }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  opensea_seller: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/AwoxEZbiWLvv6e3QdvdMZw4WDURdGbvPfHmZRc8Dpfz9`,
    req_body: gql`query($wallet: String){
            results: trades(where:{
                seller: $wallet
              }){
                transactionHash
              }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  uniswap_swap: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7`,
    req_body: gql`query($wallet: String){
            results: swaps( first: 51 where:{
              from:$wallet

            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  sushiswap_swap: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/7h1x51fyT5KigAhXd8sdE3kzzxQDJxxz1y66LTFiC3mS`,
    req_body: gql`query($wallet: String){
            results: swaps( first: 51 where:{
              from:$wallet

            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  curve_swap: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/GAGwGKc4ArNKKq9eFTcwgd1UGymvqhTier9Npqo1YvZB`,
    req_body: gql`query($wallet: String){
            results: swaps( first: 51 where:{
              from:$wallet

            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  aave_lend: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/HB1Z2EAw4rtPRYVb2Nz8QGFLHCpym6ByBX6vbCViuE9F`,
    req_body: gql`query($wallet: String){
            results: deposits( first: 51 where:{
              account:$wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  compound_lend: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/6tGbL7WBx287EZwGUvvcQdL6m67JGMJrma3JSTtt5SV7`,
    req_body: gql`query($wallet: String){
            results: deposits( first: 51 where:{
              account:$wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  yearn_deposit: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/3CDiQ2hSrftreri8FLqsVAVTv9QNkEBszGZiDdmL4UQJ`,
    req_body: gql`query($wallet: String){
            results: deposits( first: 51 where:{
              from: $wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  rocketpool_stake: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/S9ihna8D733WTEShJ1KctSTCvY1VJ7gdVwhUujq4Ejo`,
    req_body: gql`query($wallet: String){
            results: stakers(first: 5, where:{
              id: $wallet
            }) {
              id
              rETHBalance
              avgEntry
              AvgEntryTime
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  curve_liquidity: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/GAGwGKc4ArNKKq9eFTcwgd1UGymvqhTier9Npqo1YvZB`,
    req_body: gql`query($wallet: String){
            results: deposits(first: 50, where:{
              from: $wallet
            }){
              from
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  sushiswap_liquidity: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/7h1x51fyT5KigAhXd8sdE3kzzxQDJxxz1y66LTFiC3mS`,
    req_body: gql`query($wallet: String){
            results: deposits(first: 50, where:{
              from: $wallet
            }){
              from
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  snapshot_vote: {
    api_url: `https://hub.snapshot.org/graphql`,
    req_body: gql`query Votes($wallet: String!)
    {
      results: votes(
        first: 1
        where: {voter: $wallet}
      ) {
        id
      }
    }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  dodoex_swap: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/GxV9XL6Wnjz75z919NPNdrLhEkqDR99PweUY3oh7Lh94`,
    req_body: gql`query($wallet: String){
            results: transactions(first: 101, where:{
              from: $wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  hopprotocol_exchange: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/Cjv3tykF4wnd6m9TRmQV7weiLjizDnhyt6x2tTJB42Cy`,
    req_body: gql`query($wallet: String){
            results: transfers(first: 101, where:{
              from: $wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  connextnetwork_bridge: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/DfD1tZSmDtjCGC2LeYEQbVzj9j8kNqKAQEsYL27Vg6Sw`,
    req_body: gql`query($wallet: String){
            results: destinationTransfers(first: 101, where:{
              originSender: $wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  deposit_pooltogether: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/6v8a77TMhCrSECtSdTAAitCnrqg7cqHuYSDfwoFLhDe2`,
    req_body: gql`query($wallet: String){
            results: prizePoolAccounts(first: 101, where:{
              account: $wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  nftx_buy: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc`,
    req_body: gql`query($wallet: String){
            results: deposits(first: 101, where:{
              user: $wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
  nftx_sell: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc`,
    req_body: gql`query($wallet: String){
            results: withdrawals(first: 101, where:{
              user: $wallet
            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
}
