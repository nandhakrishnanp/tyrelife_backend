const { json } = require("express");
const Groq = require("groq-sdk")

const client = new Groq({
  apiKey: "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", 
});

 async function runprompt(prompt , data) {
  const params= {
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: JSON.stringify(data) },
    ],
    model: 'llama3-8b-8192',
  };
  const chatCompletion = await client.chat.completions.create(params);
  
   const result = chatCompletion.choices[0].message.content;
   
return result;


}


module.exports = { runprompt };
