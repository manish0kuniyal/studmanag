import pandas as pd

om langchain_community.agent_toolkits import create_sql_agent
from langchain_openai import ChatOpenAI


df = pd.read_csv("salaries.csv")
print(df.shape)
print(df.columns.tolist())


llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
agent_executor = create_sql_agent(llm, db=db, agent_type="openai-tools", verbose=True)