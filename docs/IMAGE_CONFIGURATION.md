# Image Configuration Guide

This project supports different image sources for development and production environments.

## Development (Local Images)

During development, images are served locally from the `public/images/` directory:

```
public/images/
├── attorneys/         # Attorney profile photos
├── banner/            # Hero/banner images
└── defaults/          # Fallback images (always local)
```

## Production (S3/CDN Images)

For production, configure environment variables to use S3 or CDN:

### Environment Setup

Create `.env.production.local` (not tracked in git):
```bash
VITE_IMAGE_BASE_URL=https://swartz-campbell.s3.amazonaws.com
VITE_ENVIRONMENT=production
```

### S3 Bucket Structure

Your S3 bucket should mirror the local structure:
```
your-bucket/
├── images/
│   ├── attorneys/
│   │   ├── michael-giblin.jpg
│   │   ├── kathleen-carson.jpg
│   │   └── ...
│   └── banner/
│       ├── philly_1.png
│       ├── philly_2.png
│       └── philly_3.png
```

### S3 Bucket Configuration

1. **Public Read Access**: Enable public read for the images folder
2. **CORS Configuration**:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": []
  }
]
```

### CloudFront CDN (Recommended)

For better performance, use CloudFront:
```bash
VITE_IMAGE_BASE_URL=https://d123456789.cloudfront.net
```

## Image URL Resolution

The system automatically chooses the correct image source:

- **Development**: `http://localhost:5173/images/attorneys/john-smith.jpg`
- **Production**: `https://your-cdn.com/images/attorneys/john-smith.jpg`

## Fallback System

- Default images (SVG silhouettes) are always served locally
- If S3 images fail to load, fallback images are displayed
- No broken images are ever shown to users

## Deployment Checklist

1. ✅ Upload images to S3 bucket
2. ✅ Configure bucket permissions
3. ✅ Set up CloudFront (optional)
4. ✅ Set environment variables in hosting platform
5. ✅ Test image loading in production
6. ✅ Verify fallback images work