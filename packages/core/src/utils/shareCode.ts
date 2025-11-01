/**
 * Share Code Generator & Parser
 * Generates codes for sharing profiles using GitHub Gist IDs
 * Format: VIBE-<gist-id> (e.g., VIBE-abc123def456...)
 */

const SHARE_CODE_PREFIX = 'VIBE';

/**
 * Generate a share code from a Gist ID
 * Format: VIBE-<gist-id>
 * 
 * @param gistId - GitHub Gist ID (32-char hex string)
 * @returns Share code (e.g., VIBE-abc123def456...)
 */
export function generateShareCode(gistId: string): string {
  // Simply prefix the Gist ID with VIBE-
  // This makes it clear it's a VibeCode share code
  return `${SHARE_CODE_PREFIX}-${gistId}`;
}

/**
 * Parse a share code to get the original Gist ID
 * 
 * @param shareCode - Share code (e.g., VIBE-abc123def456...)
 * @returns GitHub Gist ID
 */
export function parseShareCode(shareCode: string): string {
  // Validate format
  const cleanCode = shareCode.trim();
  
  if (!cleanCode.startsWith(`${SHARE_CODE_PREFIX}-`)) {
    throw new Error(`Invalid share code format. Expected format: ${SHARE_CODE_PREFIX}-<gist-id>`);
  }

  // Extract Gist ID
  const gistId = cleanCode.substring(SHARE_CODE_PREFIX.length + 1);
  
  if (gistId.length === 0) {
    throw new Error('Invalid share code: missing Gist ID');
  }

  // Validate Gist ID format (should be hex string)
  if (!/^[a-f0-9]+$/i.test(gistId)) {
    throw new Error('Invalid share code: Gist ID must be hexadecimal');
  }

  return gistId;
}

/**
 * Validate share code format
 * 
 * @param shareCode - Share code to validate
 * @returns True if valid
 */
export function isValidShareCode(shareCode: string): boolean {
  try {
    parseShareCode(shareCode);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format a Gist URL as a share code
 * 
 * @param gistUrl - GitHub Gist URL
 * @returns Share code
 */
export function gistUrlToShareCode(gistUrl: string): string {
  // Extract Gist ID from URL
  // Format: https://gist.github.com/<user>/<gistId>
  const match = gistUrl.match(/gist\.github\.com\/[^/]+\/([a-f0-9]+)/i);
  
  if (!match) {
    throw new Error('Invalid Gist URL');
  }

  return generateShareCode(match[1]);
}
