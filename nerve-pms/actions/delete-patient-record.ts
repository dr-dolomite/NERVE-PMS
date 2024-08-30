"use server";

import { getPatientByName } from "@/data/user";
import { db } from "@/lib/db";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client
const s3Client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

// Function to delete the image from S3
const deleteImageFromS3 = async (imageUrl: string) => {
    try {
        // Extract the bucket name and key from the image URL
        const urlParts = new URL(imageUrl);

        // Example URL: https://bucket-name.s3.region.amazonaws.com/path/to/image.jpg
        const bucketNameMatch = urlParts.hostname.match(/^(.*?)\.s3\..*\.amazonaws\.com$/);
        if (!bucketNameMatch || bucketNameMatch.length < 2) {
            throw new Error(`Unable to extract bucket name from URL: ${imageUrl}`);
        }

        const bucketName = bucketNameMatch[1];
        const key = decodeURIComponent(urlParts.pathname.substring(1)); // Remove the leading "/" and decode URI

        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const response = await s3Client.send(command);
        console.log(`Image deleted successfully from S3: ${key}`, response);
    } catch (error) {
        console.error("Error deleting image from S3:", error);
        throw error; // Log the actual error for better debugging
    }
};

export const deletePatientRecord = async (name: string) => {
    const existingPatient = await getPatientByName(name);

    if (!existingPatient) {
        return { error: "Patient not found." };
    }

    try {
        // Delete the image from S3 before deleting the record
        if (existingPatient.imageURL) {
            await deleteImageFromS3(existingPatient.imageURL);
        }

        // Delete the patient record from the database
        await db.patientInformation.delete({
            where: { name },
        });

        return { success: "Patient record and associated image deleted." };
    } catch (error) {
        console.error("Error deleting patient record:", error);
        return { error: "Failed to delete patient record. Please try again." };
    }
};
