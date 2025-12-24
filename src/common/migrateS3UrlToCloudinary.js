export function migrateS3UrlToCloudinary(
  s3_url,
  cloudinary_base_url = 'https://res.cloudinary.com/duqjwgsfe/image/upload/'
) {
  if (typeof s3_url !== 'string' || typeof cloudinary_base_url !== 'string') {
    return s3_url;
  }

  /**
   * Matches:
   * https://meal-chunk-images-and-videos{ANYTHING}amazonaws.com/{PATH}
   */
  const s3Regex =
    /^https:\/\/meal-chunk-images-and-videos.*amazonaws\.com\/(.+)$/;

  const match = s3_url.match(s3Regex);
  if (!match) return s3_url;

  const resourcePath = match[1];

  // Remove trailing slash from Cloudinary base
  const normalizedCloudinaryBase = cloudinary_base_url.replace(/\/$/, '');

  return `${normalizedCloudinaryBase}/${resourcePath}`;
}
