// Temporary client-side UI gate, not server authentication.
const expectedHash = '74a79a2f0f860f0193daad790458fd5685c36387a8f9c15d37b6363c563bc0e8'
export async function verifyFacilitatorPassword(password) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('') === expectedHash
}
