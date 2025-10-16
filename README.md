<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1jR1-vlcSq_P5nnkvijYMPwQ6LebHKEK8

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Google Business API Setup

To properly connect to the Google Business Management API and avoid 401 unauthorized errors:

1. **Enable the Google Business Profile API** in your Google Cloud Console
2. **Create OAuth 2.0 credentials** in Google Cloud Console
3. **Add the following scope** to your OAuth consent screen:
   - `https://www.googleapis.com/auth/business.manage`
4. **Set environment variables** in your `.env.local` file:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret  # Only for development - use backend in production
   GOOGLE_REDIRECT_URI=your_redirect_uri  # Optional: specific redirect URI, defaults to window.location.origin
   ```
5. **Configure authorized redirect URIs** in Google Cloud Console to include your application's URL:
   - For development: `http://localhost:3000` (or your actual dev server port)
   - For production: your production URL (e.g., `https://yourdomain.com`)

**Important:** For production use, the OAuth token exchange should happen on your backend server to protect your client secret. The current frontend implementation is for development purposes only.

### Troubleshooting redirect_uri_mismatch error:

If you encounter a `redirect_uri_mismatch` error:

1. Ensure the redirect URI in Google Cloud Console exactly matches your application URL
2. Include the protocol (http/https) and port number if applicable
3. For development, common URIs are:
   - `http://localhost:3000` (if using port 3000)
   - `http://localhost:5173` (if using Vite default port)
4. Set the `GOOGLE_REDIRECT_URI` environment variable if using a custom redirect URI
5. Check that there are no trailing slashes or additional paths
