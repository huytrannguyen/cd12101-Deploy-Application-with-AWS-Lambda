import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('auth')

const jwksUrl = 'https://test-endpoint.auth0.com/.well-known/jwks.json'
const certificate = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJaxqeZvm82wteMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi15cXpqMmw3cDRybjdsMDVjLnVzLmF1dGgwLmNvbTAeFw0yNDA4MjAx
MjE2MjFaFw0zODA0MjkxMjE2MjFaMCwxKjAoBgNVBAMTIWRldi15cXpqMmw3cDRy
bjdsMDVjLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAKlYLRnTtOHOTC+k6O3PQpbmiCiEiABlhoxioIGTarlP1nEpcFFwikbKIz+d
YqumJ/zUljfBC8VhoaCDTY9X9iw7Qhf0HQ8TQAQnirJHmf0eGxajzGF1o0Atdvv9
Wf5SN3S1ZDBMcrsd9b9QQHpfrqMrrWA45nqmagSI0e8lsLY8DKJeb0/qfBJK6XeR
3oMQcKhSTs2JIA+A11MfHfUMmk4q0NWsUGDbzXGl42Qqsiixk4B+MuUeaj0cnIS6
FPC2F/xFYZ0/31Gu8ZDaxg5zG00feBTzs/dA5zAHHCi7IA34iolJZweNmJQycNPQ
0r7x1De+VGTeKveGghpqEmi5JXkCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQU6fChi8bzs8aFGAcehu1hpycxGtowDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQAZAFmiiekJuNQilIqGVl4GW8uWz3x8C3t75JmrV2KX
psYXGblSmEncaNVRBKGe6C8vy1ryDs1ZfIhYq9vixnIsI/b/nbUssD1J0wddYRbk
nqb4MpZY+w2HtwxjAtliXcaOuOXT6NKT+/g3XXlCeppoLM5H7ahHUh+v++azDRHV
OdEtCmEsPCHoE6G2t9hXG+4OFQ5+kcBTZnkCeMKrR0cdR9n5wvLc5JEbRTq6XECK
go0d5zu4fzX8j3koXZU/M/DPb9aDJbeOuDa/pW8N+SsVdiJQ+ChgD/9724cSHdGd
4y/wvPl7mZBAsA556Vt1cFtL67hOe4kNrOfhTrp4xhn2
-----END CERTIFICATE-----`

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader) {
  const token = getToken(authHeader)

  // TODO: Implement token verification
  return jsonwebtoken.verify(token, certificate, { algorithms: ['RS256'] })
}

function getToken(authHeader) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
