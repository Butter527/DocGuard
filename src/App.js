// Landing Page
import architecture from './archdiagram.png';
import team from './meettheteam.png';
import './App.css';

import * as React from "react";
import axios, * as others from 'axios';
import ContentLayout from "@cloudscape-design/components/content-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Tabs from "@cloudscape-design/components/tabs";
import Box from "@cloudscape-design/components/box";
import Input from "@cloudscape-design/components/input";
import Grid from "@cloudscape-design/components/grid";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import ExpandableSection from "@cloudscape-design/components/expandable-section";

// Main piece of JS that creates the HTML and CSS
function App () {
  const [value, setValue] = React.useState("Type message here...");
  const [chatHistory, setChatHistory] = React.useState([]);

  const callAPI = async () => {
    try {
      // Your API endpoint URL
      const apiUrl = 'https://buxasvwlm2.execute-api.us-east-1.amazonaws.com/prod2';
      // Your request body
      const requestBody = {
        "prompt" : value,
        "k" : 2
      };
      // Making a GET request with query parameters
      const response = await fetch(apiUrl, {
        body: JSON.stringify(requestBody),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();

        setChatHistory(prevArray => [...prevArray, [data['prompt'], data['response'], data['citations']]]);
      } else {
        // Handle error cases
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error occurred during API request', error);
    }
  }


  const handleButtonClick = () => {
    const inputText = value;

    const apiReturn = callAPI();

    setValue("");
  }

  const ChatWindow = ({ children }) => {
    return (
      <div style={{height: '500px' }}>
        {children}
      </div>
    );
  };

  const TextBox = ({ text }) => {
    return (
      <Container>
      {text}
      </Container>
    );
  };

  const TextBoxWithCitation = ({ text, citation }) => {
    return (
      <Container>
        {text}
        <ExpandableSection headerText="Citations">
          {citation}
        </ExpandableSection>
      </Container>
    );
  };

  return (
    // 
    <ContentLayout
      header={
        <SpaceBetween size="l">
          <Header
            variant="h1"
          >
          DocGuard
          </Header>
        </SpaceBetween>
      }
      >
      <Container>
        <Tabs
        tabs={[
          {
            label: "Home",
            id: "first",
            content: 
            <Container>
                <Grid
                  gridDefinition={[{ colspan: 2 }, { colspan: 8 }, { colspan: 2 }]}
                >
              <Box></Box>
              <ChatWindow>
                  <Container fitHeight={true}>
                    <ColumnLayout borders="horizontal" columns={2}>
                      <TextBox text = 'Welcome to DocGuard, please ask a question.'></TextBox>
                      {chatHistory.map((chat) => (
                        <>
                          <div></div>
                          <div></div>
                          <TextBox text={chat[0]}/>
                          <TextBoxWithCitation text={chat[1]} citation = {chat[2]}/>
                        </>
                      ))}
                      <div></div>
                    </ColumnLayout>
                  </Container>
              </ChatWindow>
              <Box></Box>
              </Grid>
              <Grid
                gridDefinition={[{ colspan: 2 }, { colspan: 7 }, { colspan: 1 }, { colspan: 2 }]}
              >
                <Box></Box>
                <Input
                  onChange={({ detail }) => setValue(detail.value)}
                  onFocus={() => setValue("")}
                  value={value}
                >
                </Input>
                <Button 
                  variant="primary"
                  onClick={handleButtonClick}
                >
                  Send
                </Button>
            </Grid>
          </Container>
          },
          {
            label: "About DocGuard",
            id: "second",
            content:
            <Container>
            <Grid
                gridDefinition={[{ colspan: 1 }, { colspan: 10 }, { colspan: 1}]}
            >
              <div></div>
              <Container>
                <SpaceBetween direction="vertical" size="s">
                  <SpaceBetween direction="vertical" size="xxs">
                    <Box variant="h2">
                    </Box>
                    <Box fontSize="display-l" fontWeight="bold">Problem Statement</Box>
                  </SpaceBetween>
                  <Box variant="p">
                  For healthcare professions to ensure that compliance is met in the field, they must refer to hundreds of compliance documentation or wait for someone who is senior to answer their compliance related questions. Employees in the healthcare industry have the duty of ensuring that the private information of their patients are protected, but for some, they only have a short amount of time to determine if something is meeting compliance. Going through ample amounts of documentation, searching the web, or waiting for a supervisor can create a lot of lost time and can push back timelines that are important to a company’s goal.
                  Amazon’s DocGuard is an AI compliance assistant that uses Retrieval Augmented Generation (RAG) to search through your database of internal knowledge. Amazon DocGuard has the opportunity to speed up the process on how healthcare professionals handle compliance related questions by utilizing it’s fast and accurate responses to compliance related questions. 
                  </Box>
                </SpaceBetween>
              </Container>
              <div></div>
            </Grid>
            <Grid
                gridDefinition={[{ colspan: 1 }, { colspan: 10 }, { colspan: 1}]}
            >
              <div></div>
              <Container
                media={{
                  content: (
                    <img
                      src={architecture} 
                      width={845} 
                      height={366}
                    />
                  ),
                  position: "side",
                  width: "40%"
                }}
              >
                <SpaceBetween direction="vertical" size="s">
                  <SpaceBetween direction="vertical" size="xxs">
                    <Box variant="h2">
                    </Box>
                    <Box fontSize="display-l" fontWeight="bold">Solution Overview</Box>
                  </SpaceBetween>
                  <Box variant="p">
                  Amazon DocGuard allows for healthcare professionals to interact with our AI chat-bot by asking specific questions related to healthcare compliance and getting answers back with citations provided. DocGuard utilizes the Retrieval Augmented Generation framework to provide more accurate responses to user’s prompts by retrieving data that is held in a corpus data store with the most accurate and up-to-date information. 
                  There are 3 main components to DocGuard’s architecture:
                  </Box>
                  <Box variant="p">
                    <ul>
                      <li>Offline Data Ingestion: Data will be able to be offloaded into an Amazon S3 bucket and extracted to text be using Amazon Textract.</li>
                      <li>Inference Retrieval with Context: The prompts taken from the frontend will be used along side AWS Lambda, Amazon SageMaker, and Amazon OpenSearch to provide an answer based on the data source.</li>
                      <li>The User Interface: Users will be able to access the bot via a Slack workspace or through the web app that will be hosted on AWS Amplify </li>
                    </ul>
                  At an overview, the services that are being utilized are Amazon SageMaker, Amazon Simple Storage Service S3, AWS Lambda, AWS CloudFormation, Amazon OpenSearch, Amazon API Gateway, and Amazon Textract.
                  </Box>
                </SpaceBetween>
              </Container>
              <div></div>
            </Grid>
            <Grid
                gridDefinition={[{ colspan: 1 }, { colspan: 10 }, { colspan: 1}]}
            >
              <div></div>
              <Container>
                <SpaceBetween direction="vertical" size="s">
                  <SpaceBetween direction="vertical" size="xxs">
                    <Box variant="h2">
                    </Box>
                    <Box fontSize="display-l" fontWeight="bold">Next Steps</Box>
                  </SpaceBetween>
                  <Box variant="p">
                  Amazon DocGuard is still in its initial phases therefore there are many additions and milestones to look for in the future. Below are some items included in our future road map.
                  <ul>
                    <li>Improve functionality to support conversations by relying on previous questions/answers for context</li>
                    <li>Modify model to suit other compliance regulations</li>
                    <li>Create the automatic polling of regulatory sites to update corpus data store when regulations are modified</li>
                    <li>Offer enhanced metadata behind citations</li>
                    <li>Present and share DocGuard with the AWS NP healthcare team</li>
                  </ul>

                  </Box>
                </SpaceBetween>
              </Container>
              <div></div>
            </Grid>
            </Container>
          },
          {
            label: "Meet the Team",
            id: "third",
            content:
            <Container>
                <img
                  src={team} 
                  width={806} 
                  height={406}
                />
          </Container>
          },
          {
            label: "FAQs",
            id: "fourth",
            content:
            <Container>
              <Box fontSize="display-l" fontWeight="bold">
              Frequently Asked Questions
              </Box>
              <ExpandableSection headerText="Why can’t I just use ChatGPT?">
              Compliance related information on ChatGPT are often outdated and 
              doesn’t always contain the right information for the correct documents.
              As a third party website, ChatGPT also saves chat history and data which 
              may go against company policies. DocGuard is made specifically for compliance documents. 
              The data stored by DocGuard will be stored in the company’s own infrastructure to maintain 
              security. Information stored in DocGuard are updated regularly to ensure the program gives 
              the most recent answer and all answers given by the chatbot will be cited.
              </ExpandableSection>
              <ExpandableSection headerText="How does DocGuard extract data from compliance documents?">
              DocGuard relies on embedding to transform text to a given numerical representation in a vector space. 
              This is done so using Amazon Textract to extract this information from provided compliance documents. 
              Amazon Textract uses Machine Learning to accurately extract text from PDFs, images, table, forms, etc
              </ExpandableSection>
              <ExpandableSection headerText="How does DocGuard work with other AWS services?">
              DocGuard uses Amazon Kindra to create the chatbot infrastructure, Amazon Textract to extract information
              from compliance documents, Amazon S3 to store the large volumes of data, Amazon Sagemaker to train our machine
              learning model, Amazon DynamoDB to store user questions and responses, and AWS Lamba to automate the backend API calls.
              </ExpandableSection>
              <ExpandableSection headerText="What type of compliance documents does this program support?">
              For its initial release, DocGuard is trained on a narrow selection of compliance documents, HIPPA and the HITECH Act. 
              However, as time progresses DocGuard is expected to expand its support to additional healthcare compliance laws and potentially other industries as well.
              </ExpandableSection>
              <ExpandableSection headerText="How can this program improve over time?">
              Similar to other prominent large language models, DocGuard will rely on reinforcement learning for fine-tuning. Each time a user receives a response, 
              they will have the ability to define the answer as satisfactory or unsatisfactory and with that feedback, the model will be guided to be more aligned 
              with acceptable responses. Additionally, as the process for training the LLM improves, DocGuard could also expand from the health care industry to other 
              verticals such as finance, construction, or education.
              </ExpandableSection>
              <ExpandableSection headerText="What is the idea/vision?">
              DocGuard responds to questions about compliance questions with the most updated information 
              and links in seconds. AWS healthcare customers can use DocGuard to quickly get answers to their 
              compliance questions. This is especially helpful for healthcare professionals that may not have 
              the time to search through compliance documentation. Less time spent on searching for answers means 
              more time spent on patient care. DocGuard will complement existing sources of public and private 
              information such as CMS.gov.
              </ExpandableSection>
              <ExpandableSection headerText="Is it secure?">
              It is compliant with enterprise grade data protection. Data is encrypted 
              in transit and at rest (will we be compliant with HIPAA, ISO, SOC?)
              </ExpandableSection>
              <ExpandableSection headerText="Could this concept work with other industries besides healthcare?">
              Yes, this concept can be translated to other industries as well. Every business is subjected to following some 
              form of compliance so the audience is endless.
              </ExpandableSection>
              <ExpandableSection headerText="If successful, how big could this be? Why is it a good business?">
              If successful, this tool could save minutes/hours during times that could be critical. When working with patients, 
              looking through compliance documentation could take up valuable time that cannot be wasted. DocGaurd could help increase 
              the time spent caring for their patients while maintaining compliance. This is a good business because it can help a very 
              big audience aka healthcare. Time is critical in medicine and being able to give some of it back could make all the difference.
              </ExpandableSection>
              <ExpandableSection headerText="What customer problems are we solving? Why now?">
              We are solving the problem where healthcare professionals need to take a lot of their time searching for answers to compliance 
              questions or wait a long time for responses from office managers regarding updated regulations. We are also solving the problem 
              where it is difficult to keep up with the continually growing amount of information on updates and new healthcare governance and 
              compliance. Both healthcare professionals and patients face this problem. We are solving this problem now because AWS customers are 
              rapidly innovating on the cloud. Healthcare compliance, governance, and regulations are also continually publishing updates. This has 
              resulted in customers asking account teams more and more questions about using AI to keep up with the changes. Healthcare professionals 
              spend time searching and answering repetitive compliance questions, but this process can be automated.
              </ExpandableSection>
              <ExpandableSection headerText="Why should customers care? How is this better than what already exists?">
              Customers should care because DocGuard reduces the need to read pages and pages of compliance documentation. Customers want to use AWS 
              services instead of spending time reading documentation from many sources. DocGuard is better than generative AI such as ChatGPT because it 
              only pulls the most relevant snippets from your content. Answers include citations, you can fact check and dig deeper into the original content you provide. 
              DocGuard is better than question and answer communities such as Quora or Google because it will provide the most up to date information. It will also retrieve 
              answers based on several sources of information.
              </ExpandableSection>
              <ExpandableSection headerText="What types of customers is this product intended towards?">
              This product is intended for those in the healthcare field that face questions regarding compliance. This could span from doctors to nurses, healthcare admin, 
              compliance officers, the list can go on.  
              </ExpandableSection>
              <ExpandableSection headerText="What kind of guidance do you have with this project idea?">
              We have guidance from the Head SA of NP healthcare, Jason Mark, and his few of his connections. He brought up how this is a pain-point for a lot of his customers 
              and is eager to find a way to help them.
              </ExpandableSection>
              <ExpandableSection headerText="What decisions and guidance do we need today?">
              The decisions and guidance we need today include the data ingestion for DocGuard and how 
              to best format the responses from DocGuard. 
              </ExpandableSection>
            </Container>
          },
        ]}
        />
        </Container>
    </ContentLayout>
  );
}

export default App;
