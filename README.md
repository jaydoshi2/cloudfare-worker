# 📝 Notion Document Translator - Cloudflare Worker

This Cloudflare Worker is designed to process a document (such as a note from Notion), summarize the content, and translate the summary into a specified target language.

## 💡 What the Code Does:
1. **Summarization**: 
   - The worker uses the **BART-large-CNN** model to generate a concise summary from the provided document content (`documentData`).

2. **Translation**: 
   - After summarization, the summary is translated into the target language (`targeting`) using the **Meta M2M100** translation model.

3. **API Endpoint**:
   - `POST /translatedocument`: 
     - Accepts a JSON payload with the document content (`documentData`) and the target language (`targeting`).
     - Returns the translated summary of the document.

## 🚀 Where This Code is Used:
This Cloudflare Worker is part of a project involving **Notion**, available on [this GitHub repository](https://github.com/jaydoshi2/notion). It helps in translating the summaries of notes or documents created within Notion.

Feel free to explore the project and integrate this translation service for an enhanced multilingual experience in note-taking!
