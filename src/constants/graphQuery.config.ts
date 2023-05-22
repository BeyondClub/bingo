
// PAOP
// GITPoap
// LENS
//


export const UserProfile = `
  query UserProfile($request: ProfileQueryRequest!) {
    profiles(request: $request){
    items{
      name
      handle
      picture {
        ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        	}
      	}
      }
    }
    }
  }
`

export const GraphQueryConfig = {
    ens: {
        api_url: 'https://gateway.thegraph.com/api/[api-key]/subgraphs/id/EjtE3sBkYYAwr45BASiFp8cSZEvd1VHTzzYFvJwQUuJx',
        req_body: `query($wallet: String){
            results: domains(where:{
                owner:$wallet
            }) {
                name
            }
        }`,
        response_variable: 'results',
        response_condition: 'array_length',
    }
}
