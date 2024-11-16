import { 
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
 } from "@react-email/components";

interface VerificationEmailProps {
    username : string;
    otp : string;
}


export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Preview>Verification Email</Preview>
            <Section>
                <Heading>Welcome to Messenger</Heading>
                <Text>Your username is {username}</Text>
                <Text>Your OTP is {otp}</Text>
                <Button>Verify</Button>
            </Section>
        </Html>
    );
}