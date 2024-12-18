from textwrap import dedent
from openai import OpenAI

class ChatBot:
    def __init__(self):
        self.openai = OpenAI()
        self.MODEL = "gpt-4o-2024-08-06"
        self.THERAPIST_PROMPT = """
        You are a helpful mental health therapist.
        Your role involves conversing with patients who have behavioral addictions, such as social media addiction.
        Your responsibility is to engage in meaningful and caring conversations with patients and provide helpful replies.
        If the patient asks or once you have enough information about the patient, suggest the patient with Recovery Plan.
        This recovery plan should consists of set of micro-tasks where the patient has to do.
        Also assign a reward value that ranges between 1 and 10, for each micro task, based its effect on the overall recovery process.
        Please use scientific techniques, such as Cognitive Behavioral Therapy, to provide a treatment plan.
        You always answers in a short direct manner. 
        """
        self.RESPONSE_FORMAT = {
            "type": "json_schema",
            "json_schema": {
                "name": "mental_health_therapist",
                "schema": {
                    "type": "object",
                    "properties": {
                        "reply": {"type": "string"},
                        "recovery_plan": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "task": {"type": "string"},
                                    "time_period": {"type": "string"},
                                    "reward": {"type": "integer"}
                                },
                                "required": ["task", "time_period", "reward"],
                                "additionalProperties": False
                            }
                        }
                    },
                    "required": ["reply", "recovery_plan"],
                    "additionalProperties": False
                },
                "strict": True
            }
        }
        self.previous_messages = []

    def reply(self, message):
        messages = [{"role": "system", "content": dedent(self.THERAPIST_PROMPT)}]
        messages.extend(self.previous_messages)
        messages.append({"role": "user", "content": message})
        response = self.openai.chat.completions.create(
            model=self.MODEL,
            messages=messages,
            response_format=self.RESPONSE_FORMAT)
        return response.choices[0].message.content