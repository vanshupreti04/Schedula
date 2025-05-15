import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";
import Image from 'next/image'

export const Email = ({
  userFirstName,
  duration,
  meetingTime,
  date,
  meetingUrl,
  businessName,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Meeting Scheduled</Preview>
      <Body style={main}>
        <Container>

          {/* Content Section */}
          <Section style={content}>
            <Row>
              <Column>
                <Heading style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}>
                  Hi {userFirstName},
                </Heading>
                <Heading as="h2" style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>
                  Thank you for scheduling a meeting with {businessName},
                </Heading>
                <Text>Please find the meeting details:</Text>
                <Text style={paragraph}><b>Time: </b>{meetingTime}</Text>
                <Text style={{ ...paragraph, marginTop: -5 }}><b>Date: </b>{date}</Text>
                <Text style={{ ...paragraph, marginTop: -5 }}><b>Location: </b>{meetingUrl}</Text>
                <Text style={{ ...paragraph, marginTop: -5 }}><b>Duration: </b>{duration} Minutes</Text>
                <Text style={{ color: "rgb(0,0,0, 0.5)", fontSize: 14, marginTop: -5 }}>
                  *Please join the meeting using the above details: {meetingUrl}
                </Text>
              </Column>
            </Row>

            {/* Join Now Button */}
            <Row style={{ ...boxInfos, paddingTop: "20px" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button} href={meetingUrl}>Join Now</Button>
              </Column>
            </Row>
          </Section>

          <Text style={{ textAlign: "center", fontSize: 12, color: "rgb(0,0,0, 0.7)" }}>
            © 2022 | Meeting Scheduler | All rights reserved
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default Email;

// Styles
const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
  textDecoration: "none",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
  padding: "20px",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
