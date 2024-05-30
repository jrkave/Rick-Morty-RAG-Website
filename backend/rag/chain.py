import os
from dotenv import load_dotenv
from langchain_openai.chat_models import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain.prompts import ChatPromptTemplate
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_core.runnables import RunnablePassthrough
from langchain_pinecone import PineconeVectorStore

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY, model='text-embedding-3-small')
index_name = 'rm-index'
vector_store = PineconeVectorStore(index_name=index_name, embedding=embeddings)

# Define LLM model and output parser 
model = ChatOpenAI(openai_api_key=OPENAI_API_KEY, model='gpt-3.5-turbo')
parser = StrOutputParser()

# Set up template for prompt
template = """
Answer the question based on the context below. If you can't
answer the question, reply "I don't know". 

Context: {context}

Question: {question}
"""

prompt = ChatPromptTemplate.from_template(template)

chain = (
    {"context": vector_store.as_retriever(), "question": RunnablePassthrough()}
    | prompt
    | model
    | parser
)

def chat(query):
    return f'Question: {query}\nResponse: {chain.invoke(query)}\n'

if __name__ == '__main__':
    print(chat('Does Rick know what a Plumbus is used for?'))
    print(chat('What happens in the episode Bethic Twinstinct?'))
    print(chat('Does Rick equate himself with a God?'))
    print(chat('What is the name of the President?'))
    print(chat('Do you like Rick? Answer like you are Jerry.'))