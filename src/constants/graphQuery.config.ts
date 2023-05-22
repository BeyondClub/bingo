
export const GraphQueryConfig = {
  opensea_buyer: {
    api_url: `https://gateway.thegraph.com/api/${process.env.GRAPH_API}/subgraphs/id/AwoxEZbiWLvv6e3QdvdMZw4WDURdGbvPfHmZRc8Dpfz9`,
    req_body: `query($wallet: String){
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
    req_body: `query($wallet: String){
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
    req_body: `query($wallet: String){
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
    req_body: `query($wallet: String){
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
    req_body: `query($wallet: String){
            results: swaps( first: 51 where:{
              from:$wallet

            }){
              id
            }
        }`,
    response_variable: 'results',
    response_condition: 'array_length',
  },
}
