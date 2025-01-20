# from google_generative_ai import GoogleGenerativeAI

# class ResumeAssistant:
#     def __init__(self, api_key):
#         self.api_key = api_key
#         self.gen_ai = GoogleGenerativeAI(api_key)
#         self.model = self.gen_ai.get_generative_model(model="gemini-1.5-flash")
#         self.generation_config = {
#             "temperature": 1,
#             "top_p": 0.95,
#             "top_k": 40,
#             "max_output_tokens": 8192,
#             "response_mime_type": "application/json",
#         }
#         self.chat_session = self.model.start_chat(
#             generation_config=self.generation_config,
#             history=[
#                 {
#                     "role": "user",
#                     "parts": [{"text": "You are a generative AI-powered advanced resume builder platform.\n"}],
#                 },
#                 {
#                     "role": "model",
#                     "parts": [
#                         {
#                             "text": "Okay, I am now operating as an advanced resume builder platform powered by generative AI. I can help you create, enhance, or modify resumes for various purposes, such as job applications, academic submissions, or professional growth. \n\nTo get started, please provide the following details:\n\n* **Personal Details:** (e.g., name, contact information, location)\n* **Objective:** (A brief statement of your career goals or the purpose of your resume)\n* **Education Details:** (Institutions, degrees, GPA, achievements)\n* **Work Experience:** (Company names, roles, responsibilities, achievements, and dates)\n* **Projects:** (Title, description, key technologies used, and outcomes)\n* **Skills:** (Technical, soft skills, certifications, etc.)\n* **Achievements:** (Awards, recognitions, publications, etc.)\n* **Interests:** (Optional, but adds a personal touch)\n* **Specific Customizations:** (What do you want to emphasize, e.g., a particular role or skill?)\n\nPlease provide as much detail as possible, and I will generate a professional and tailored resume for you."
#                         }
#                     ]
#                 },
#             ]
#         )

#     async def add_message(self, name, contact, location, objective, education, experience, projects, skills, achievements, interests, customizations):
#         final_prompt = (f"My name is {name}, and I am based in {location}. My contact details are {contact}. "
#                         f"My career objective is to {objective}. I have completed my education at {education['institution']} with a "
#                         f"{education['degree']} degree, achieving a GPA of {education['gpa']}, and notable academic achievements include "
#                         f"{education['achievements']}. In my professional journey, I have worked at {experience['company']} as a "
#                         f"{experience['role']} where I was responsible for {experience['responsibilities']}. I have contributed to several "
#                         f"projects such as {projects['title']}, which involved {projects['description']} using technologies like "
#                         f"{projects['technologies']}. My key skills include {', '.join(skills)}. I have also received accolades such as "
#                         f"{', '.join(achievements)}. My personal interests include {', '.join(interests)}. "
#                         f"I would like this resume to emphasize {customizations}. Please generate a professional and tailored resume for me.")

#         result = await self.chat_session.send_message(final_prompt)
#         response = result.response.text()
#         print(response)
#         return response

# # Usage example (ensure you replace 'YOUR_API_KEY' with your actual API key):
# # resume_assistant = ResumeAssistant(api_key="YOUR_API_KEY")
# # response = await resume_assistant.add_message(
# #     name="John Doe",
# #     contact="john.doe@example.com, +1234567890",
# #     location="San Francisco, California",
# #     objective="secure a challenging role in AI research",
# #     education={
# #         "institution": "MIT",
# #         "degree": "Bachelor's in Computer Science",
# #         "gpa": "3.8/4.0",
# #         "achievements": "Dean's List, AI Research Grant Recipient"
# #     },
# #     experience={
# #         "company": "Google",
# #         "role": "Software Engineer Intern",
# #         "responsibilities": "developing machine learning models for predictive analysis"
# #     },
# #     projects={
# #         "title": "AI-Powered Chatbot",
# #         "description": "creating a chatbot for real-time customer support",
# #         "technologies": ["Python", "TensorFlow", "Dialogflow"]
# #     },
# #     skills=["Python", "TensorFlow", "Natural Language Processing", "Team Leadership"],
# #     achievements=["Best AI Project 2023", "Published in AI Journal"],
# #     interests=["Reading sci-fi novels", "Exploring new technologies"],
# #     customizations="my AI research and technical skills"
# # )
# # print(response)
