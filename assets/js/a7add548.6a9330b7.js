"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4764],{47330:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>h});var o=t(85893),i=t(11151);const r={},a="Together AI",s={id:"topics/non-openai-models/cloud-togetherai",title:"Together AI",description:"This cloud-based proxy server example, using together.ai, is a group chat between a Python developer",source:"@site/docs/topics/non-openai-models/cloud-togetherai.md",sourceDirName:"topics/non-openai-models",slug:"/topics/non-openai-models/cloud-togetherai",permalink:"/autogen/docs/topics/non-openai-models/cloud-togetherai",draft:!1,unlisted:!1,editUrl:"https://github.com/microsoft/autogen/edit/main/website/docs/topics/non-openai-models/cloud-togetherai.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Non-OpenAI Models",permalink:"/autogen/docs/topics/non-openai-models/about-using-nonopenai-models"},next:{title:"LiteLLM with Ollama",permalink:"/autogen/docs/topics/non-openai-models/local-litellm-ollama"}},c={},h=[{value:"Construct Agents",id:"construct-agents",level:2},{value:"Establish the group chat",id:"establish-the-group-chat",level:2},{value:"Start Chat",id:"start-chat",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"together-ai",children:"Together AI"}),"\n",(0,o.jsxs)(n.p,{children:["This cloud-based proxy server example, using ",(0,o.jsx)(n.a,{href:"https://www.together.ai/",children:"together.ai"}),", is a group chat between a Python developer\nand a code reviewer, who are given a coding task."]}),"\n",(0,o.jsxs)(n.p,{children:["Start by ",(0,o.jsx)(n.a,{href:"/docs/installation/",children:"installing AutoGen"})," and getting your ",(0,o.jsx)(n.a,{href:"https://api.together.xyz/settings/profile",children:"together.ai API key"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Put your together.ai API key in an environment variable, TOGETHER_API_KEY."}),"\n",(0,o.jsx)(n.p,{children:"Linux / Mac OSX:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"export TOGETHER_API_KEY=YourTogetherAIKeyHere\n"})}),"\n",(0,o.jsx)(n.p,{children:"Windows (command prompt):"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-powershell",children:"set TOGETHER_API_KEY=YourTogetherAIKeyHere\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Create your LLM configuration, with the ",(0,o.jsx)(n.a,{href:"https://docs.together.ai/docs/inference-models",children:"model you want"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'import os\n\nconfig_list = [\n    {\n        # Available together.ai model strings:\n        # https://docs.together.ai/docs/inference-models\n        "model": "mistralai/Mistral-7B-Instruct-v0.1",\n        "api_key": os.environ[\'TOGETHER_API_KEY\'],\n        "base_url": "https://api.together.xyz/v1"\n    }\n]\n'})}),"\n",(0,o.jsx)(n.h2,{id:"construct-agents",children:"Construct Agents"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from pathlib import Path\nfrom autogen import AssistantAgent, UserProxyAgent\nfrom autogen.coding import LocalCommandLineCodeExecutor\n\nwork_dir = Path("groupchat")\nwork_dir.mkdir(exist_ok=True)\n\n# Create local command line code executor.\ncode_executor = LocalCommandLineCodeExecutor(work_dir=work_dir)\n\n# User Proxy will execute code and finish the chat upon typing \'exit\'\nuser_proxy = UserProxyAgent(\n    name="UserProxy",\n    system_message="A human admin",\n    code_execution_config={\n        "last_n_messages": 2,\n        "executor": code_executor,\n    },\n    human_input_mode="TERMINATE",\n    is_termination_msg=lambda x: "TERMINATE" in x.get("content"),\n)\n\n# Python Coder agent\ncoder = AssistantAgent(\n    name="softwareCoder",\n    description="Software Coder, writes Python code as required and reiterates with feedback from the Code Reviewer.",\n    system_message="You are a senior Python developer, a specialist in writing succinct Python functions.",\n    llm_config={"config_list": config_list},\n)\n\n# Code Reviewer agent\nreviewer = AssistantAgent(\n    name="codeReviewer",\n    description="Code Reviewer, reviews written code for correctness, efficiency, and security. Asks the Software Coder to address issues.",\n    system_message="You are a Code Reviewer, experienced in checking code for correctness, efficiency, and security. Review and provide feedback to the Software Coder until you are satisfied, then return the word TERMINATE",\n    is_termination_msg=lambda x: "TERMINATE" in x.get("content"),\n    llm_config={"config_list": config_list},\n)\n'})}),"\n",(0,o.jsx)(n.h2,{id:"establish-the-group-chat",children:"Establish the group chat"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from autogen import GroupChat, GroupChatManager\n\n# Establish the Group Chat and disallow a speaker being selected consecutively\ngroupchat = GroupChat(agents=[user_proxy, coder, reviewer], messages=[], max_round=12, allow_repeat_speaker=False)\n\n# Manages the group of multiple agents\nmanager = GroupChatManager(groupchat=groupchat, llm_config={"config_list": config_list})\n'})}),"\n",(0,o.jsx)(n.h2,{id:"start-chat",children:"Start Chat"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from autogen.cache import Cache\n\n# Cache LLM responses.\nwith Cache.disk() as cache:\n    # Start the chat with a request to write a function\n    user_proxy.initiate_chat(\n        manager,\n        message="Write a Python function for the Fibonacci sequence, the function will have one parameter for the number in the sequence, which the function will return the Fibonacci number for.",\n        cache=cache,\n    )\n    # type exit to terminate the chat\n'})}),"\n",(0,o.jsx)(n.p,{children:"Output:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-text",children:'UserProxy (to chat_manager):\n\nWrite a Python function for the Fibonacci sequence, the function will have one parameter for the number in the sequence, which the function will return the Fibonacci number for.\n\n--------------------------------------------------------------------------------\nsoftwareCoder (to chat_manager):\n\n Sure, here is a simple Python function that uses recursion to calculate the Fibonacci number:\n\n```python\ndef fibonacci(n):\n    if n <= 0:\n        return "Input should be a positive integer."\n    elif n == 1:\n        return 0\n    elif n == 2:\n        return 1\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)\n```\n\nThis function takes an integer `n` as input and returns the `n`th number in the Fibonacci sequence. The Fibonacci sequence is a series of numbers in which each number is the sum of the two preceding ones, usually starting with 0 and 1.\n\nNote that this implementation uses recursion and may not be efficient for large values of `n`. In such cases, an iterative approach or memoization would be more appropriate.\n\n--------------------------------------------------------------------------------\ncodeReviewer (to chat_manager):\n\n I see a couple of issues with the current implementation of the `fibonacci` function:\n\n1. The function does not handle negative inputs correctly. Currently, it returns a string message for any input less than or equal to 0. It would be better to raise a `ValueError` or return a more informative message.\n2. The function uses recursion to calculate the Fibonacci number, which can be inefficient for large inputs. A more efficient approach would be to use an iterative approach or memoization.\n\nHere\'s an updated implementation that addresses these issues:\n\n```python\ndef fibonacci(n):\n    if n <= 0:\n        raise ValueError("Input should be a positive integer.")\n    elif n == 1:\n        return 0\n    elif n == 2:\n        return 1\n    else:\n        a, b = 0, 1\n        for _ in range(n - 2):\n            a, b = b, a + b\n        return b\n```\n\nThis implementation uses a loop to calculate the Fibonacci number iteratively, which is more efficient than the recursive approach. It also raises a `ValueError` for negative inputs, which is a more appropriate way to handle invalid inputs.\n\n--------------------------------------------------------------------------------\n\n>>>>>>>> USING AUTO REPLY...\n\n>>>>>>>> EXECUTING CODE BLOCK 0 (inferred language is python)...\nUserProxy (to chat_manager):\n\nexitcode: 0 (execution succeeded)\nCode output:\n\n\n--------------------------------------------------------------------------------\ncodeReviewer (to chat_manager):\n\n I\'m glad the updated implementation addresses the issues with the original code. Let me know if you have any further questions or if there\'s anything else I can help you with.\n\nTo terminate the conversation, please type "TERMINATE".\n\n--------------------------------------------------------------------------------\nPlease give feedback to chat_manager. Press enter or type \'exit\' to stop the conversation: exit\n'})})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>a});var o=t(67294);const i={},r=o.createContext(i);function a(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);