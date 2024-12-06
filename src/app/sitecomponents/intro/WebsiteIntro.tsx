import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {Upload, Clock, Link2, Shield, FileArchive} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Welcome to ZeeZip - Fast & Secure File Sharing',
    description: 'QuickShare allows you to upload and share files securely with 24-hour download links. Perfect for images, videos, and documents.',
    openGraph: {
        title: 'QuickShare - Fast & Secure File Sharing',
        description: 'Upload and share files securely with 24-hour download links. Perfect for images, videos, and documents.',
        images: [{ url: '/og-image.jpg' }],
    },
}

export default function WebsiteIntro() {
    return (
        <div className="container mx-auto py-36">

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                <FeatureCard
                    icon={<Upload className="h-8 w-8 mb-2" />}
                    title="Easy Upload"
                    description="Upload any file type - images, videos, documents, and more"
                />
                <FeatureCard
                    icon={<Clock className="h-8 w-8 mb-2" />}
                    title="24-Hour Links"
                    description="Get secure download links valid for one day"
                />
                <FeatureCard
                    icon={<FileArchive className="h-8 w-8 mb-2" />}
                    title="Zip your Files"
                    description="Download all your Files as a Zip"
                />
                <FeatureCard
                    icon={<Shield className="h-8 w-8 mb-2" />}
                    title="Secure Transfer"
                    description="Your files are encrypted and protected during transfer"
                />
            </div>

            <Card >
                <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Upload your file (up to 200MB is free)</li>
                        <li>Get a secure download link</li>
                        <li>Share the link with your recipients</li>
                        <li>Recipients can download the file within 24 hours</li>
                        <li>After 24 hours, the link expires for security</li>
                    </ol>
                </CardContent>
            </Card>
            {/*<div className="text-center">*/}
            {/*    <Button size="lg">Start Sharing Now</Button>*/}
            {/*</div>*/}
        </div>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <Card className="relative z-1 border-none">
            <img className="absolute z-0 inset-0 m-auto" src="/images/hexa-bg.png" alt="bg"/>
            <CardHeader>
                <CardTitle className="flex flex-col items-center">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    )
}