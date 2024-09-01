import { NextResponse, type NextRequest } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function GET(request: NextRequest) {
    try {
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const s3BucketName = process.env.AWS_S3_BUCKET_NAME;

        if (!accessKeyId || !secretAccessKey || !s3BucketName) {
            console.error('Missing AWS credentials or bucket name');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const searchParams = request.nextUrl.searchParams;
        const fileName = searchParams.get('fileName');
        const contentType = searchParams.get('contentType');

        if (!fileName || !contentType) {
            console.error('Missing fileName or contentType');
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const client = new S3Client({
            region: 'ap-southeast-2',
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });

        const command = new PutObjectCommand({
            Bucket: s3BucketName,
            Key: fileName,
            ContentType: contentType,
        });

        const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

        if (signedUrl) {
            return NextResponse.json({ signedUrl });
        } else {
            console.error('Failed to generate signed URL');
            return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in presigned URL generation:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}