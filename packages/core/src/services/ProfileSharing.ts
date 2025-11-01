import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Profile } from '../types/profile';
import { pathManager } from '../utils/paths';
import { generateShareCode, parseShareCode } from '../utils/shareCode';

/**
 * Profile Sharing Service
 * Enables sharing profiles across machines via GitHub Gist
 */
export class ProfileSharing {
  private static instance: ProfileSharing;
  private readonly GIST_API = 'https://api.github.com/gists';

  private constructor() {}

  static getInstance(): ProfileSharing {
    if (!ProfileSharing.instance) {
      ProfileSharing.instance = new ProfileSharing();
    }
    return ProfileSharing.instance;
  }

  /**
   * Share a profile via GitHub Gist
   * Requires GITHUB_TOKEN environment variable or ~/.vibecode/github-token file
   * @param profileName - Name of the profile to share
   * @returns Share code (e.g., VIBE-ABC123)
   */
  async shareProfile(profileName: string): Promise<string> {
    try {
      // Get GitHub token (will run interactive setup if needed)
      const token = await this.getGitHubToken();
      
      if (!token) {
        throw new Error('GitHub token setup cancelled.');
      }

      // Read profile
      const profilePath = path.join(
        pathManager.getProfilesDir(),
        profileName,
        'profile.json'
      );

      if (!(await fs.pathExists(profilePath))) {
        throw new Error(`Profile "${profileName}" not found`);
      }

      const profile: Profile = await fs.readJson(profilePath);

      // Prepare Gist payload
      const gistPayload = {
        description: `VibeCode Profile: ${profile.name} - ${profile.metadata.description || 'Shared profile'}`,
        public: true,
        files: {
          'vibecode-profile.json': {
            content: JSON.stringify(profile, null, 2),
          },
        },
      };

      // Create Gist with authentication
      const response = await axios.post(this.GIST_API, gistPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const gistId = response.data.id;
      const shareCode = generateShareCode(gistId);

      return shareCode;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; statusText: string } };
        if (axiosError.response.status === 401) {
          throw new Error(
            'GitHub authentication failed. Please check your token.\n' +
            'Get a new token from: https://github.com/settings/tokens (select "gist" scope)'
          );
        }
        throw new Error(
          `GitHub Gist API error: ${axiosError.response.status} - ${axiosError.response.statusText}`
        );
      }
      throw error;
    }
  }

  /**
   * Get GitHub token from environment or config file
   * If not found, run interactive setup
   */
  private async getGitHubToken(): Promise<string | null> {
    // Try environment variable first
    if (process.env.GITHUB_TOKEN) {
      return process.env.GITHUB_TOKEN;
    }

    // Try config file
    const tokenPath = path.join(pathManager.getVibeCodeDataDir(), 'github-token');
    if (await fs.pathExists(tokenPath)) {
      const token = await fs.readFile(tokenPath, 'utf-8');
      return token.trim();
    }

    // Interactive setup
    return await this.interactiveTokenSetup();
  }

  /**
   * Interactive GitHub token setup
   * Opens browser and prompts user for token
   */
  private async interactiveTokenSetup(): Promise<string> {
    const readline = await import('readline');
    const open = (await import('open')).default;

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  ⚠  GitHub Token Required (One-Time Setup)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('To share profiles, you need a GitHub token.');
    console.log('This takes 2 minutes and only needs to be done once.\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Show options
    console.log('[1] 🌐 Auto-open GitHub (recommended)');
    console.log('[2] 📝 I already have a token');
    console.log('[3] ❌ Cancel\n');

    const choice = await new Promise<string>((resolve) => {
      rl.question('Choose option (1-3): ', resolve);
    });

    if (choice === '3') {
      rl.close();
      throw new Error('Sharing cancelled. You can export to file instead:\n  vibecode profile export <name>');
    }

    // Auto-open browser
    if (choice === '1') {
      const tokenUrl = 'https://github.com/settings/tokens/new?scopes=gist&description=VibeCode+Profile+Sharing';
      
      console.log('\n✓ Opening browser...');
      console.log(`  ${tokenUrl}\n`);
      
      try {
        await open(tokenUrl);
      } catch (error) {
        console.log('⚠ Could not auto-open browser. Please visit the URL above manually.\n');
      }

      console.log('Instructions:');
      console.log('  1. Click "Generate token" (green button at bottom)');
      console.log('  2. Copy the token (starts with ghp_...)');
      console.log('  3. Paste it below\n');
    } else if (choice === '2') {
      console.log('\nPaste your GitHub token below:\n');
    }

    // Prompt for token
    const token = await new Promise<string>((resolve) => {
      rl.question('Paste token: ', resolve);
    });
    rl.close();

    const cleanToken = token.trim();

    // Validate token format
    if (!cleanToken.startsWith('ghp_') && !cleanToken.startsWith('github_pat_')) {
      throw new Error(
        'Invalid token format. GitHub tokens start with "ghp_" or "github_pat_".\n' +
        'Get a new token from: https://github.com/settings/tokens'
      );
    }

    // Save token
    const tokenPath = path.join(pathManager.getVibeCodeDataDir(), 'github-token');
    await fs.writeFile(tokenPath, cleanToken, 'utf-8');

    console.log('\n✓ Token saved to ~/.vibecode/github-token');
    console.log('✓ You can now share profiles!\n');

    return cleanToken;
  }

  /**
   * Import a profile from a share code
   * @param shareCode - Share code (e.g., VIBE-ABC123)
   * @param targetName - Optional custom name for imported profile
   * @returns Imported profile
   */
  async importProfile(shareCode: string, targetName?: string): Promise<Profile> {
    try {
      // Parse share code to get Gist ID
      const gistId = parseShareCode(shareCode);

      // Fetch Gist
      const response = await axios.get(`${this.GIST_API}/${gistId}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      // Extract profile content
      const files = response.data.files;
      const profileFile = files['vibecode-profile.json'];

      if (!profileFile) {
        throw new Error('Invalid share code: profile data not found in Gist');
      }

      const profile: Profile = JSON.parse(profileFile.content);

      // Use custom name if provided
      if (targetName) {
        profile.name = targetName;
      }

      // Add import metadata
      profile.metadata.updatedAt = new Date().toISOString();
      profile.metadata.description = `${profile.metadata.description || ''} (Imported via ${shareCode})`.trim();

      // Save to local profiles directory
      const profileDir = path.join(pathManager.getProfilesDir(), profile.name);
      await fs.ensureDir(profileDir);
      await fs.writeJson(path.join(profileDir, 'profile.json'), profile, {
        spaces: 2,
      });

      return profile;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; statusText: string } };
        if (axiosError.response.status === 404) {
          throw new Error('Invalid share code: Gist not found');
        }
        throw new Error(
          `GitHub Gist API error: ${axiosError.response.status} - ${axiosError.response.statusText}`
        );
      }
      throw error;
    }
  }

  /**
   * Get profile info from share code without importing
   * @param shareCode - Share code (e.g., VIBE-ABC123)
   * @returns Profile metadata
   */
  async getProfileInfo(shareCode: string): Promise<{
    name: string;
    description: string;
    extensionCount: number;
    createdAt: string;
    theme?: string;
  }> {
    try {
      const gistId = parseShareCode(shareCode);

      const response = await axios.get(`${this.GIST_API}/${gistId}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      const files = response.data.files;
      const profileFile = files['vibecode-profile.json'];

      if (!profileFile) {
        throw new Error('Invalid share code: profile data not found');
      }

      const profile: Profile = JSON.parse(profileFile.content);

      return {
        name: profile.name,
        description: profile.metadata.description || 'No description',
        extensionCount: profile.extensions.list.length,
        createdAt: profile.metadata.createdAt,
        theme: profile.theme,
      };
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response.status === 404) {
          throw new Error('Invalid share code: Gist not found');
        }
      }
      throw error;
    }
  }
}

export const profileSharing = ProfileSharing.getInstance();
